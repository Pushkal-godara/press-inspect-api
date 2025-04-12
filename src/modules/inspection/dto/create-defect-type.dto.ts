import { IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { SeverityLevel } from '../entities/defect-type.entity';

export class CreateDefectTypeDto {
  @ApiProperty({
    description: 'Defect type name',
    example: 'Color Misalignment',
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    description: 'Defect type description',
    example: 'Misalignment between color layers in printed material',
    required: false,
  })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiProperty({
    description: 'Defect severity level',
    example: SeverityLevel.LOW,
    enum: SeverityLevel,
    default: SeverityLevel.LOW,
    required: false,
  })
  @IsEnum(SeverityLevel)
  @IsOptional()
  severity?: SeverityLevel;
}