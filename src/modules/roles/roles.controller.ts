import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { RolesService } from './roles.service';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { AddPermissionDto } from './dto/add-permission.dto';
import { ApiTags, ApiOperation, ApiBearerAuth, ApiResponse } from '@nestjs/swagger';
import { JwtAuthGuard } from '../../core/guards/jwt-auth.guard';
import { RolesGuard } from '../../core/guards/roles.guard';
import { PermissionGuard } from 'src/core/guards/permission.guard';
import { RequirePermissions } from 'src/core/decorators/permission.decorator';

@ApiTags('company')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RolesGuard, PermissionGuard)
@Controller('roles')
export class RolesController {
  constructor(private readonly rolesService: RolesService) {}

  @Post()
  @RequirePermissions('roles:create')
  create(@Body() createRoleDto: CreateRoleDto) {
    return this.rolesService.create(createRoleDto);
  }

  @Get()
  @RequirePermissions('roles:read')
  findAll() {
    return this.rolesService.findAll();
  }

  @Get(':id')
  @RequirePermissions('roles:read')
  findOne(@Param('id') id: number) {
    return this.rolesService.findById(id);
  }

  @Patch(':id')
  @RequirePermissions('roles:update')
  update(@Param('id') id: number, @Body() updateRoleDto: UpdateRoleDto) {
    return this.rolesService.update(id, updateRoleDto);
  }

  @Delete(':id')
  @RequirePermissions('roles:delete')
  remove(@Param('id') id: number) {
    return this.rolesService.remove(id);
  }

  @Post(':id/permissions')
  @RequirePermissions('roles:update')
  addPermission(@Param('id') id: number, @Body() addPermissionDto: AddPermissionDto) {
    return this.rolesService.addPermission(id, addPermissionDto);
  }

  @Delete(':id/permissions/:permissionId')
  @RequirePermissions('roles:update')
  removePermission(@Param('id') id: number, @Param('permissionId') permissionId: string) {
    return this.rolesService.removePermission(id, permissionId);
  }
}