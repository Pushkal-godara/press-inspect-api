import { IsInt, IsNotEmpty, IsString } from 'class-validator';

export class ControlStationThingsToCheckDto {
    @IsNotEmpty()
    @IsString()
    thingsToCheck: string;

    @IsNotEmpty()
    @IsInt()
    controlStationId: number
}