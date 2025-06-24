import { BadRequestException, ForbiddenException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Op } from 'sequelize';

import { Role } from './entities/role.entity';
import { Permission } from '../permissions/entities/permission.entity';
import { UserRole } from './entities/user-role.entity';
import { RolePermission } from './entities/role-permission.entity';

import { AssignPermissionDto, ReplacePermissionsDto } from './dto/permission.dto';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { AddPermissionDto } from './dto/add-permission.dto';

@Injectable()
export class RolesService {
  constructor(
    @InjectModel(Role)
    private roleModel: typeof Role,
    @InjectModel(Permission)
    private permissionModel: typeof Permission,
    @InjectModel(UserRole)
    private userRoleModel: typeof UserRole,
    @InjectModel(RolePermission)
    private rolePermissionModel: typeof RolePermission
  ) {}

  async findAll(currentUser: any): Promise<Role[]> {
    if (!currentUser) {
      throw new NotFoundException('currentUser not found or token expired');
    }
   
    // Default condition - no filtering
    let whereCondition = {};
   
    // Apply role-based filtering
    if (currentUser.roles.includes('SuperAdmin')) {
      // SuperAdmin can see all roles except SuperAdmin
      whereCondition = {
        name: {
          [Op.ne]: 'SuperAdmin'
        }
      };
    } else if (currentUser.roles.includes('Admin')) {
      // Admin can see all roles except SuperAdmin and Admin
      whereCondition = {
        name: {
          [Op.notIn]: ['SuperAdmin', 'Admin']
        }
      };
    }
   
    // Get the roles with the applied filters
    const roles = await this.roleModel.findAll({
      where: whereCondition,
      attributes: ['id', 'name'],
      order: [['id', 'ASC']],
    });
   
    return roles;
   }

  async findById(id: number, currentUser?: any): Promise<Role> {
    if (currentUser && !currentUser) {
      throw new UnauthorizedException('currentUser not found or token expired');
    }

    const role = await this.roleModel.findByPk(id, {
      include: [
        {
          model: Permission,
          attributes: ['id', 'name', 'resource', 'action', 'description'],
          through: { attributes: ['created_at'] }
        }
      ]
    });

    if (!role) {
      throw new NotFoundException(`Role with ID ${id} not found`);
    }

    return role;
  }

  async create(createRoleDto: CreateRoleDto, currentUser: any): Promise<Role> {
    if (!currentUser) {
      throw new UnauthorizedException('currentUser not found or token expired');
    }

    // Check if role name already exists
    const existingRole = await this.roleModel.findOne({
      where: { name: createRoleDto.name }
    });

    if (existingRole) {
      throw new BadRequestException('Role name already exists');
    }

    const role = await this.roleModel.create(createRoleDto);
    return role;
  }

  async update(id: number, updateRoleDto: UpdateRoleDto, currentUser: any): Promise<Role> {
    if (!currentUser) {
      throw new UnauthorizedException('currentUser not found or token expired');
    }

    const role = await this.roleModel.findByPk(id);
    if (!role) {
      throw new NotFoundException(`Role with ID ${id} not found`);
    }

    // Prevent updating critical system roles
    if (['SuperAdmin', 'Admin'].includes(role.name)) {
      throw new ForbiddenException('Cannot modify system roles');
    }

    // Check if new name already exists (if name is being changed)
    if (updateRoleDto.name && updateRoleDto.name !== role.name) {
      const existingRole = await this.roleModel.findOne({
        where: { 
          name: updateRoleDto.name,
          id: { [Op.ne]: id }
        }
      });

      if (existingRole) {
        throw new BadRequestException('Role name already exists');
      }
    }

    await role.update(updateRoleDto);
    return role.reload();
  }

  async remove(id: number, currentUser: any): Promise<void> {
    if (!currentUser) {
      throw new UnauthorizedException('currentUser not found or token expired');
    }

    const role = await this.roleModel.findByPk(id);
    if (!role) {
      throw new NotFoundException(`Role with ID ${id} not found`);
    }

    // Prevent deleting critical system roles
    if (['SuperAdmin', 'Admin'].includes(role.name)) {
      throw new ForbiddenException('Cannot delete system roles');
    }

    // Check if role is assigned to any users
    const userCount = await this.roleModel.sequelize.query(
      'SELECT COUNT(*) as count FROM user_roles WHERE role_id = :roleId',
      {
        replacements: { roleId: id },
        type: 'SELECT'
      }
    );

    if (userCount[0]['count'] > 0) {
      throw new BadRequestException('Cannot delete role that is assigned to users');
    }

    await role.destroy();
  }

