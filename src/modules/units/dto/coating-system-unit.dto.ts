import { IsNotEmpty, IsInt, IsString } from 'class-validator';

export class CreateCoatingSystemUnitDto {
  @IsNotEmpty()
  @IsString()
  coatingSystem: string;

  @IsInt()
  unitId: number;
}
