import { IsNotEmpty, IsInt, IsDate, IsString } from 'class-validator';

export class CreateThingsToCheckUnitsDto {
  @IsNotEmpty()
  @IsString()
  thingsToCheck: string;

  @IsInt()
  subUnitId: number;

  @IsInt()
  coatingSystemUnitId: number;

  @IsDate()
  created_at: Date;
}
