import { IsDate, IsInt, IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';

export class GeneralInfoDto {
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    answer: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsInt()
    question_id: number;

    @ApiProperty()
    @IsNotEmpty()
    @IsInt()
    model_id: number;

    @ApiProperty()
    @IsNotEmpty()
    @IsInt()
    inspector_id: number;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    inspection_place: string;

    @ApiProperty()
    @IsNotEmpty()
    @Type(() => Date)
    @IsDate()
    inspection_date: Date;
}