  async assignPermission(roleId: number, assignPermissionDto: AssignPermissionDto, currentUser: any): Promise<Role> {
    if (!currentUser) {
      throw new UnauthorizedException('currentUser not found or token expired');
    }

    // Find the role
    const role = await this.roleModel.findByPk(roleId);
    if (!role) {
      throw new NotFoundException(`Role with ID ${roleId} not found`);
    }

    // Find the permission
    const permission = await this.permissionModel.findByPk(assignPermissionDto.permissionId);
    if (!permission) {
      throw new NotFoundException(`Permission with ID ${assignPermissionDto.permissionId} not found`);
    }

    // Check if role already has this permission
    const existingRolePermission = await this.rolePermissionModel.findOne({
      where: {
        role_id: roleId,
        permission_id: assignPermissionDto.permissionId
      }
    });

    if (existingRolePermission) {
      throw new BadRequestException('Role already has this permission');
    }

    // Assign the permission
    await this.rolePermissionModel.create({
      role_id: roleId,
      permission_id: assignPermissionDto.permissionId
    });

    return this.findById(roleId, currentUser);
  }

  async addPermission(id: number, addPermissionDto: AddPermissionDto): Promise<Role> {
    const role = await this.findById(id);
    const permission = await this.permissionModel.findByPk(addPermissionDto.permissionId);
    
    if (!permission) {
      throw new NotFoundException(`Permission with ID ${addPermissionDto.permissionId} not found`);
    }
    
    await role.$add('permissions', permission);
    
    return this.findById(id);
  }

   async removePermission(roleId: number, permissionId: number, currentUser: any): Promise<Role> {
    if (!currentUser) {
      throw new UnauthorizedException('currentUser not found or token expired');
    }

    // Find the role
    const role = await this.roleModel.findByPk(roleId);
    if (!role) {
      throw new NotFoundException(`Role with ID ${roleId} not found`);
    }

    // Find the permission
    const permission = await this.permissionModel.findByPk(permissionId);
    if (!permission) {
      throw new NotFoundException(`Permission with ID ${permissionId} not found`);
    }

    // Prevent removing critical permissions from system roles
    if (['SuperAdmin', 'Admin'].includes(role.name)) {
      throw new ForbiddenException('Cannot modify permissions for system roles');
    }

    // Check if role has this permission
    const rolePermission = await this.rolePermissionModel.findOne({
      where: {
        role_id: roleId,
        permission_id: permissionId
      }
    });

    if (!rolePermission) {
      throw new BadRequestException('Role does not have this permission');
    }

    // Remove the permission
    await rolePermission.destroy();

    return this.findById(roleId, currentUser);
  }

  async getRolePermissions(roleId: number, currentUser: any): Promise<Permission[]> {
    if (!currentUser) {
      throw new UnauthorizedException('currentUser not found or token expired');
    }

    // Find the role and validate it exists
    const role = await this.roleModel.findByPk(roleId);
    if (!role) {
      throw new NotFoundException(`Role with ID ${roleId} not found`);
    }

    // Get role permissions
    const roleWithPermissions = await this.roleModel.findByPk(roleId, {
      include: [
        {
          model: Permission,
          attributes: ['id', 'name', 'resource', 'action', 'description'],
          through: { attributes: ['created_at'] }
        }
      ]
    });

    return roleWithPermissions.permissions;
  }

  async replaceRolePermissions(roleId: number, replacePermissionsDto: ReplacePermissionsDto, currentUser: any): Promise<Role> {
    if (!currentUser) {
      throw new UnauthorizedException('currentUser not found or token expired');
    }

    // Find the role
    const role = await this.roleModel.findByPk(roleId);
    if (!role) {
      throw new NotFoundException(`Role with ID ${roleId} not found`);
    }

    // Prevent modifying system roles
    if (['SuperAdmin', 'Admin'].includes(role.name)) {
      throw new ForbiddenException('Cannot modify permissions for system roles');
    }

    // Validate all permissions exist
    const permissions = await this.permissionModel.findAll({
      where: {
        id: {
          [Op.in]: replacePermissionsDto.permissionIds
        }
      }
    });

    if (permissions.length !== replacePermissionsDto.permissionIds.length) {
      throw new BadRequestException('One or more permissions do not exist');
    }

    // Use transaction for atomic operation
    const transaction = await this.roleModel.sequelize.transaction();

    try {
      // Remove all existing permissions
      await this.rolePermissionModel.destroy({
        where: { role_id: roleId },
        transaction
      });

      // Add new permissions
      const rolePermissions = replacePermissionsDto.permissionIds.map(permissionId => ({
        roleId: roleId,
        permissionId: permissionId
      }));

      await this.rolePermissionModel.bulkCreate(rolePermissions, { transaction });

      await transaction.commit();

      return this.findById(roleId, currentUser);
    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  }
  
}