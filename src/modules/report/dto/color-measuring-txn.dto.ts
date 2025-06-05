import { IsInt, IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class ColorMeasuringTxnDto {
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    versionOfDevice: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    deviceCondition: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    commentsForDeviceCondition: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    expiryOfCalibrationCard: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    commentsForExpiryOfCalibrationCard: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsInt()
    colorMeasurmentsId: number

    @ApiProperty()
    @IsNotEmpty()
    @IsInt()
    controlStationTxnsId: number
    
}