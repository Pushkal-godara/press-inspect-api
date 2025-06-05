import { IsDate, IsInt, IsNotEmpty, IsString } from 'class-validator';

export class GeneralInfoDto {
    @IsNotEmpty()
    @IsString()
    answer: string;

    @IsNotEmpty()
    @IsInt()
    questionId: number;

    @IsNotEmpty()
    @IsInt()
    modelId: number;

    @IsNotEmpty()
    @IsInt()
    inspectorId: number;

    @IsNotEmpty()
    @IsString()
    inspectionPlace: string;

    @IsNotEmpty()
    @IsDate()
    inspectionDate: Date;
}