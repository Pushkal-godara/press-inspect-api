import { IsNotEmpty, IsInt, IsOptional, IsDate, IsString } from 'class-validator';

export class CreateCommentsDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsInt()
  userId: number;

  @IsDate()
  dateOfInspection?: Date;

}
