import { IsEmail, IsOptional, IsString, IsBoolean, IsNumber, MinLength, Matches } from 'class-validator';
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
    description: 'New password for admin reset (if not provided, random password will be generated). Must be at least 8 characters long and include uppercase, lowercase, number, and special character',
    required: false,
    example: 'StrongP@ss123',
  })
  @IsOptional()
  @IsString()
  @MinLength(8, { message: 'New password must be at least 8 characters long' })
  @Matches(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?])[A-Za-z\d!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+$/,
    {
      message:
        'New password must contain at least one uppercase letter, one lowercase letter, one number, and one special character',
    }
  )
  newPassword?: string;
}

export interface UserWithGeneratedPassword extends User {
  generatedPassword?: string;
}