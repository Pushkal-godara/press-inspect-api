import { IsNotEmpty, IsNumber, IsObject, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateInspectionJobDto {
  @ApiProperty({
    description: 'Inspection job name',
    example: 'Daily Quality Check',
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    description: 'Inspection job description',
    example: 'Daily inspection of printed materials quality',
    required: false,
  })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiProperty({
    description: 'Inspection job status',
    example: 'draft',
    default: 'draft',
    required: false,
  })
  @IsString()
  @IsOptional()
  status?: string;

  @ApiProperty({
    description: 'Inspection job configuration',
    example: {
      captureInterval: 5000,
      alertThreshold: 0.8,
      saveImages: true,
    },
    required: false,
  })
  @IsObject()
  @IsOptional()
  configuration?: Record<string, any>;

  @ApiProperty({
    description: 'Production line ID',
    example: 1,
  })
  @IsNumber()
  @IsNotEmpty()
  productionLineId: number;
}