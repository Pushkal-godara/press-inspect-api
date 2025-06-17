import { IsOptional, IsInt, IsDateString, IsString, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';

export class CreateTechSpecificationDto {
    @ApiProperty({ required: true })
    @Type(() => Number)
    @IsInt()
    @IsNotEmpty()
    model_id: number;

    @ApiProperty()
    @IsDateString()
    @IsOptional()
    date_of_upload?: Date;

    @ApiProperty()
    @IsOptional()
    @IsNotEmpty()
    pdf?: string;

    @ApiProperty()
    @IsString()
    @IsOptional()
    file_name?: string;
}