import { IsNotEmpty, IsString } from 'class-validator';

export class ControlStationDto {
    @IsNotEmpty()
    @IsString()
    stationName: string;
}