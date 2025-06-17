import { IsInt, IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class ConditionDto {
  @ApiProperty({required: true})
  @IsString()
  @IsNotEmpty()
  name: string;
}
