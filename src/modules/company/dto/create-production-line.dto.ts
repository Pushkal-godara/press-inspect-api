import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateProductionLineDto {
  @ApiProperty({
    description: 'Production line name',
    example: 'Line A',
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    description: 'Department ID',
    example: 1,
  })
  @IsNumber()
  @IsNotEmpty()
  departmentId: number;

  @ApiProperty({
    description: 'Production line status',
    example: 'inactive',
    default: 'inactive',
    required: false,
  })
  @IsString()
  @IsOptional()
  status?: string;
}