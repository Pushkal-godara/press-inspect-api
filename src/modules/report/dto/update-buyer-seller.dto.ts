import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsUUID, IsOptional, IsString, IsISO8601 } from 'class-validator';

export class UpdateBuyerSellerDto {
  @ApiProperty({ description: 'Company name', example: 'ABC Company' })
  @IsOptional()
  @IsString()
  company_name?: string;

  @ApiProperty({ description: 'Address', example: '123 Main St, Anytown, USA' })
  @IsOptional()
  @IsString()
  address?: string;  
}