import { IsDate, IsInt, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';

export class CreateControlStationThingsToCheckDto {
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    things_to_check: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsInt()
    control_station_id: number

    @ApiProperty()
    @IsNotEmpty()
    @Type(() => Date)
    @IsDate()
    date_of_creation?: Date
}

export class UpdateControlStationThingsToCheckDto {
    @ApiProperty()
    @IsOptional()
    @IsString()
    things_to_check?: string;

    @ApiProperty()
    @IsOptional()
    @IsInt()
    control_station_id?: number

    @ApiProperty()
    @IsOptional()
    @Type(() => Date)
    @IsDate()
    date_of_creation?: Date
}