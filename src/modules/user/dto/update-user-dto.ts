import { IsBoolean, IsEmail, IsNotEmpty, IsNumber, IsOptional, IsString, Matches, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateUserDto {
  @ApiProperty({
    description: 'First name',
    example: 'John',
  })
  @IsString()
  @IsOptional()
  first_name?: string;

  @ApiProperty({
    description: 'Last name',
    example: 'Doe',
  })
  @IsString()
  @IsOptional()
  last_name?: string;

//   @ApiProperty({
//     description: 'Role id',     // While updating role id we need to update two entities when creating method !
//     example: 1,                 // Also client need custom permission assignment
//   })
//   @IsNumber()
//   @IsOptional()
//   role_id?: number;

  @ApiProperty({
    description: 'Passport number',
    example: 'A12345678',
  })
  @IsString()
  @IsOptional()
  passport_number?: string;

  @ApiProperty({
    description: 'Email address',
    example: 'johndoe@example.com',
  })
  @IsEmail()
  @IsOptional()
  email?: string;

  @ApiProperty({
    description: 'Phone number',
    example: '1234567890',
  })
  @IsString()
  @IsOptional()
  mobile?: string;

//   @ApiProperty({
//     description: 'Password (must be at least 8 characters long and include uppercase, lowercase, number, and special character)',
//     example: 'StrongP@ss123',
//   })
//   @IsString()
//   @IsOptional()
//   @MinLength(8, { message: 'Password must be at least 8 characters long' })
//   @Matches(
//     /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?])[A-Za-z\d!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+$/,
//     {
//       message:
//         'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character',
//     }
//   )
//   password?: string;

  @ApiProperty({
    description: 'Address',
    example: '123 Main Street, Apartment 4B',
    required: false,
  })
  @IsOptional()
  @IsString()
  address?: string;

  @ApiProperty({
    description: 'City',
    example: 'New York',
  })
  @IsString()
  @IsOptional()
  city?: string;

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
  @IsOptional()
  pincode?: string;

  @ApiProperty({
    description: 'Country ID',
    example: 1,
  })
  @IsNumber()
  @IsOptional()
  country_id?: number;

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
  @IsOptional()
  @IsString()
  registration_id?: string;

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
  @IsOptional()
  joining_date?: Date;

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