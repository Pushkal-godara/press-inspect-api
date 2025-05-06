import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req } from '@nestjs/common';
import { RolesService } from './roles.service';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { AddPermissionDto } from './dto/add-permission.dto';
import { ApiTags, ApiOperation, ApiBearerAuth, ApiResponse } from '@nestjs/swagger';
import { JwtAuthGuard } from '../../core/guards/jwt-auth.guard';
import { RolesGuard } from '../../core/guards/roles.guard';
import { PermissionGuard } from 'src/core/guards/permission.guard';
import { RequirePermissions } from 'src/core/decorators/permission.decorator';
import { Roles } from 'src/core/decorators/public.decorator';

@ApiTags('Roles')
@ApiBearerAuth('access_token')
@UseGuards(JwtAuthGuard)
@Controller('roles')
export class RolesController {
  constructor(private readonly rolesService: RolesService) { }

  // @Post()
  // @RequirePermissions('roles:create')
  // create(@Body() createRoleDto: CreateRoleDto) {
  //   return this.rolesService.create(createRoleDto);
  // }

  @RequirePermissions('roles:read')
  @Roles('SuperAdmin', 'Admin')
  @UseGuards(PermissionGuard, RolesGuard)
  @Get()
  findAll(@Req() req) {
    const currentUser = req.user;
    return this.rolesService.findAll(currentUser);
  }

  // @Get(':id')
  // @RequirePermissions('roles:read')
  // findOne(@Param('id') id: number) {
  //   return this.rolesService.findById(id);
  // }

  // @Patch(':id')
  // @RequirePermissions('roles:update')
  // update(@Param('id') id: number, @Body() updateRoleDto: UpdateRoleDto) {
  //   return this.rolesService.update(id, updateRoleDto);
  // }

  // @Delete(':id')
  // @RequirePermissions('roles:delete')
  // remove(@Param('id') id: number) {
  //   return this.rolesService.remove(id);
  // }

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
}