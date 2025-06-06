import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, ForbiddenException, Req, Query } from '@nestjs/common';
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
import { UpdateUserStatusDto } from './dto/update-user-status.dto';

@ApiTags('Users')
@ApiBearerAuth('access_token')
@UseGuards(JwtAuthGuard)
@Controller('users')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly roleService: RolesService
  ) { }

  @RequirePermissions('users:update')
  @Roles('SuperAdmin', 'Admin')
  @UseGuards(PermissionGuard, RolesGuard)
  @ApiOperation({ summary: 'Update user status' })
  @Patch(':id')
  async updateUserStatus(
    @Param('id') userId: number,
    @Body() updateUserStatusDto: UpdateUserStatusDto,
    @Req() req
  ) {
    const currentUser = req.user;
    const updatedUser = await this.userService.updateUserStatus(userId, updateUserStatusDto, currentUser);
    
    return {
      success: true,
      message: 'User status updated successfully',
      data: {
        id: updatedUser.id,
        is_active: updatedUser.is_active,
        firstName: updatedUser.firstName,
        lastName: updatedUser.lastName,
        email: updatedUser.email,
      },
    };
  }

  @RequirePermissions('users:create')
  @Roles('SuperAdmin', 'Admin')
  @UseGuards(PermissionGuard, RolesGuard)
  @ApiOperation({ summary: 'Create a new user' })
  @Post('create')
  create(@Body() createUserDto: CreateUserDto, @Req() req) {
    const currentUser = req.user;
    return this.userService.create(createUserDto, currentUser);
  }


  @RequirePermissions('users:read')
  @Roles('SuperAdmin', 'Admin')
  @UseGuards(PermissionGuard, RolesGuard)
  @ApiOperation({ summary: 'Get all users' })
  @Get()
  findAll(@Req() req) {
    const currentUser = req.user;
    return this.userService.findAll(currentUser);
  }

  @RequirePermissions('users:read')
  @Roles('SuperAdmin', 'Admin')
  @UseGuards(PermissionGuard, RolesGuard)
  @ApiOperation({ summary: 'Get user by ID' })
  @Get(':id')
  findOne(@Param('id') userId : string, @Req() req) {
    const currentUser = req.user;
    return this.userService.findById(+userId, currentUser);
  }

  @RequirePermissions('users:update')
  @Roles('SuperAdmin', 'Admin', 'Customer', 'PrePressInspector', 'PressInspector', 'PostPressInspector', 'PackagingInspector')
  @UseGuards(PermissionGuard, RolesGuard)
  @ApiOperation({ summary: 'Update user by ID' })
  @Patch(':id')
  update(@Param('id') userId: string, @Body() updateUserDto: UpdateUserDto, @Req() req) {
    const currentUser = req.user;
    return this.userService.update(+userId, updateUserDto, currentUser); 
  }




  // @RequirePermissions('users:delete')
  // @Roles('SuperAdmin', 'Admin')
  // @UseGuards(PermissionGuard, RolesGuard)
  // @ApiOperation({ summary: 'Delete user by ID' })
  // @Delete(':id')
  // removeUser(@Param('id') id: string) {
  //   return this.userService.remove(+id); // TODO as per requirement 
  // }
 

  
  // @RequirePermissions('users:update')
  // @Roles('Admin')
  // @UseGuards(PermissionGuard, RolesGuard)
  // @ApiOperation({ summary: 'Add role to user id' })
  // @Post(':id/roles')
  // async addRole(@Param('id') userId: number, @Body() addRoleDto: AddRoleDto, @Req() req) {
  //   const targetUser = await this.userService.findById(userId);
  //   const role = await this.roleService.findById(addRoleDto.roleId);

  //   // Prevent non-Super Admins from modifying Super Admins
  //   if (targetUser.roles.some(r => r.name === 'SuperAdmin') &&
  //     !req.user.roles.includes('SuperAdmin')) {
  //     throw new ForbiddenException('Cannot modify Super Admin users');
  //   }

  //   // Prevent Admins from assigning users from other countries
  //   if (req.user.roles.includes('Admin') &&
  //     !req.user.roles.includes('SuperAdmin') &&
  //     targetUser.country !== req.user.country) {
  //     throw new ForbiddenException('Cannot modify users from other countries');
  //   }

  //   // Prevent assigning Super Admin role unless you're a Super Admin
  //   if (role.name === 'SuperAdmin' && !req.user.roles.includes('SuperAdmin')) {
  //     throw new ForbiddenException('Only Super Admins can assign the Super Admin role');
  //   }
  //   return this.userService.addRole(userId, addRoleDto);
  // }



  
  // @RequirePermissions('users:update')
  // @Roles('Admin')
  // @UseGuards(PermissionGuard, RolesGuard)
  // @ApiOperation({ summary: 'Remove role from user id' })
  // @Delete(':id/roles/:roleId')
  // removeRole(@Param('id') id: number, @Param('roleId') roleId: string) {
  //   return this.userService.removeRole(id, roleId);  // TODO as per requirement 
  // }



  
  // New API endpoint in user controller for country-based user filtering
  // @RequirePermissions('users:read')
  // @Roles('SuperAdmin', 'Admin')
  // @UseGuards(PermissionGuard, RolesGuard)
  // @ApiOperation({ summary: 'Get users filtered by country' })
  // @ApiResponse({ status: 200, description: 'List of users from specific country' })
  // @Get('by-country')
  // findByCountry(@Query('country') country: string, @Req() req) {
  //   const currentUser = req.user;
  //   return this.userService.findByCountry(country, currentUser);
  // }
}