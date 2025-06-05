import { IsInt, IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class ControlStationThingsToCheckDto {
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    thingsToCheck: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsInt()
    controlStationId: number
}