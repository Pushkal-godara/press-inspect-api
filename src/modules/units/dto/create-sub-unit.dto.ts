import { IsInt, IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateSubUnitDto {
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    sub_unit_name: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsInt()
    unit_id: number;

}