import { IsEnum, IsNotEmpty, IsNumber, IsObject, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { EquipmentType } from '../entities/equipment.entity';

export class CreateEquipmentDto {
  @ApiProperty({
    description: 'Equipment name',
    example: 'Press Machine 1',
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    description: 'Equipment type',
    example: EquipmentType.PRESS,
    enum: Object.values(EquipmentType),
  })
  @IsEnum(EquipmentType)
  @IsNotEmpty()
  type: EquipmentType;

  @ApiProperty({
    description: 'Equipment model',
    example: 'X-2000',
    required: false,
  })
  @IsString()
  @IsOptional()
  model?: string;

  @ApiProperty({
    description: 'Serial number',
    example: 'SN-12345',
    required: false,
  })
  @IsString()
  @IsOptional()
  serialNumber?: string;

  @ApiProperty({
    description: 'Equipment configuration',
    example: { resolution: '4K', fps: 30 },
    required: false,
  })
  @IsObject()
  @IsOptional()
  configuration?: Record<string, any>;

  @ApiProperty({
    description: 'Equipment status',
    example: 'active',
    default: 'inactive',
    required: false,
  })
  @IsString()
  @IsOptional()
  status?: string;

  @ApiProperty({
    description: 'Last maintenance date',
    example: '2025-01-01T00:00:00Z',
    required: false,
  })
  @IsString()
  @IsOptional()
  lastMaintenance?: Date;

  @ApiProperty({
    description: 'Production line ID',
    example: 1,
  })
  @IsNumber()
  @IsNotEmpty()
  productionLineId: number;
}