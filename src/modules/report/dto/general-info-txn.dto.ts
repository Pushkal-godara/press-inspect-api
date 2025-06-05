import { IsDate, IsInt, IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class GeneralInfoDto {
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    answer: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsInt()
    questionId: number;

    @ApiProperty()
    @IsNotEmpty()
    @IsInt()
    modelId: number;

    @ApiProperty()
    @IsNotEmpty()
    @IsInt()
    inspectorId: number;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    inspectionPlace: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsDate()
    inspectionDate: Date;
}