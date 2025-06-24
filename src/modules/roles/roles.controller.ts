import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req, Put } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth, ApiResponse } from '@nestjs/swagger';

import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { AddPermissionDto } from './dto/add-permission.dto';
import { AssignPermissionDto, ReplacePermissionsDto} from './dto/permission.dto';

import { JwtAuthGuard } from '../../core/guards/jwt-auth.guard';
import { RolesGuard } from '../../core/guards/roles.guard';
import { PermissionGuard } from 'src/core/guards/permission.guard';
import { RequirePermissions } from 'src/core/decorators/permission.decorator';
import { Roles } from 'src/core/decorators/public.decorator';

import { RolesService } from './roles.service';

@ApiTags('Roles')
@ApiBearerAuth('access_token')
@UseGuards(JwtAuthGuard)
@Controller('roles')
export class RolesController {
  constructor(private readonly rolesService: RolesService) { }

  @RequirePermissions('roles:create')
  @Roles('SuperAdmin')
  @UseGuards(PermissionGuard, RolesGuard)
  @ApiOperation({ summary: 'Create a new role' })
  @Post()
  create(@Body() createRoleDto: CreateRoleDto, @Req() req) {
    const currentUser = req.user;
    return this.rolesService.create(createRoleDto, currentUser);
  }

  @RequirePermissions('roles:read')
  @Roles('SuperAdmin', 'Admin')
  @UseGuards(PermissionGuard, RolesGuard)
  @Get()
  findAll(@Req() req) {
    const currentUser = req.user;
    return this.rolesService.findAll(currentUser);
  }

  @RequirePermissions('roles:read')
  @Roles('SuperAdmin')
  @UseGuards(PermissionGuard, RolesGuard)
  @ApiOperation({ summary: 'Get role by id' })
  @Get(':id')
  findOne(@Param('id') id: number, @Req() req) {
    const currentUser = req.user;
    return this.rolesService.findById(id, currentUser);
  }

  @RequirePermissions('roles:update')
  @Roles('SuperAdmin')
  @UseGuards(PermissionGuard, RolesGuard)
  @ApiOperation({ summary: 'Update role by ID' })
  @Patch(':id')
  update(@Param('id') id: number, @Body() updateRoleDto: UpdateRoleDto, @Req() req) {
    const currentUser = req.user;
    return this.rolesService.update(+id, updateRoleDto, currentUser);
  }

  @RequirePermissions('roles:delete')
  @Roles('SuperAdmin')
  @UseGuards(PermissionGuard, RolesGuard)
  @ApiOperation({ summary: 'Delete role by ID' })
  @Delete(':id')
  remove(@Param('id') id: number, @Req() req) {
    const currentUser = req.user;
    return this.rolesService.remove(+id, currentUser);
  }

  // @Post(':id/permissions')
  // @RequirePermissions('roles:update')
  // addPermission(@Param('id') id: number, @Body() addPermissionDto: AddPermissionDto) {
  //   return this.rolesService.addPermission(id, addPermissionDto);
  // }

  // @Delete(':id/permissions/:permissionId')
  // @RequirePermissions('roles:update')
  // removePermission(@Param('id') id: number, @Param('permissionId') permissionId: string) {
  //   return this.rolesService.removePermission(id, permissionId);
  // }

  // ========== PERMISSION MANAGEMENT ENDPOINTS ==========

  @RequirePermissions('roles:update')
  @Roles('SuperAdmin')
  @UseGuards(PermissionGuard, RolesGuard)
  @ApiOperation({ summary: 'Assign permission to role' })
  @Post('permissions/:id')
  async assignPermission(
    @Param('id') roleId: number,
    @Body() assignPermissionDto: AssignPermissionDto,
    @Req() req
  ) {
    const currentUser = req.user;
    const result = await this.rolesService.assignPermission(+roleId, assignPermissionDto, currentUser);
    
    return {
      success: true,
      message: 'Permission assigned successfully',
      data: result
    };
  }

  @RequirePermissions('roles:update')
  @Roles('SuperAdmin')
  @UseGuards(PermissionGuard, RolesGuard)
  @ApiOperation({ summary: 'Remove permission from role' })
  @Delete(':id/permissions/:permissionId')
  async removePermission(
    @Param('id') roleId: number,
    @Param('permissionId') permissionId: number,
    @Req() req
  ) {
    const currentUser = req.user;
    const result = await this.rolesService.removePermission(+roleId, +permissionId, currentUser);
    
    return {
      success: true,
      message: 'Permission removed successfully',
      data: result
    };
  }

  @RequirePermissions('roles:read')
  @Roles('SuperAdmin', 'Admin')
  @UseGuards(PermissionGuard, RolesGuard)
  @ApiOperation({ summary: 'Get role permissions' })
  @Get(':id/permissions')
  async getRolePermissions(
    @Param('id') roleId: number,
    @Req() req
  ) {
    const currentUser = req.user;
    const permissions = await this.rolesService.getRolePermissions(+roleId, currentUser);
    
    return {
      success: true,
      message: 'Role permissions retrieved successfully',
      data: permissions
    };
  }

  @RequirePermissions('roles:update')
  @Roles('SuperAdmin')
  @UseGuards(PermissionGuard, RolesGuard)
  @ApiOperation({ summary: 'Replace all role permissions' })
  @Put(':id/permissions')
  async replaceRolePermissions(
    @Param('id') roleId: string,
    @Body() replacePermissionsDto: ReplacePermissionsDto,
    @Req() req
  ) {
    const currentUser = req.user;
    const result = await this.rolesService.replaceRolePermissions(+roleId, replacePermissionsDto, currentUser);
    
    return {
      success: true,
      message: 'Role permissions updated successfully',
      data: result
    };
  }
}
