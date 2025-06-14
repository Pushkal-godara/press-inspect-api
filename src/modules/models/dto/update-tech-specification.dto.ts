import { IsOptional, IsInt, IsDateString, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateTechSpecificationDto {
  @ApiProperty({ required: false })
  @IsInt()
  @IsOptional()
  model_id?: number;

  @ApiProperty({ required: false })
  @IsDateString()
  @IsOptional()
  date_of_upload?: Date;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  pdf?: string;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  file_name?: string;
}