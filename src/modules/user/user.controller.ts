import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { AddRoleDto } from './dto/add-role.dto';
import { ApiTags, ApiOperation, ApiBearerAuth, ApiResponse } from '@nestjs/swagger';
import { JwtAuthGuard } from '../../core/guards/jwt-auth.guard';
import { RolesGuard } from '../../core/guards/roles.guard';
import { PermissionGuard } from 'src/core/guards/permission.guard';
import { RequirePermissions } from 'src/core/decorators/permission.decorator';
import { Roles } from '../../core/decorators/public.decorator';

@ApiTags('Users')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('create')
  @RequirePermissions('users:create')
  // @Roles('admin')
  @ApiOperation({ summary: 'Create a new user' })
  @ApiResponse({ status: 201, description: 'User successfully created' })
  @ApiResponse({ status: 400, description: 'Bad request - Invalid data' })
  @ApiResponse({ status: 409, description: 'Conflict - Email or username already exists' })
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Get()
  @Roles('admin')
  @RequirePermissions('users:read')
  @ApiOperation({ summary: 'Get all users' })
  @ApiResponse({ status: 200, description: 'List of users' })
  findAll() {
    return this.userService.findAll();
  }

  @Get(':id')
  @RequirePermissions('users:read')
  @ApiOperation({ summary: 'Get user by ID' })
  @ApiResponse({ status: 200, description: 'User found' })
  @ApiResponse({ status: 404, description: 'User not found' })
  findOne(@Param('id') id: string) {
    return this.userService.findById(+id);
  }

  @Patch(':id')
  @RequirePermissions('users:update')
  @ApiOperation({ summary: 'Update user by ID' })
  @ApiResponse({ status: 200, description: 'User successfully updated' })
  @ApiResponse({ status: 404, description: 'User not found' })
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(+id, updateUserDto);
  }

  @Delete(':id')
  @RequirePermissions('users:delete')
  @Roles('admin')
  @ApiOperation({ summary: 'Delete user by ID' })
  @ApiResponse({ status: 200, description: 'User successfully deleted' })
  @ApiResponse({ status: 404, description: 'User not found' })
  remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }

  @Post(':id/roles')
  @RequirePermissions('users:update')
  addRole(@Param('id') id: number, @Body() addRoleDto: AddRoleDto) {
    return this.userService.addRole(id, addRoleDto);
  }

  @Delete(':id/roles/:roleId')
  @RequirePermissions('users:update')
  removeRole(@Param('id') id: number, @Param('roleId') roleId: string) {
    return this.userService.removeRole(id, roleId);
  }
}