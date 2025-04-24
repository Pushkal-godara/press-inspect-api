import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Role } from './entities/role.entity';
import { Permission } from '../permissions/entities/permission.entity';
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
  ) {}

  async findAll(): Promise<Role[]> {
    return this.roleModel.findAll({
      include: [
        {
          model: Permission,
          through: { attributes: [] },
        },
      ],
    });
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