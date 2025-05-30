import { BadRequestException, ForbiddenException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import * as bcrypt from 'bcrypt';
import { User } from './entities/user.entity';
import { Role } from '../roles/entities/role.entity';
import { UserRole } from '../roles/entities/user-role.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { AddRoleDto } from './dto/add-role.dto';
import { UpdateUserDto, UserWithGeneratedPassword } from './dto/update-user.dto';
import { RolesService } from '../roles/roles.service';
import { Permission } from '../permissions/entities/permission.entity';
import { Op } from 'sequelize';

@Injectable()
export class UserService {
  constructor(
    private readonly rolesService: RolesService,
    @InjectModel(User)
    private userModel: typeof User,
    @InjectModel(Role)
    private roleModel: typeof Role,
    @InjectModel(UserRole)
    private userRoleModel: typeof UserRole
  ) { }

  async create(createUserDto: CreateUserDto, currentUser: any): Promise<User> {
    if (!currentUser) {
      throw new UnauthorizedException('currentUser not found or token expired');
    }
    // Check if email or username already exists
    const existingUser = await this.findByEmail(createUserDto.email);
    if (existingUser) {
      throw new UnauthorizedException('Email already exists');
    }

    // Hash password
    const hashedPassword = await this.hashPassword(createUserDto.password);

    // If role is being assigned and currentUser exists (admin creating user)
    if (createUserDto.roleId && currentUser) {
      // Get the role being assigned
      const role = await this.rolesService.findById(createUserDto.roleId);

      // Prevent assigning Admin role unless you're a Super Admin
      if (role.name === 'Admin' && !currentUser.roles.includes('SuperAdmin')) {
        throw new ForbiddenException('Only Super Admins can assign the Admin role');
      }

      // Prevent Admins from creating users in other countries
      if (
        currentUser.roles.includes('Admin') &&
        !currentUser.roles.includes('SuperAdmin') &&
        createUserDto.countryId &&
        createUserDto.countryId !== currentUser.country
      ) {
        throw new ForbiddenException('Cannot create users for other countries');
      }
    }

    // Create user
    const user = await this.userModel.create({
      ...createUserDto,
      password: hashedPassword,
    });

    // Assign the role
    if (createUserDto.roleId) {
      const data = await this.addRole(user.id, { roleId: createUserDto.roleId });
      if (!data) {
        throw new BadRequestException('Failed to assign role');
      }
    }

    const userData = await this.userModel.findByPk(user.id,
      {
        include: {
          model: Role,
          attributes: ['id', 'name'],
          through: { attributes: [] }, // This hides UserRole
        },
        attributes: [
          'id', 
          'first_name', 
          'last_name', 
          'email', 
          'country_id', 
          'passport_number', 
          'joining_date',
          'address',
          'city', 
          'state', 
          'pin_code', 
          'company_name', 
          'registration_id',
          'cv_url',
          'work_experience'
        ]
      }
    );
    return userData;
  }

  async findAll(currentUser?: any): Promise<User[]> {
    if (!currentUser) {
      throw new UnauthorizedException('currentUser not found or token expired');
    }
    // Default query options
    const queryOptions: any = {
      include: [
        {
          model: Role,
          attributes: ['id', 'name'],
          through: { attributes: [] }, // This hides UserRole
        }
      ],
      attributes: [
        'id', 
        'email', 
        'username', 
        'country', 
        'phone_number', 
        'registration_id', 
        'company_name', 
        'cv_url', 
        'work_experience'
      ],
      order: [['id', 'ASC']],
    };
  
    // Apply filters based on user role
    if (currentUser) {
      // For Admin users: filter by country and exclude SuperAdmin and Admin roles
      if (currentUser.roles.includes('Admin') && !currentUser.roles.includes('SuperAdmin')) {
        // Filter by country
        queryOptions.where = { 
          country: currentUser.country 
        };
  
        // Filter out users with SuperAdmin and Admin roles using a subquery approach
        const superAdminAndAdminRoleIds = await this.roleModel.findAll({
          where: {
            name: {
              [Op.in]: ['SuperAdmin', 'Admin']
            }
          },
          attributes: ['id']
        });
        
        const roleIds = superAdminAndAdminRoleIds.map(role => role.id);
        
        // Find users with these roles to exclude them
        if (roleIds.length > 0) {
          const usersWithAdminRoles = await this.userRoleModel.findAll({
            where: {
              role_id: {
                [Op.in]: roleIds
              }
            },
          });
                    
          const userIdsToExclude = usersWithAdminRoles.map(ur => ur.userId);
          
          // If we found users to exclude, add them to the where clause
          if (userIdsToExclude.length > 0) {
            queryOptions.where.id = {
              [Op.notIn]: userIdsToExclude
            };
          }
        }
      }
      // For SuperAdmin: no filtering needed (they see everyone)
    }
    const user = await this.userModel.findAll(queryOptions);  
    return user;
  }

  async findById(id: number, currentUser?: any): Promise<User> {
    if (!currentUser) {
      throw new UnauthorizedException('currentUser not found or token expired');
    }
  
    // Step 1: Get the user with their roles
    const user = await this.userModel.findByPk(id, {
      include: [
        {
          model: Role,
          attributes: ['name'],
          through: { attributes: [] }, // This hides UserRole
        }
      ],
      attributes: [
        'id',
        'email',
        'username',
        'country',
        'phone_number',
        'registration_id',
        'company_name',
        'cv_url',
        'work_experience'
      ],
    });
  
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
  
    // Step 2: Check access permissions based on roles
    
    // Get the user's roles as an array of strings
    const userRoles = user.roles.map(role => role.name);
    
    // Case 1: SuperAdmin can see any user
    if (currentUser.roles.includes('SuperAdmin')) {
      return user;
    }
    
    // Case 2: Admin can only see non-Admin, non-SuperAdmin users from their own country
    if (currentUser.roles.includes('Admin')) {
      // Check if the user has SuperAdmin or Admin role
      if (userRoles.includes('SuperAdmin') || userRoles.includes('Admin')) {
        throw new ForbiddenException('You do not have permission to view admin users');
      }
      
      // Check if the user is from the same country
      if (user.countryId !== currentUser.country) {
        throw new ForbiddenException('You do not have permission to view users from other countries');
      }
      
      return user;
    }
    
    // Case 3: Any other role - can only see themselves
    if (user.id !== currentUser.id) {
      throw new ForbiddenException('You can only view your own profile');
    }
    
    return user;
  }

  async findByEmail(email: string): Promise<User> {
    return this.userModel.findOne({
      where: { email },
    });
  }

  async update(id: number, updateUserDto: UpdateUserDto, currentUser?: any): Promise<User> {
    if(!currentUser) {
      throw new UnauthorizedException('currentUser not found or token expired');
    }
    const user = await this.findById(id, currentUser);

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
        user.countryId !== currentUser.country) {
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
    else if (updateUserDto.newPassword && updateUserDto.oldPassword) {
      // Verify the old password is correct
      const isPasswordValid = await this.validatePassword(updateUserDto.oldPassword, user);
      if (!isPasswordValid) {
        throw new UnauthorizedException('Current password is incorrect');
      }

      // Hash the new password
      updateUserDto.password = await this.hashPassword(updateUserDto.newPassword);

      // Remove the oldPassword field to avoid storing it
      delete updateUserDto.oldPassword;
      delete updateUserDto.newPassword;
    }
    // If just a password is provided without oldPassword or resetPassword flag
    else if (updateUserDto.password && !updateUserDto.resetPassword && !updateUserDto.oldPassword) {
      throw new BadRequestException('Must provide old password to change password');
    }

    await user.update(updateUserDto);

    // Return the updated user (add plainTextPassword if it was a reset)
    const updatedUser = await this.userModel.findByPk(id);
    console.log(updatedUser);

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
    const user = await this.userModel.findByPk(userId, {
      include: [
        'roles'
      ]
    });
    console.log('user =========== >>>>> ', user);
    return user.roles.some(role => role.name === roleName);
  }

  // Helper method to validate password
  private async validatePassword(password: string, user: User ): Promise<boolean> {
    const hashedPassword = await this.userModel.findByPk(user.id);
    return await bcrypt.compare(password, hashedPassword.password);
  }

  async findByIdWithRolesAndPermissions(id: number): Promise<User> {
    const user = await this.userModel.findByPk(id, {
      include: [
        {
          model: Role,
          attributes: ['id', 'name'],
          through: { attributes: [] }, // Exclude user_roles join table
          include: [
            {
              model: Permission,
              attributes: {
                include: [ 'name', 'resource', 'action'],
              },
              through: { attributes: [] }, // Exclude role_permissions join table
            },
          ],
        },
      ],
      attributes: ['id', 'email', 'first_name', 'last_name', 'country_id'],
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
    const user = await this.userModel.findByPk(id);
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

  async findByCountry(countryId: string, currentUser): Promise<User[]> {
    return this.userModel.findAll({
      where: { countryId },
      include: [
        {
          model: Role,
          through: { attributes: [] },
        },
      ],
    });
  }

  //  Method to find users by role and country
  async findByRoleAndCountry(roleName: string, countryId: string): Promise<User[]> {
    const role = await this.roleModel.findOne({ where: { name: roleName } });

    if (!role) {
      throw new NotFoundException(`Role ${roleName} not found`);
    }

    return this.userModel.findAll({
      where: { countryId },
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