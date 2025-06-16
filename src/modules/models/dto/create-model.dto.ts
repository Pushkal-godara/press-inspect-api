import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsJSON, IsNotEmpty, IsObject, IsOptional, IsString, IsUUID } from 'class-validator';

export class CreateModelDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  serial_number: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  total_impressions: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  manufacturer: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsInt()
  year: number;

  @ApiProperty()
  @IsOptional()
  @IsObject()
  metadata?: Record<string, any>;

  @ApiProperty()
  @IsNotEmpty()
  @IsInt()
  group_id: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsInt()
  buyer_id: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsInt()
  seller_id: number;
}