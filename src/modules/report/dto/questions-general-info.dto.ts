import { IsNotEmpty, IsString } from 'class-validator';

export class GeneralInfoQuestionsDto {
    @IsNotEmpty()
    @IsString()
    question: string;
}