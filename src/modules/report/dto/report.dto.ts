import { IsInt, IsOptional, IsString, IsDateString, IsNumber, IsEnum } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateReportDto {
    @ApiProperty({ required: false })
    @IsOptional()
    @IsInt()
    sub_unit_id: number;

    @ApiProperty({ required: false })
    @IsOptional()
    @IsInt()
    delivery_type_id: number;

    @ApiProperty({ required: false })
    @IsOptional()
    @IsInt()
    coating_system_id: number;

    @ApiProperty({ required: false })
    @IsOptional()
    @IsInt()
    customer_id: number;

    @ApiProperty({ required: false })
    @IsOptional()
    @IsInt()
    inspector_id: number;

    @ApiProperty({ required: false })
    @IsOptional()
    @IsInt()
    group_id: number;

    @ApiProperty({ required: false })
    @IsOptional()
    @IsInt()
    model_id: number;

    @ApiProperty({ required: false })
    @IsOptional()
    @IsInt()
    general_info_id: number;

    @ApiProperty({ required: false })
    @IsOptional()
    @IsInt()
    control_station_id: number;

    @ApiProperty({ required: false })
    @IsOptional()
    @IsInt()
    color_measurement_id: number;

    @ApiProperty({ required: false })
    @IsString()
    @IsOptional()
    inspection_place?: string;

    @ApiProperty({ required: false })
    @IsDateString()
    @IsOptional()
    inspection_date: Date;

    @ApiProperty({ required: false })
    @IsNumber()
    @IsOptional()
    overall_score?: number;

    @ApiProperty({ enum: ['Excellent', 'Good', 'Average', 'Bad'], required: false })
    @IsEnum(['Excellent', 'Good', 'Average', 'Bad'])
    @IsOptional()
    overall_grade?: string;

    @ApiProperty({ enum: ['Draft', 'Completed', 'Submitted'], required: false })
    @IsEnum(['Draft', 'Completed', 'Submitted'])
    @IsOptional()
    status?: string;

    @ApiProperty({ required: false })
    @IsString()
    @IsOptional()
    additional_comments?: string;

    @ApiProperty({ required: false })
    @IsDateString()
    @IsOptional()
    created_at?: Date;

    @ApiProperty({ required: false })
    @IsDateString()
    @IsOptional()
    updated_at?: Date;
}