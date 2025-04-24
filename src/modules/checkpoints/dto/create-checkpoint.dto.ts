import { IsNotEmpty, IsString, IsUUID } from 'class-validator';

export class CreateCheckpointDto {
  @IsNotEmpty()
  @IsString()
  description: string;

  @IsNotEmpty()
  @IsUUID()
  unitId: string;
}