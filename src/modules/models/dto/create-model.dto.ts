import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsJSON, IsNotEmpty, IsString, IsUUID } from 'class-validator';
import { Is } from 'sequelize-typescript';

export class CreateModelDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  serialNumber: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  totalImpressions: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  manufacturer: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsInt()
  year: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsJSON()
  metadata: object;

  @ApiProperty()
  @IsNotEmpty()
  @IsInt()
  groupId: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsInt()
  buyerId: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsInt()
  sellerId: number;
}