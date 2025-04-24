import { IsNotEmpty, IsString } from 'class-validator';

export class CreateYearDto {
  @IsNotEmpty()
  @IsString()
  range: string;
}
