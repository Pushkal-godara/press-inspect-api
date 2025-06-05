import { IsNotEmpty, IsString } from 'class-validator';

export class CreateDeliveryTypeDto {
  @IsNotEmpty()
  @IsString()
  name: string;
}
