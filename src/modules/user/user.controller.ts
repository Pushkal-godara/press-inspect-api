import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, BadRequestException, UploadedFiles, UseInterceptors,  Req, Query, Res } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth, ApiConsumes, ApiBody, ApiParam  } from '@nestjs/swagger';
import { Response } from 'express';

import { JwtAuthGuard } from '../../core/guards/jwt-auth.guard';
import { RolesGuard } from '../../core/guards/roles.guard';
import { PermissionGuard } from 'src/core/guards/permission.guard';
import { RequirePermissions } from 'src/core/decorators/permission.decorator';
import { Roles } from '../../core/decorators/public.decorator';

import { s3UploadConfig } from '../../config/multer.config';

import { RolesService } from '../roles/roles.service';
import { UserService } from './user.service';
import { S3Service } from '../../services/s3.service';

import { UpdateUserStatusDto } from './dto/update-user-status.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserPasswordDto } from './dto/update-user-password.dto';
import { AddRoleDto } from './dto/add-role.dto';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { UpdateUserDto } from './dto/update-user-dto';

@ApiTags('Users')
@ApiBearerAuth('access_token')
@UseGuards(JwtAuthGuard)
@Controller('users')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly roleService: RolesService,
    private readonly s3Service: S3Service
  ) { }

  @RequirePermissions('users:update')
  @Roles('SuperAdmin', 'Admin')
  @UseGuards(PermissionGuard, RolesGuard)
  @ApiOperation({ summary: 'Update user status' })
  @Patch('update-user-status-by-id/:id')
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
  @ApiOperation({ summary: 'Create a new user (with optional file uploads)' })
  @ApiConsumes('multipart/form-data', 'application/json') // Accept both
  @UseInterceptors(
    FileFieldsInterceptor(
      [
        { name: 'cv', maxCount: 1 },
        { name: 'passportAttachment', maxCount: 1 },
        { name: 'photoOfEngineer', maxCount: 1 },
      ],
      s3UploadConfig,
    ),
  )
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        // Your existing DTO fields
        email: { type: 'string', format: 'email' },
        password: { type: 'string' },
        firstnName: { type: 'string' },
        lastName: { type: 'string' },
        passportNumber: { type: 'string' },
        mobile: { type: 'string' },
        address: { type: 'string' },
        city: { type: 'string' },
        state: { type: 'string' },
        pincode: { type: 'string' },
        countryId: { type: 'number' },
        companyName: { type: 'string' },
        registrationId: { type: 'string' },
        workExperience: { type: 'string' },
        passportExpiryDate: { type: 'string', format: 'date' },
        roleId: { type: 'number' },
        // Optional file fields
        cv: { type: 'string', format: 'binary', description: 'CV PDF file (optional)' },
        passportAttachment: { type: 'string', format: 'binary', description: 'Passport PDF file (optional)' },
        photoOfEngineer: { type: 'string', format: 'binary', description: 'Engineer photo JPG/PNG (optional)' },
      },
      required: ['email', 'password'], // Your existing required fields
    },
  })
  @Post('create')
  async create(
    @Body() createUserDto: CreateUserDto, 
    @Req() req,
    @UploadedFiles()
    files?: {
      cv?: Express.Multer.File[];
      passportAttachment?: Express.Multer.File[];
      photoOfEngineer?: Express.Multer.File[];
    },
  ) {
    const currentUser = req.user;
    const uploadedFiles = {
      cv: null,
      passportAttachment: null,
      photoOfEngineer: null,
    };

    try {
      // Handle file uploads if present
      if (files?.cv && files.cv[0]) {
        const cvUrl = await this.s3Service.uploadFile(files.cv[0], 'cv-files');
        createUserDto.cvUrl = cvUrl;
        uploadedFiles.cv = cvUrl;
      }

      if (files?.passportAttachment && files.passportAttachment[0]) {
        const passportUrl = await this.s3Service.uploadFile(files.passportAttachment[0], 'passport-files');
        createUserDto.passportAttachment = passportUrl;
        uploadedFiles.passportAttachment = passportUrl;
      }

      if (files?.photoOfEngineer && files.photoOfEngineer[0]) {
        const photoUrl = await this.s3Service.uploadFile(files.photoOfEngineer[0], 'engineer-photos');
        createUserDto.photoOfEngineer = photoUrl;
        uploadedFiles.photoOfEngineer = photoUrl;
      }

      // Use your existing service method
      const user = await this.userService.create(createUserDto, currentUser);

      // Return response in your existing format or enhanced format
      return {
        success: true,
        message: 'User created successfully',
        data: user,
        ...(files && { uploadedFiles }) // Only include uploadedFiles if files were sent
      };

    } catch (error) {
      // Cleanup uploaded files if user creation fails
      await this.cleanupUploadedFiles(uploadedFiles);
      throw error;
    }
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
  @ApiOperation({ summary: 'Update user password by ID' })
  @Patch('password-update/:id')
  updatePassword(@Param('id') userId: string, @Body() updateUserPasswordDto: UpdateUserPasswordDto, @Req() req) {
    const currentUser = req.user;
    return this.userService.updatePassword(+userId, updateUserPasswordDto, currentUser); 
  }


  @RequirePermissions('users:update')
  @Roles('SuperAdmin', 'Admin', 'Customer', 'PrePressInspector', 'PressInspector', 'PostPressInspector', 'PackagingInspector')
  @UseGuards(PermissionGuard, RolesGuard)
  @ApiOperation({ summary: 'Update user by ID (with optional file uploads)' })
  @ApiConsumes('multipart/form-data', 'application/json') // Accept both
  @UseInterceptors(
    FileFieldsInterceptor(
      [
        { name: 'cv', maxCount: 1 },
        { name: 'passportAttachment', maxCount: 1 },
        { name: 'photoOfEngineer', maxCount: 1 },
      ],
      s3UploadConfig,
    ),
  )
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        email: { type: 'string', format: 'email' },
        firstName: { type: 'string' },
        lastName: { type: 'string' },
        passportNumber: { type: 'string' },
        mobile: { type: 'string' },
        address: { type: 'string' },
        city: { type: 'string' },
        state: { type: 'string' },
        pincode: { type: 'string' },
        companyName: { type: 'string' },
        registrationId: { type: 'string' },
        workExperience: { type: 'string' },
        passportExpiryDate: { type: 'string', format: 'date' },
        // Optional file fields
        cv: { type: 'string', format: 'binary', description: 'CV PDF file (optional)' },
        passportAttachment: { type: 'string', format: 'binary', description: 'Passport PDF file (optional)' },
        photoOfEngineer: { type: 'string', format: 'binary', description: 'Engineer photo JPG/PNG (optional)' },
      },
    },
  })
  @Patch('update-user-by-id/:id')
  async update(
    @Param('id') userId: string, 
    @Body() updateUserDto: UpdateUserDto, 
    @Req() req,
    @UploadedFiles()
    files?: {
      cv?: Express.Multer.File[];
      passportAttachment?: Express.Multer.File[];
      photoOfEngineer?: Express.Multer.File[];
    },
  ) {
    const currentUser = req.user;
    const id = +userId;
    
    // Get current user data for old file cleanup
    const user = await this.userService.findById(id, currentUser);
    const oldFiles = {
      cv: user.cv_url,
      passportAttachment: user.passport_attachment,
      photoOfEngineer: user.photo_of_engineer,
    };

    const newFiles = {
      cv: null,
      passportAttachment: null,
      photoOfEngineer: null,
    };

    try {
      // Handle file uploads if present
      if (files?.cv && files.cv[0]) {
        const cvUrl = await this.s3Service.uploadFile(files.cv[0], 'cv-files');
        updateUserDto.cvUrl = cvUrl;
        newFiles.cv = cvUrl;
      }

      if (files?.passportAttachment && files.passportAttachment[0]) {
        const passportUrl = await this.s3Service.uploadFile(files.passportAttachment[0], 'passport-files');
        updateUserDto.passportAttachment = passportUrl;
        newFiles.passportAttachment = passportUrl;
      }

      if (files?.photoOfEngineer && files.photoOfEngineer[0]) {
        const photoUrl = await this.s3Service.uploadFile(files.photoOfEngineer[0], 'engineer-photos');
        updateUserDto.photoOfEngineer = photoUrl;
        newFiles.photoOfEngineer = photoUrl;
      }

      // Use your existing service method
      const updatedUser = await this.userService.update(id, updateUserDto);

      // Delete old files from S3 if new files were uploaded
      await this.cleanupOldFiles(oldFiles, newFiles);

      // Return response in your existing format or enhanced format
      return {
        success: true,
        message: 'User updated successfully',
        data: updatedUser,
        ...(files && { uploadedFiles: newFiles }) // Only include uploadedFiles if files were sent
      };

    } catch (error) {
      // Cleanup new uploaded files if update fails
      await this.cleanupUploadedFiles(newFiles);
      throw error;
    }
  }

  // ========== NEW FILE DOWNLOAD ENDPOINTS ==========

  @RequirePermissions('users:read')
  @Roles('SuperAdmin', 'Admin', 'Customer', 'PrePressInspector', 'PressInspector', 'PostPressInspector', 'PackagingInspector')
  @UseGuards(PermissionGuard, RolesGuard)
  @ApiOperation({ summary: 'Download user CV' })
  @Get('download/cv/:id')
  async downloadCV(@Param('id') id: string, @Res() res: Response, @Req() req) {
    const currentUser = req.user;
    const userId = parseInt(id);
    const user = await this.userService.findById(userId, currentUser);

    if (!user || !user.cv_url) {
      throw new BadRequestException('CV not found for this user');
    }

    const signedUrl = await this.s3Service.getSignedDownloadUrl(user.cv_url);
    res.redirect(signedUrl);
  }

  @RequirePermissions('users:read')
  @Roles('SuperAdmin', 'Admin', 'Customer', 'PrePressInspector', 'PressInspector', 'PostPressInspector', 'PackagingInspector')
  @UseGuards(PermissionGuard, RolesGuard)
  @ApiOperation({ summary: 'Download user passport attachment' })
  @Get('download/passport/:id')
  async downloadPassport(@Param('id') id: string, @Res() res: Response, @Req() req) {
    const currentUser = req.user;
    const userId = parseInt(id);
    const user = await this.userService.findById(userId, currentUser);

    if (!user || !user.passport_attachment) {
      throw new BadRequestException('Passport attachment not found for this user');
    }

    const signedUrl = await this.s3Service.getSignedDownloadUrl(user.passport_attachment);
    res.redirect(signedUrl);
  }

  @RequirePermissions('users:read')
  @Roles('SuperAdmin', 'Admin', 'Customer', 'PrePressInspector', 'PressInspector', 'PostPressInspector', 'PackagingInspector')
  @UseGuards(PermissionGuard, RolesGuard)
  @ApiOperation({ summary: 'Download user photo' })
  @Get('download/photo/:id')
  async downloadPhoto(@Param('id') id: string, @Res() res: Response, @Req() req) {
    const currentUser = req.user;
    const userId = parseInt(id);
    const user = await this.userService.findById(userId, currentUser);

    if (!user || !user.photo_of_engineer) {
      throw new BadRequestException('Engineer photo not found for this user');
    }

    const signedUrl = await this.s3Service.getSignedDownloadUrl(user.photo_of_engineer);
    res.redirect(signedUrl);
  }

