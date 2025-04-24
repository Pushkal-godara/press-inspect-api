import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class AddRoleDto {

  @ApiProperty()  
  @IsNotEmpty()
  roleId: number;
}