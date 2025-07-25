import { BadRequestException, ForbiddenException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Op } from 'sequelize';
import * as bcrypt from 'bcrypt';

import { User } from './entities/user.entity';
import { Role } from '../roles/entities/role.entity';
import { UserRole } from '../roles/entities/user-role.entity';
import { Permission } from '../permissions/entities/permission.entity';
import { Country } from '../country/entities/country.entity';

import { CreateUserDto } from './dto/create-user.dto';
import { AddRoleDto } from './dto/add-role.dto';
import { UpdateUserDto } from './dto/update-user-dto';
import { UpdateUserStatusDto } from './dto/update-user-status.dto';
import { UpdateUserPasswordDto, UserWithGeneratedPassword } from './dto/update-user-password.dto';

import { RolesService } from '../roles/roles.service';
import { S3Service } from 'src/services/s3.service';
import { ReplaceRolesDto } from './dto/replace-roles.dto';

@Injectable()
export class UserService {
  constructor(
    private readonly rolesService: RolesService,
    private readonly s3Service: S3Service,
    @InjectModel(User)
    private userModel: typeof User,
    @InjectModel(Role)
    private roleModel: typeof Role,
    @InjectModel(UserRole)
    private userRoleModel: typeof UserRole
  ) { }

  async update(id: number, updateUserDto: UpdateUserDto): Promise<User> { // TODO : This doesn't include role & password updates
    const user = await this.userModel.findByPk(id);                       // TODO: Also add condition that both current user id & user id are same here 
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    await user.update(updateUserDto);
    return user.reload();
  }

  async updateUserStatus(id: number, updateUserStatusDto: UpdateUserStatusDto, currentUser: any): Promise<User> {
    if (!currentUser) {
      throw new UnauthorizedException('currentUser not found or token expired');
    }
    const { is_active } = updateUserStatusDto;

    // Check if user exists
    const user = await this.userModel.findByPk(id);
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }

    // Update the is_active status
    await user.update({ is_active });

