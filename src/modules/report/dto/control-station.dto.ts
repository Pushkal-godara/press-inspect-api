import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class ControlStationDto {
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    station_name: string;
}