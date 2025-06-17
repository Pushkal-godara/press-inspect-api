import { IsString, IsOptional, IsInt, IsDate } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';

export class ControlStationTxnDto {

  @ApiProperty()
  @IsOptional()
  @IsInt()
  control_station_id?: number;

  @ApiProperty() 
  @IsOptional()
  @IsInt()
  condition_id?: number;

  @ApiProperty({ description: 'Model type (Flash or USB)' })
  @IsOptional()
  @IsString()
  model?: string;    // Flash or USB

  @ApiProperty()
  @IsOptional()
  @IsInt()
  things_to_check_id?: number;

  @ApiProperty()
  @IsOptional()
  @Type(() => Date)
  @IsDate()
  date_of_inspection?: Date;

  @ApiProperty()
  @IsOptional()
  @IsString()
  remarks?: string;

  @ApiProperty()
  @IsOptional()
  @IsInt()
  user_id?: number;
}