    // Return updated user
    return user.reload();
  }

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
    if (createUserDto.role_id && currentUser) {
      // Get the role being assigned
      const role = await this.rolesService.findById(createUserDto.role_id, currentUser);

      // Prevent assigning Admin role unless you're a Super Admin
      if (role.name === 'Admin' && !currentUser.roles.includes('SuperAdmin')) {
        throw new ForbiddenException('Only Super Admins can assign the Admin role');
      }

      // Prevent Admins from creating users in other countries
      if (
        currentUser.roles.includes('Admin') &&
        !currentUser.roles.includes('SuperAdmin') &&
        createUserDto.country_id &&
        createUserDto.country_id !== currentUser.country
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
    if (createUserDto.role_id) {
      const data = await this.addRole(user.id, { roleId: createUserDto.role_id });
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
          'mobile',
          'city',
          'state',
          'pincode',
          'company_name',
          'registration_id',
          'cv_url',
          'work_experience',
          'passport_expiry_date',
          'passport_attachment',
          'photo_of_engineer',
          'is_active'
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
        },
        {
          model: Country,
          attributes: ['id', 'name'],
        },
      ],
      attributes: [
        'id',
        'first_name',
        'last_name',
        'email',
        'country_id',
        'passport_number',
        'joining_date',
        'address',
        'mobile',
        'city',
        'state',
        'pincode',
        'company_name',
        'registration_id',
        'cv_url',
        'work_experience',
        'passport_expiry_date',
        'passport_attachment',
        'photo_of_engineer',
        'is_active'
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

          const userIdsToExclude = usersWithAdminRoles.map(ur => ur.user_id);

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

  async findById(id: number, currentUser: any): Promise<User> {
    if (!currentUser) {
      throw new UnauthorizedException('currentUser not found or token expired');
    }

    // Step 1: Get the user with their roles
    const existingUser = await this.userModel.findByPk(id, {
      include: [
        {
          model: Role,
          attributes: ['name'],
          through: { attributes: [] }, // This hides UserRole
        },
        {
          model: Country,
          attributes: ['id', 'name'],
        },
      ],
      attributes: [
        'id',
        'email',
        'first_name',
        'last_name',
        'country_id',
        'passport_number',
        'joining_date',
        'registration_id',
        'company_name',
        'cv_url',
        'passport_attachment',
        'photo_of_engineer',
        'work_experience'
      ],
    });
    const user = existingUser.toJSON();

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
      if (user.country_id !== currentUser.country) {
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

  async updatePassword(id: number, updateUserDto: UpdateUserPasswordDto, currentUser?: any): Promise<User> {
    if (!currentUser) {
      throw new UnauthorizedException('currentUser not found or token expired');
    }
    const user = await this.findById(id, currentUser);

    // Variable to store generated password (if any)
    let plainTextPassword: string | undefined;
    let password: string | undefined;

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
        user.country_id !== currentUser.country) {
        throw new ForbiddenException('Cannot modify users from other countries');
      }
    }

    // Password reset handling (for Admins or Super Admins)
    if (updateUserDto.resetPassword && updateUserDto.newPassword &&
      (currentUser?.roles.includes('Admin') || currentUser?.roles.includes('SuperAdmin'))) {

      // Generate a new random password (or use the provided one)
      const newPassword = updateUserDto.newPassword || this.generateRandomPassword();
      password = await this.hashPassword(newPassword);

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
      password = await this.hashPassword(updateUserDto.newPassword);

      // Remove the oldPassword field to avoid storing it
      delete updateUserDto.oldPassword;
      delete updateUserDto.newPassword;
    }
    // If just a password is provided without oldPassword or resetPassword flag
    else if (updateUserDto.newPassword && !updateUserDto.resetPassword && (!updateUserDto.oldPassword || updateUserDto.oldPassword === '' || updateUserDto.oldPassword === null || updateUserDto.oldPassword === undefined)) {
      throw new BadRequestException('Must provide old password to change password');
    }

    await user.update({ password });

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
  private async validatePassword(password: string, user: User): Promise<boolean> {
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
                include: ['name', 'resource', 'action'],
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

  async remove(id: number, currentUser: any): Promise<void> {
    const user = await this.findById(id, currentUser);

    // Delete files from S3 before deleting user
    const filesToDelete = [];
    if (user.cv_url) filesToDelete.push(this.s3Service.deleteFile(user.cv_url));
    if (user.passport_attachment) filesToDelete.push(this.s3Service.deleteFile(user.passport_attachment));
    if (user.photo_of_engineer) filesToDelete.push(this.s3Service.deleteFile(user.photo_of_engineer));

    await Promise.allSettled(filesToDelete);
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

  // async removeRole(id: number, roleId: string, currentUser): Promise<User> {
  //   const user = await this.findById(id, currentUser);
  //   const role = await this.roleModel.findByPk(roleId);

  //   if (!role) {
  //     throw new NotFoundException(`Role with ID ${roleId} not found`);
  //   }

  //   await user.$remove('roles', role);

  //   return this.findByIdWithRolesAndPermissions(id);
  // }

  // Method to find users by country filtering

  async findByCountry(countryId: string, currentUser): Promise<User[]> {
    return this.userModel.findAll({
      where: { country_id: countryId },
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
      where: { country_id: countryId },
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

  // ADD THESE METHODS TO YOUR EXISTING UserService CLASS:

async assignRole(userId: number, addRoleDto: AddRoleDto, currentUser: any): Promise<User> {
  if (!currentUser) {
    throw new UnauthorizedException('currentUser not found or token expired');
  }

  // Find the target user with current roles
  const targetUser = await this.userModel.findByPk(userId, {
    include: [
      {
        model: Role,
        attributes: ['id', 'name'],
        through: { attributes: [] }
      }
    ]
  });

  if (!targetUser) {
    throw new NotFoundException(`User with ID ${userId} not found`);
  }

  // Find the role to be assigned
  const role = await this.roleModel.findByPk(addRoleDto.roleId);
  if (!role) {
    throw new NotFoundException(`Role with ID ${addRoleDto.roleId} not found`);
  }

  // Security checks
  await this.validateRoleAssignmentPermissions(targetUser, role, currentUser);

  // Check if user already has this role
  const existingUserRole = await this.userRoleModel.findOne({
    where: {
      userId: userId,
      roleId: addRoleDto.roleId
    }
  });

  if (existingUserRole) {
    throw new BadRequestException('User already has this role');
  }

  // Assign the role
  await this.userRoleModel.create({
    userId: userId,
    roleId: addRoleDto.roleId
  });

  return this.findByIdWithRolesAndPermissions(userId);
}

async removeRole(userId: number, roleId: number, currentUser: any): Promise<User> {
  if (!currentUser) {
    throw new UnauthorizedException('currentUser not found or token expired');
  }

  // Find the target user with current roles
  const targetUser = await this.userModel.findByPk(userId, {
    include: [
      {
        model: Role,
        attributes: ['id', 'name'],
        through: { attributes: [] }
      }
    ]
  });

  if (!targetUser) {
    throw new NotFoundException(`User with ID ${userId} not found`);
  }

  // Find the role to be removed
  const role = await this.roleModel.findByPk(roleId);
  if (!role) {
    throw new NotFoundException(`Role with ID ${roleId} not found`);
  }

  // Security checks
  await this.validateRoleRemovalPermissions(targetUser, role, currentUser);

  // Check if user has this role
  const userRole = await this.userRoleModel.findOne({
    where: {
      userId: userId,
      roleId: roleId
    }
  });

  if (!userRole) {
    throw new BadRequestException('User does not have this role');
  }

  // Prevent removing the last SuperAdmin role
  if (role.name === 'SuperAdmin') {
    const superAdminCount = await this.userRoleModel.count({
      include: [
        {
          model: Role,
          where: { name: 'SuperAdmin' }
        }
      ]
    });

    if (superAdminCount <= 1) {
      throw new BadRequestException('Cannot remove the last SuperAdmin role');
    }
  }

  // Remove the role
  await userRole.destroy();

  return this.findByIdWithRolesAndPermissions(userId);
}

async getUserRoles(userId: number, currentUser: any): Promise<Role[]> {
  if (!currentUser) {
    throw new UnauthorizedException('currentUser not found or token expired');
  }

  // Find the user and validate access
  const user = await this.findById(userId, currentUser);

  // Get user roles
  const userWithRoles = await this.userModel.findByPk(userId, {
    include: [
      {
        model: Role,
        attributes: ['id', 'name', 'description', 'status'],
        through: { attributes: ['created_at'] }
      }
    ]
  });

  return userWithRoles.roles;
}

async replaceUserRoles(userId: number, replaceRolesDto: ReplaceRolesDto, currentUser: any): Promise<User> {
  if (!currentUser) {
    throw new UnauthorizedException('currentUser not found or token expired');
  }

  // Find the target user
  const targetUser = await this.userModel.findByPk(userId, {
    include: [
      {
        model: Role,
        attributes: ['id', 'name'],
        through: { attributes: [] }
      }
    ]
  });

  if (!targetUser) {
    throw new NotFoundException(`User with ID ${userId} not found`);
  }

  // Validate all roles exist
  const roles = await this.roleModel.findAll({
    where: {
      id: {
        [Op.in]: replaceRolesDto.roleIds
      }
    }
  });

  if (roles.length !== replaceRolesDto.roleIds.length) {
    throw new BadRequestException('One or more roles do not exist');
  }

  // Security checks for each role
  for (const role of roles) {
    await this.validateRoleAssignmentPermissions(targetUser, role, currentUser);
  }

  // Use transaction for atomic operation
  const transaction = await this.userModel.sequelize.transaction();

  try {
    // Remove all existing roles
    await this.userRoleModel.destroy({
      where: { userId: userId },
      transaction
    });

    // Add new roles
    const userRoles = replaceRolesDto.roleIds.map(roleId => ({
      userId: userId,
      roleId: roleId
    }));

    await this.userRoleModel.bulkCreate(userRoles, { transaction });

    await transaction.commit();

    return this.findByIdWithRolesAndPermissions(userId);
  } catch (error) {
    await transaction.rollback();
    throw error;
  }
}

// Private helper methods
private async validateRoleAssignmentPermissions(targetUser: User, role: Role, currentUser: any): Promise<void> {
  // Prevent non-SuperAdmins from modifying SuperAdmins
  const targetUserRoles = targetUser.roles.map(r => r.name);
  if (targetUserRoles.includes('SuperAdmin') && !currentUser.roles.includes('SuperAdmin')) {
    throw new ForbiddenException('Cannot modify SuperAdmin users');
  }

  // Prevent Admins from assigning users from other countries
  if (
    currentUser.roles.includes('Admin') &&
    !currentUser.roles.includes('SuperAdmin') &&
    targetUser.country_id !== currentUser.country
  ) {
    throw new ForbiddenException('Cannot modify users from other countries');
  }

  // Prevent assigning SuperAdmin role unless you're a SuperAdmin
  if (role.name === 'SuperAdmin' && !currentUser.roles.includes('SuperAdmin')) {
    throw new ForbiddenException('Only SuperAdmins can assign the SuperAdmin role');
  }

  // Prevent assigning Admin role unless you're a SuperAdmin
  if (role.name === 'Admin' && !currentUser.roles.includes('SuperAdmin')) {
    throw new ForbiddenException('Only SuperAdmins can assign the Admin role');
  }

  // Prevent users from modifying their own roles
  if (targetUser.id === currentUser.id) {
    throw new ForbiddenException('Cannot modify your own roles');
  }
}

private async validateRoleRemovalPermissions(targetUser: User, role: Role, currentUser: any): Promise<void> {
  // Reuse the same validation logic
  await this.validateRoleAssignmentPermissions(targetUser, role, currentUser);
}
}