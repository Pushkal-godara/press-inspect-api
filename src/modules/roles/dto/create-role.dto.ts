import { IsNotEmpty, IsOptional, IsString, IsObject, IsBoolean } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateRoleDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({
    description: 'Status of the role',
    example: true,
    required: false,
    default: true
  })
  @IsOptional()
  @IsBoolean()
  status?: boolean = true;
}