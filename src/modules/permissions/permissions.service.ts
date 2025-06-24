import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Permission } from './entities/permission.entity';
import { CreatePermissionDto } from './dto/create-permission.dto';
import { UpdatePermissionDto } from './dto/update-permission.dto';

@Injectable()
export class PermissionsService {
  constructor(
    @InjectModel(Permission)
    private permissionModel: typeof Permission,
  ) {}

  async findAll(currentUser?: any): Promise<Permission[]> {
    if (!currentUser) {
      throw new UnauthorizedException('currentUser not found or token expired');
    }
    return this.permissionModel.findAll({
      attributes: ['id', 'name', 'resource', 'action', 'description'],
    });
  }

  async findById(id: string): Promise<Permission> {
    const permission = await this.permissionModel.findByPk(id);
    
    if (!permission) {
      throw new NotFoundException(`Permission with ID ${id} not found`);
    }
    
    return permission;
  }

  async create(createPermissionDto: CreatePermissionDto): Promise<Permission> {
    return this.permissionModel.create(createPermissionDto as any);
  }

  async update(id: string, updatePermissionDto: UpdatePermissionDto): Promise<Permission> {
    const permission = await this.findById(id);
    
    await permission.update(updatePermissionDto);
    
    return this.findById(id);
  }

  async remove(id: string): Promise<void> {
    const permission = await this.findById(id);
    await permission.destroy();
  }
}