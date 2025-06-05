import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class GeneralInfoQuestionsDto {
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    question: string;
}