import { IsInt, IsOptional, IsDate } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateDeliveryTypeCategoryDto {
  @ApiProperty()
  @IsInt()
  userId: number;

  @ApiProperty()
  @IsInt()
  deliveryTypeId: number;

  @ApiProperty()
  @IsDate()
  dateOfInspection?: Date;
}
