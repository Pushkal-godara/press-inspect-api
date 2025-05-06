import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Role } from './entities/role.entity';
import { Permission } from '../permissions/entities/permission.entity';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { AddPermissionDto } from './dto/add-permission.dto';
import { Op } from 'sequelize';

@Injectable()
export class RolesService {
  constructor(
    @InjectModel(Role)
    private roleModel: typeof Role,
    @InjectModel(Permission)
    private permissionModel: typeof Permission,
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

  async findById(id: number): Promise<Role> {
    const role = await this.roleModel.findByPk(id, {
      include: [
        {
          model: Permission,
          through: { attributes: [] },
        },
      ],
    });

    if (!role) {
      throw new NotFoundException(`Role with ID ${id} not found`);
    }

    return role;
  }

  async create(createRoleDto: CreateRoleDto): Promise<Role> {
    return this.roleModel.create(createRoleDto as any);
  }

  async update(id: number, updateRoleDto: UpdateRoleDto): Promise<Role> {
    const role = await this.findById(id);
    
    await role.update(updateRoleDto);
    
    return this.findById(id);
  }

  async remove(id: number): Promise<void> {
    const role = await this.findById(id);
    await role.destroy();
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

  async removePermission(id: number, permissionId: string): Promise<Role> {
    const role = await this.findById(id);
    const permission = await this.permissionModel.findByPk(permissionId);
    
    if (!permission) {
      throw new NotFoundException(`Permission with ID ${permissionId} not found`);
    }
    
    await role.$remove('permissions', permission);
    
    return this.findById(id);
  }
}