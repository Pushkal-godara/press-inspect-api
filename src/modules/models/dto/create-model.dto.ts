import { IsNotEmpty, IsString, IsUUID } from 'class-validator';

export class CreateModelDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsUUID()
  groupId: string;
}