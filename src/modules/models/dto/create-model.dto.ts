import { IsInt, IsJSON, IsNotEmpty, IsString, IsUUID } from 'class-validator';
import { Is } from 'sequelize-typescript';

export class CreateModelDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  serialNumber: string;

  @IsNotEmpty()
  @IsString()
  totalImpressions: string;

  @IsNotEmpty()
  @IsString()
  manufacturer: string;

  @IsNotEmpty()
  @IsInt()
  year: number;

  @IsNotEmpty()
  @IsJSON()
  metadata: object;

  @IsNotEmpty()
  @IsInt()
  groupId: number;

  @IsNotEmpty()
  @IsInt()
  buyerId: number;

  @IsNotEmpty()
  @IsInt()
  sellerId: number;
}