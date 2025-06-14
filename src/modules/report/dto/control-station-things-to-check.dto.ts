import { IsDate, IsInt, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateControlStationThingsToCheckDto {
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    thingsToCheck: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsInt()
    controlStationId: number

    @ApiProperty()
    @IsNotEmpty()
    @IsDate()
    date_of_creation?: Date
}

export class UpdateControlStationThingsToCheckDto {
    @ApiProperty()
    @IsOptional()
    @IsString()
    thingsToCheck?: string;

    @ApiProperty()
    @IsOptional()
    @IsInt()
    controlStationId?: number

    @ApiProperty()
    @IsOptional()
    @IsDate()
    date_of_creation?: Date
}