import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateQualityParameterDto {
  @ApiProperty({
    description: 'Parameter name',
    example: 'Color Density',
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    description: 'Parameter description',
    example: 'Measures the density of color in printed material',
    required: false,
  })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiProperty({
    description: 'Parameter unit',
    example: 'density',
    required: false,
  })
  @IsString()
  @IsOptional()
  unit?: string;

  @ApiProperty({
    description: 'Minimum acceptable value',
    example: 0.8,
    required: false,
  })
  @IsNumber()
  @IsOptional()
  minValue?: number;

  @ApiProperty({
    description: 'Maximum acceptable value',
    example: 1.2,
    required: false,
  })
  @IsNumber()
  @IsOptional()
  maxValue?: number;

  @ApiProperty({
    description: 'Target value',
    example: 1.0,
    required: false,
  })
  @IsNumber()
  @IsOptional()
  targetValue?: number;

  @ApiProperty({
    description: 'Inspection job ID',
    example: 1,
  })
  @IsNumber()
  @IsNotEmpty()
  inspectionJobId: number;
}