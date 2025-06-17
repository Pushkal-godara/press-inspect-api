import { IsNotEmpty, IsInt, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateCoatingSystemUnitDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  coating_system: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsInt()
  unit_id: number;
}
