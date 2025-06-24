import { ApiProperty } from '@nestjs/swagger';
import { ArrayMinSize, IsArray, IsNotEmpty, IsNumber, IsPositive } from 'class-validator';

export class AssignPermissionDto {
  @ApiProperty({
    description: 'ID of the permission to assign',
    example: 1
  })
  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  permissionId: number;
}


export class ReplacePermissionsDto {
  @ApiProperty({
    description: 'Array of permission IDs to assign to the role',
    example: [1, 2, 3],
    type: [Number]
  })
  @IsNotEmpty()
  @IsArray()
  @ArrayMinSize(1)
  @IsNumber({}, { each: true })
  @IsPositive({ each: true })
  permissionIds: number[];
}