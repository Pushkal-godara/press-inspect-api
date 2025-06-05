import { IsNotEmpty, IsInt, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateCoatingSystemUnitDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  coatingSystem: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsInt()
  unitId: number;
}
