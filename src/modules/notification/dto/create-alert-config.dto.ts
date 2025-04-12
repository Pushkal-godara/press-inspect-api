import { IsArray, IsNotEmpty, IsNumber, IsObject, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateAlertConfigDto {
  @ApiProperty({
    description: 'Alert configuration name',
    example: 'Color Density Alert',
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    description: 'Alert configuration description',
    example: 'Alerts when color density falls outside acceptable range',
    required: false,
  })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiProperty({
    description: 'Alert condition',
    example: {
      parameter: 'color_density',
      operator: 'outside_range',
      minValue: 0.8,
      maxValue: 1.2,
      consecutiveViolations: 3,
    },
  })
  @IsObject()
  @IsNotEmpty()
  condition: Record<string, any>;

  @ApiProperty({
    description: 'Alert recipients',
    example: [
      { type: 'email', value: 'supervisor@example.com' },
      { type: 'sms', value: '+1234567890' },
    ],
  })
  @IsArray()
  @IsNotEmpty()
  recipients: Array<{ type: string; value: string }>;

  @ApiProperty({
    description: 'Inspection job ID',
    example: 1,
  })
  @IsNumber()
  @IsNotEmpty()
  inspectionJobId: number;
}