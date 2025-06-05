import { IsInt, IsOptional, IsDate } from 'class-validator';

export class CreateDeliveryTypeCategoryDto {
  @IsInt()
  userId: number;

  @IsInt()
  deliveryTypeId: number;

  @IsDate()
  dateOfInspection?: Date;
}
