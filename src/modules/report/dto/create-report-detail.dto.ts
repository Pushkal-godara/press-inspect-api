import { IsNotEmpty, IsUUID, IsEnum, IsOptional, IsString } from 'class-validator';

export class CreateReportDetailDto {
  @IsNotEmpty()
  @IsUUID()
  checkpointId: string;

  @IsNotEmpty()
  @IsEnum(['Good', 'Bad', 'Better'])
  rating: 'Good' | 'Bad' | 'Better';

  @IsOptional()
  @IsString()
  notes?: string;
}