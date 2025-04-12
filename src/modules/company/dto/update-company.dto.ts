import { IsOptional, IsString, IsObject } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateCompanyDto {
  @ApiProperty({
    description: 'Company name',
    example: 'Acme Inc.',
    required: false,
  })
  @IsString()
  @IsOptional()
  name?: string;

  @ApiProperty({
    description: 'Company address',
    example: '123 Main Street, New York, NY 10001',
    required: false,
  })
  @IsString()
  @IsOptional()
  address?: string;

  @ApiProperty({
    description: 'Company contact information',
    example: { phone: '123-456-7890', email: 'info@acme.com' },
    required: false,
  })
  @IsObject()
  @IsOptional()
  contactInfo?: Record<string, any>;

  @ApiProperty({
    description: 'Subscription status',
    example: 'active',
    required: false,
  })
  @IsString()
  @IsOptional()
  subscriptionStatus?: string;
}