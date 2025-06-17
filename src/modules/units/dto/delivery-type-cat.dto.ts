import { IsInt, IsOptional, IsDate } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateDeliveryTypeCategoryDto {
  @ApiProperty()
  @IsInt()
  user_id: number;

  @ApiProperty()
  @IsInt()
  delivery_type_id: number;

  @ApiProperty()
  @IsDate()
  date_of_inspection?: Date;
}
