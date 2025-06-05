import { IsNotEmpty, IsInt, IsOptional, IsDate, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateCommentsDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsInt()
  userId: number;

  @ApiProperty()
  @IsDate()
  dateOfInspection?: Date;

}
