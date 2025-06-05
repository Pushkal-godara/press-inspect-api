import { IsInt, IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateSubUnitDto {
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    name: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsInt()
    unitId: number;

    @ApiProperty()
    @IsNotEmpty()
    @IsInt()
    commentId: number;

    @ApiProperty()
    @IsNotEmpty()
    @IsInt()
    deliveryTypeCategoryId: number;
}