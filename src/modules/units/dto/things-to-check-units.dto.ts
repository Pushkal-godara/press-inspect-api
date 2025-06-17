import { IsNotEmpty, IsInt, IsDate, IsString, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateThingsToCheckUnitsDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  things_to_check: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsInt()
  sub_unit_id: number;

  @ApiProperty()
  @IsOptional()
  @IsInt()
  coating_system_unit_id?: number;

}

export class UpdateThingsToCheckUnitsDto {
  @ApiProperty()
  @IsOptional()
  @IsString()
  things_to_check: string;

  @ApiProperty()
  @IsOptional()
  @IsInt()
  sub_unit_id?: number;

  @ApiProperty()
  @IsOptional()
  @IsInt()
  coating_system_unit_id?: number;

}