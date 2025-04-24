import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class AddPermissionDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  permissionId: number;
  
}