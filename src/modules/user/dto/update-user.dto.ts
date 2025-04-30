import { IsEmail, IsOptional, IsString, IsBoolean, IsNumber, MinLength } from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';
import { ApiProperty } from '@nestjs/swagger';
import { User } from '../entities/user.entity';

export class UpdateUserDto extends PartialType(CreateUserDto) {
    @ApiProperty({ 
        description: 'Current password (required when user changes their own password)', 
        required: false 
      })
      @IsOptional()
      @IsString()
      oldPassword?: string;
    
      @ApiProperty({ 
        description: 'Flag to indicate password reset by admin/super admin', 
        required: false,
        default: false
      })
      @IsOptional()
      @IsBoolean()
      resetPassword?: boolean;
    
      @ApiProperty({ 
        description: 'New password for admin reset (if not provided, random password will be generated)', 
        required: false 
      })
      @IsOptional()
      @IsString()
      newPassword?: string;
}

export interface UserWithGeneratedPassword extends User {
    generatedPassword?: string;
  }