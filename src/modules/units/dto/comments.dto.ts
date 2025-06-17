import { IsNotEmpty, IsInt, IsOptional, IsDate, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateCommentsDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsInt()
  user_id: number;

  @ApiProperty()
  @IsDate()
  date_of_inspection?: Date;

}
