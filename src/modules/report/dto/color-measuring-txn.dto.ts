import { IsInt, IsNotEmpty, IsString } from 'class-validator';

export class ColorMeasuringTxnDto {
    @IsNotEmpty()
    @IsString()
    versionOfDevice: string;

    @IsNotEmpty()
    @IsString()
    deviceCondition: string;

    @IsNotEmpty()
    @IsString()
    commentsForDeviceCondition: string;

    @IsNotEmpty()
    @IsString()
    expiryOfCalibrationCard: string;

    @IsNotEmpty()
    @IsString()
    commentsForExpiryOfCalibrationCard: string;

    @IsNotEmpty()
    @IsInt()
    colorMeasurmentsId: number

    @IsNotEmpty()
    @IsInt()
    controlStationTxnsId: number
    
}