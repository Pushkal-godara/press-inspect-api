import { IsDate, IsEmail, IsNotEmpty, IsNumber, IsOptional, IsString, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class RegisterDto {
  @ApiProperty({
    description: 'Username',
    example: 'johndoe',
  })
  @IsString()
  @IsNotEmpty()
  username: string;

  @ApiProperty({
    description: 'Email address',
    example: 'johndoe@example.com',
    required: true
  })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({
    description: 'Role id',
    example: 1,
    required: true
  })
  @IsNumber()
  @IsNotEmpty()
  roleId: number;

  @ApiProperty({
    description: 'Password',
    example: 'Password123!',
    required: true
  })
  @IsString()
  @IsNotEmpty()
  @MinLength(6)
  password: string;

  @ApiProperty({
    description: 'Country',
    example: 'Nigeria',
    required: true
  })
  @IsNotEmpty()
  @IsString()
  country: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  companyName?: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  registrationId?: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  workExperience?: string;

  @ApiProperty()
  @IsOptional()
  @IsDate()
  created_at?: Date;

  @ApiProperty()
  @IsOptional()
  @IsDate()
  updated_at?: Date;

}