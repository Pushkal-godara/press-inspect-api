import { IsOptional, IsInt, IsDateString, IsString, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateTechSpecificationDto {
  @ApiProperty({ required: true })
  @IsInt()
  @IsNotEmpty()
  model_id: number;

  @ApiProperty({ required: true })
  @IsDateString()
  @IsNotEmpty()
  date_of_upload: Date;

  @ApiProperty({ required: true })
  @IsString()
  @IsNotEmpty()
  pdf: string;

  @ApiProperty({ required: true })
  @IsString()
  @IsNotEmpty()
  file_name: string;
}