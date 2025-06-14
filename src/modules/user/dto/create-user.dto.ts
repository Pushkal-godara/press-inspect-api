import { IsBoolean, IsDate, IsEmail, IsNotEmpty, IsNumber, IsOptional, IsString, Matches, MinLength } from 'class-validator';
import { Transform } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { Is } from 'sequelize-typescript';

export class CreateUserDto {
  @ApiProperty({
    description: 'First name',
    example: 'John',
  })
  @IsString()
  @IsNotEmpty()
  first_name: string;

  @ApiProperty({
    description: 'Last name',
    example: 'Doe',
  })
  @IsString()
  @IsNotEmpty()
  last_name: string;

  @ApiProperty({
    description: 'Role id',
    example: 1,
    required: true
  })
  @Transform(({ value }) => parseInt(value))
  @IsNumber()
  @IsNotEmpty()
  role_id: number;

  @ApiProperty({
    description: 'Passport number',
    example: 'A12345678',
  })
  @IsString()
  @IsNotEmpty()
  passport_number: string;

  @ApiProperty({
    description: 'Email address',
    example: 'johndoe@example.com',
  })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({
    description: 'Phone number',
    example: '1234567890',
  })
  @IsString()
  @IsNotEmpty()
  mobile: string;

  @ApiProperty({
    description: 'Password (must be at least 8 characters long and include uppercase, lowercase, number, and special character)',
    example: 'StrongP@ss123',
  })
  @IsString()
  @IsNotEmpty()
  @MinLength(8, { message: 'Password must be at least 8 characters long' })
  @Matches(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?])[A-Za-z\d!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+$/,
    {
      message:
        'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character',
    }
  )
  password: string;

  @ApiProperty({
    description: 'Address',
    example: '123 Main Street, Apartment 4B',
    required: false,
  })
  @IsNotEmpty()
  @IsString()
  address: string;

  @ApiProperty({
    description: 'City',
    example: 'New York',
  })
  @IsString()
  @IsNotEmpty()
  city: string;

  @ApiProperty({
    description: 'State',
    example: 'NY',
    required: false,
  })
  @IsOptional()
  @IsString()
  state?: string;

  @ApiProperty({
    description: 'Pincode/ZIP code',
    example: '10001',
  })
  @IsString()
  @IsNotEmpty()
  pincode: string;

  @ApiProperty({
    description: 'Country ID',
    example: 1,
  })
  @Transform(({ value }) => parseInt(value))
  @IsNumber()
  @IsNotEmpty()
  country_id: number;

  @ApiProperty({
    description: 'Company name',
    example: 'Acme Corporation',
    required: false,
  })
  @IsOptional()
  @IsString()
  company_name?: string;

  @ApiProperty({
    description: 'Registration ID',
    example: 'REG123456',
    required: false,
  })
  @IsNotEmpty()
  @IsString()
  registration_id: string;

  @ApiProperty({
    description: 'CV URL',
    example: 'https://example.com/cv/johndoe.pdf',
    required: false,
  })
  @IsOptional()
  @IsString()
  cv_url?: string;

  @ApiProperty({
    description: 'Work experience details',
    example: '5 years of experience in software development',
    required: false,
  })
  @IsOptional()
  @IsString()
  work_experience?: string;

  @ApiProperty({
    description: 'Date of joining',
    example: '2022-01-01',
  })
  @IsString()
  @IsNotEmpty()
  joining_date: Date;

  @ApiProperty({
    description: 'Date of passport expiry',
    example: '2023-01-01',
  })
  @IsString()
  @IsOptional()
  passport_expiry_date?: Date;

  @ApiProperty({
    description: 'Passport attachment',
    example: 'https://example.com/passport.jpg',
  })
  @IsString()
  @IsOptional()
  passport_attachment?: string;

  @ApiProperty({
    description: 'Photo of engineer',
    example: 'https://example.com/engineer.jpg',
  })
  @IsString()
  @IsOptional()
  photo_of_engineer?: string;

  @ApiProperty({
    description: 'Is active',
    example: true,
  })
  @IsBoolean()
  @IsOptional()
  is_active?: boolean;
}