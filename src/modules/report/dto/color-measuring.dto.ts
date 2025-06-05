import { IsNotEmpty, IsString } from 'class-validator';

export class ColorMeasuringDeviceDto {
    @IsNotEmpty()
    @IsString()
    deviceName: string;
}