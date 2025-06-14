import { IsNotEmpty, IsInt, IsDate, IsString, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateThingsToCheckUnitsDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  thingsToCheck: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsInt()
  subUnitId: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsInt()
  coatingSystemUnitId: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsDate()
  created_at: Date;
}

export class UpdateThingsToCheckUnitsDto {
  @ApiProperty()
  @IsOptional()
  @IsString()
  thingsToCheck: string;

  @ApiProperty()
  @IsOptional()
  @IsInt()
  subUnitId: number;

  @ApiProperty()
  @IsOptional()
  @IsInt()
  coatingSystemUnitId: number;

  @ApiProperty()
  @IsOptional()
  @IsDate()
  updated_at: Date;
}