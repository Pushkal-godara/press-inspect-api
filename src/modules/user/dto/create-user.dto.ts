import { IsEmail, IsNotEmpty, IsNumber, IsOptional, IsString, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
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
  })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({
    description: 'Role id',
    example: 1,
  })
  @IsNumber()
  @IsNotEmpty()
  roleId: number;

  @ApiProperty({
    description: 'Password',
    example: 'Password123!',
  })
  @IsString()
  @IsNotEmpty()
  @MinLength(6)
  password: string;

  @ApiProperty()
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
  cvUrl?: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  workExperience?: string;
}