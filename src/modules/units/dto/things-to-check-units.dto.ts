import { IsNotEmpty, IsInt, IsDate, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateThingsToCheckUnitsDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  thingsToCheck: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsInt()
  subUnitId: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsInt()
  coatingSystemUnitId: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsDate()
  created_at: Date;
}
