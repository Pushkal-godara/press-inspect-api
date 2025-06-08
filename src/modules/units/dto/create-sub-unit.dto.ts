import { IsInt, IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateSubUnitDto {
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    subUnitName: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsInt()
    unitId: number;

}