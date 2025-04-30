import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, ForbiddenException, Req } from '@nestjs/common';
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
import { RolesService } from '../roles/roles.service';

@ApiTags('Users')
@ApiBearerAuth('access_token')
@UseGuards(JwtAuthGuard)
@Controller('users')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly roleService: RolesService
  ) { }

  @RequirePermissions('users:create')
  @Roles('SuperAdmin', 'Admin')
  @UseGuards(PermissionGuard, RolesGuard)
  @ApiOperation({ summary: 'Create a new user' })
  @Post('create')
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }


  @RequirePermissions('users:read')
  @Roles('SuperAdmin', 'Admin')
  @UseGuards(PermissionGuard, RolesGuard)
  @ApiOperation({ summary: 'Get all users' })
  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @RequirePermissions('users:read')
  @Roles('SuperAdmin', 'Admin')
  @UseGuards(PermissionGuard, RolesGuard)
  @ApiOperation({ summary: 'Get user by ID' })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.findById(+id);
  }

  @RequirePermissions('users:update')
  @Roles('SuperAdmin', 'Admin')
  @UseGuards(PermissionGuard, RolesGuard)
  @ApiOperation({ summary: 'Update user by ID' })
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto, @Req() req) {
    console.log('REQUEST =========== >>>>> ', req);
    const currentUser = req.user;
    return this.userService.update(+id, updateUserDto, currentUser); 
  }

  @RequirePermissions('users:delete')
  @Roles('SuperAdmin', 'Admin')
  @UseGuards(PermissionGuard, RolesGuard)
  @ApiOperation({ summary: 'Delete user by ID' })
  @Delete(':id')
  removeUser(@Param('id') id: string) {
    return this.userService.remove(+id); // TODO as per requirement 
  }

  @RequirePermissions('users:update')
  @Roles('Admin')
  @UseGuards(PermissionGuard, RolesGuard)
  @ApiOperation({ summary: 'Add role to user id' })
  @Post(':id/roles')
  async addRole(@Param('id') userId: number, @Body() addRoleDto: AddRoleDto, @Req() req) {
    const targetUser = await this.userService.findById(userId);
    const role = await this.roleService.findById(addRoleDto.roleId);

    // Prevent non-Super Admins from modifying Super Admins
    if (targetUser.roles.some(r => r.name === 'SuperAdmin') &&
      !req.user.roles.includes('SuperAdmin')) {
      throw new ForbiddenException('Cannot modify Super Admin users');
    }

    // Prevent Admins from assigning users from other countries
    if (req.user.roles.includes('Admin') &&
      !req.user.roles.includes('SuperAdmin') &&
      targetUser.country !== req.user.country) {
      throw new ForbiddenException('Cannot modify users from other countries');
    }

    // Prevent assigning Super Admin role unless you're a Super Admin
    if (role.name === 'SuperAdmin' && !req.user.roles.includes('SuperAdmin')) {
      throw new ForbiddenException('Only Super Admins can assign the Super Admin role');
    }
    return this.userService.addRole(userId, addRoleDto);
  }

  @RequirePermissions('users:update')
  @Roles('Admin')
  @UseGuards(PermissionGuard, RolesGuard)
  @ApiOperation({ summary: 'Remove role from user id' })
  @Delete(':id/roles/:roleId')
  removeRole(@Param('id') id: number, @Param('roleId') roleId: string) {
    return this.userService.removeRole(id, roleId);  // TODO as per requirement 
  }

  
  // New API endpoint in user controller for country-based user filtering
  @Get('by-country')
  @RequirePermissions('users:read')
  @UseGuards(PermissionGuard)
  @ApiOperation({ summary: 'Get users filtered by country' })
  @ApiResponse({ status: 200, description: 'List of users from specific country' })
  async findByCountry(@Req() req) {
    if (req.user.roles.includes('Super Admin')) {
      // If country query param is provided, filter by that country
      if (req.query.country) {
        return this.userService.findByCountry(req.query.country);
      }
      // Otherwise return all users (global access)
      else {
        return this.userService.findAll();
      }
    }

    // If Admin, restrict to their own country
    if (req.user.roles.includes('Admin')) {
      return this.userService.findByCountry(req.user.country);
    }

    // Otherwise, restrict access
    throw new ForbiddenException('Insufficient permissions');
  }
}