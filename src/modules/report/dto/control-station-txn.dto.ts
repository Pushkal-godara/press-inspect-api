import { IsNotEmpty, IsString } from 'class-validator';

export class ControlStationTxnDto {
    @IsNotEmpty()
    @IsString()
    question: string;
}