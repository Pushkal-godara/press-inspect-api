import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsUUID, IsOptional, IsString, IsISO8601 } from 'class-validator';

export class CreateBuyerSellerDto {
  @ApiProperty({ description: 'Company name', example: 'ABC Company' })
  @IsNotEmpty()
  @IsString()
  companyName: string;

  @ApiProperty({ description: 'Address', example: '123 Main St, Anytown, USA' })
  @IsNotEmpty()
  @IsString()
  address: string;  
}