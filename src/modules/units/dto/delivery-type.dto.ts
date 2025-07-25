import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateDeliveryTypeDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  name: string;
}
