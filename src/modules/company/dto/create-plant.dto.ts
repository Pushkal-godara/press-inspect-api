import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreatePlantDto {
  @ApiProperty({
    description: 'Plant name',
    example: 'North Factory',
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    description: 'Plant location',
    example: 'Chicago, IL',
    required: false,
  })
  @IsString()
  @IsOptional()
  location?: string;

  @ApiProperty({
    description: 'Company ID',
    example: 1,
  })
  @IsNumber()
  @IsNotEmpty()
  companyId: number;
}