import { IsArray, IsNotEmpty, IsNumber, IsObject, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreatePermissionDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  description?: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  resource: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  action: string;
}