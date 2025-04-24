import { IsNotEmpty, IsUUID, IsOptional, IsString, IsISO8601 } from 'class-validator';

export class CreateReportDto {
  @IsNotEmpty()
  @IsUUID()
  customerId: string;

  @IsNotEmpty()
  @IsUUID()
  inspectorId: string;

  @IsNotEmpty()
  @IsUUID()
  groupId: string;

  @IsNotEmpty()
  @IsUUID()
  modelId: string;

  @IsNotEmpty()
  @IsUUID()
  itemId: string;

  @IsNotEmpty()
  @IsUUID()
  yearId: string;

  @IsOptional()
  @IsString()
  location?: string;

  @IsOptional()
  @IsISO8601()
  inspectionDate?: string;
}