import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class ControlStationTxnDto {
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    question: string;
}