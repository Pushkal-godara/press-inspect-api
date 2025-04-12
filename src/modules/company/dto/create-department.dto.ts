import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateDepartmentDto {
  @ApiProperty({
    description: 'Department name',
    example: 'Printing Department',
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    description: 'Plant ID',
    example: 1,
  })
  @IsNumber()
  @IsNotEmpty()
  plantId: number;
}