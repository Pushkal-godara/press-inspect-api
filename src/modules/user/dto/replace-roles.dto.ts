import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsNotEmpty, IsNumber, IsPositive, ArrayMinSize } from 'class-validator';

export class ReplaceRolesDto {
  @ApiProperty({
    description: 'Array of role IDs to assign to the user',
    example: [1, 2, 3],
    type: [Number]
  })
  @IsNotEmpty()
  @IsArray()
  @ArrayMinSize(1)
  @IsNumber({}, { each: true })
  @IsPositive({ each: true })
  roleIds: number[];
}