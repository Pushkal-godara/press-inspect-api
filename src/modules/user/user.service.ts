import { BadRequestException, ForbiddenException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import * as bcrypt from 'bcrypt';
import { User } from './entities/user.entity';
import { Role } from '../roles/entities/role.entity';
import { RegisterDto } from '../auth/dto/register.dto';
import { AddRoleDto } from './dto/add-role.dto';
import { UpdateUserDto, UserWithGeneratedPassword } from './dto/update-user.dto';
import { RolesService } from '../roles/roles.service';

@Injectable()
export class UserService {
  constructor(
    private readonly rolesService: RolesService,
    @InjectModel(User)
    private userModel: typeof User,
    @InjectModel(Role)
    private roleModel: typeof Role,
  ) { }

  async create(registerDto: RegisterDto, currentUser?: any): Promise<User> {
    // Check if email or username already exists
    const existingUser = await this.findByEmail(registerDto.email);
    if (existingUser) {
      throw new UnauthorizedException('Email already exists');
    }
  
    // Hash password
    const hashedPassword = await this.hashPassword(registerDto.password);
  
    // If role is being assigned and currentUser exists (admin creating user)
    if (registerDto.roleId && currentUser) {
      // Get the role being assigned
      const role = await this.rolesService.findById(registerDto.roleId);
      
      // Prevent assigning Super Admin role unless you're a Super Admin
      if (role.name === 'Super Admin' && !currentUser.roles.includes('Super Admin')) {
        throw new ForbiddenException('Only Super Admins can assign the Super Admin role');
      }
      
      // Prevent Admins from creating users in other countries
      if (
        currentUser.roles.includes('Admin') && 
        !currentUser.roles.includes('Super Admin') && 
        registerDto.country && 
        registerDto.country !== currentUser.country
      ) {
        throw new ForbiddenException('Cannot create users for other countries');
      }
    }
  
    // Create user
    const user = await this.userModel.create({
      ...registerDto,
      password: hashedPassword,
    });
  
    // Assign the role
    if (registerDto.roleId) {
      await this.addRole(user.id, { roleId: registerDto.roleId });
    }
  
    return this.findById(user.id);
  }

  async findAll(): Promise<User[]> {
    return this.userModel.findAll({
      include: [
        {
          model: Role,
          attributes: ['id', 'name'],
          through: { attributes: [] }, // This hides UserRole
        }
      ],
      attributes: ['id', 'email', 'username'],
      order: [['id', 'ASC']],
    });
  }

  async findById(id: number): Promise<User> {
    const user = await this.userModel.findByPk(id, {
      include: [
        {
          model: Role,
          attributes: ['name'],
        }
      ],
      attributes: { exclude: ['password'] },
    });

    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }

    return user;
  }

  async findByEmail(email: string): Promise<User> {
    return this.userModel.findOne({
      where: { email },
    });
  }

  async update(id: number, updateUserDto: UpdateUserDto, currentUser?: any): Promise<User> {
    const user = await this.findById(id);

    // Variable to store generated password (if any)
    let plainTextPassword: string | undefined;

    // Security checks for country and role hierarchy
    if (currentUser) {
      // Check if target is a Super Admin (can only be modified by another Super Admin)
      const isTargetSuperAdmin = await this.hasRole(user.id, 'SuperAdmin');
      if (isTargetSuperAdmin && !currentUser.roles.includes('SuperAdmin')) {
        throw new ForbiddenException('Cannot modify Super Admin users');
      }

      // Country-based restriction for regular Admins
      if (currentUser.roles.includes('Admin') &&
        !currentUser.roles.includes('SuperAdmin') &&
        user.country !== currentUser.country) {
        throw new ForbiddenException('Cannot modify users from other countries');
      }
    }

    // Password reset handling (for Admins or Super Admins)
    if (updateUserDto.resetPassword &&
      (currentUser?.roles.includes('Admin') || currentUser?.roles.includes('SuperAdmin'))) {

      // Generate a new random password (or use the provided one)
      const newPassword = updateUserDto.newPassword || this.generateRandomPassword();
      updateUserDto.password = await this.hashPassword(newPassword);

      // Remove the temporary reset flags to avoid storing them in the database
      delete updateUserDto.resetPassword;
      delete updateUserDto.newPassword;

      // Store the plain text password temporarily to return it
      plainTextPassword = newPassword;
    }

    // Password change handling (for Engineers)
    else if (updateUserDto.password && updateUserDto.oldPassword) {
      // Verify the old password is correct
      const isPasswordValid = await this.validatePassword(user, updateUserDto.oldPassword);
      if (!isPasswordValid) {
        throw new UnauthorizedException('Current password is incorrect');
      }

      // Hash the new password
      updateUserDto.password = await this.hashPassword(updateUserDto.password);

      // Remove the oldPassword field to avoid storing it
      delete updateUserDto.oldPassword;
    }
    // If just a password is provided without oldPassword or resetPassword flag
    else if (updateUserDto.password && !updateUserDto.resetPassword) {
      throw new BadRequestException('Must provide old password to change password');
    }

    await user.update(updateUserDto);

    // Return the updated user (add plainTextPassword if it was a reset)
    const updatedUser = await this.findById(id);

    // If we generated a password, add it to the response
    if (plainTextPassword) {
      const userJson = updatedUser.toJSON();
      return {
        ...userJson,
        generatedPassword: plainTextPassword
      } as UserWithGeneratedPassword;
    }

    return updatedUser;
  }

  // Helper method to generate random password
  private generateRandomPassword(): string {
    const length = 10;
    const charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*";
    let password = "";

    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * charset.length);
      password += charset[randomIndex];
    }

    return password;
  }

  // Helper method to check if user has a specific role
  private async hasRole(userId: number, roleName: string): Promise<boolean> {
    const user = await this.findById(userId);
    return user.roles.some(role => role.name === roleName);
  }

  // Helper method to validate password
  private async validatePassword(user: User, password: string): Promise<boolean> {
    return bcrypt.compare(password, user.password);
  }

  async findByIdWithRolesAndPermissions(id: number): Promise<User> {
    const user = await this.userModel.findByPk(id, {
      include: [
        {
          model: Role,
          attributes: ['id', 'name'],
          through: { attributes: [] },
          // include: [
          //   {
          //     model: Permission,
          //     attributes: {
          //       include: [ 'name', 'resource', 'action'],
          //     },
          //   },
          // ],
        },
      ],
      attributes: ['id', 'email', 'username'],
    });

    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }

    return user;
  }

  async remove(id: number): Promise<void> {
    const user = await this.findById(id);
    await user.destroy();
  }

  async addRole(id: number, addRoleDto: AddRoleDto): Promise<User> {
    const user = await this.findById(id);
    const role = await this.roleModel.findByPk(addRoleDto.roleId);

    if (!role) {
      throw new NotFoundException(`Role with ID ${addRoleDto.roleId} not found`);
    }

    await user.$add('roles', role);

    return this.findByIdWithRolesAndPermissions(id);
  }

  async removeRole(id: number, roleId: string): Promise<User> {
    const user = await this.findById(id);
    const role = await this.roleModel.findByPk(roleId);

    if (!role) {
      throw new NotFoundException(`Role with ID ${roleId} not found`);
    }

    await user.$remove('roles', role);

    return this.findByIdWithRolesAndPermissions(id);
  }

  // Method to find users by country filtering

  async findByCountry(country: string): Promise<User[]> {
    return this.userModel.findAll({
      where: { country },
      include: [
        {
          model: Role,
          through: { attributes: [] },
        },
      ],
    });
  }

  //  Method to find users by role and country
  async findByRoleAndCountry(roleName: string, country: string): Promise<User[]> {
    const role = await this.roleModel.findOne({ where: { name: roleName } });

    if (!role) {
      throw new NotFoundException(`Role ${roleName} not found`);
    }

    return this.userModel.findAll({
      where: { country },
      include: [
        {
          model: Role,
          where: { id: role.id },
          through: { attributes: [] },
        },
      ],
    });
  }

  private async hashPassword(password: string): Promise<string> {
    const salt = await bcrypt.genSalt();
    return bcrypt.hash(password, salt);
  }
}