import { PartialType } from '@nestjs/mapped-types';
import { CreateReportDto } from './create-buyer-seller.dto';

export class UpdateReportDto extends PartialType(CreateReportDto) {}