// ========== HELPER METHODS ==========
  private async cleanupUploadedFiles(files: { cv?: string; passportAttachment?: string; photoOfEngineer?: string }) {
    const promises = [];
    
    if (files.cv) promises.push(this.s3Service.deleteFile(files.cv));
    if (files.passportAttachment) promises.push(this.s3Service.deleteFile(files.passportAttachment));
    if (files.photoOfEngineer) promises.push(this.s3Service.deleteFile(files.photoOfEngineer));

    await Promise.allSettled(promises);
  }

  private async cleanupOldFiles(oldFiles: any, newFiles: any) {
    const promises = [];
    
    if (newFiles.cv && oldFiles.cv) promises.push(this.s3Service.deleteFile(oldFiles.cv));
    if (newFiles.passportAttachment && oldFiles.passportAttachment) promises.push(this.s3Service.deleteFile(oldFiles.passportAttachment));
    if (newFiles.photoOfEngineer && oldFiles.photoOfEngineer) promises.push(this.s3Service.deleteFile(oldFiles.photoOfEngineer));

    await Promise.allSettled(promises);
  }



  @RequirePermissions('users:delete')
  @Roles('SuperAdmin', 'Admin')
  @UseGuards(PermissionGuard, RolesGuard)
  @ApiOperation({ summary: 'Delete user by ID' })
  @Delete(':id')
  removeUser(@Param('id') id: string, @Req() req) {
    const currentUser = req.user;
    return this.userService.remove(+id, currentUser);
  }

  
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
  // removeRole(@Param('id') id: number, @Param('roleId') roleId: string, @Req() req) {
  //   const currentUser = req.user;
  //   return this.userService.removeRole(id, roleId, currentUser);
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