import { IsInt, IsNotEmpty, IsString } from 'class-validator';

export class CreateSubUnitDto {
    @IsNotEmpty()
    @IsString()
    name: string;

    @IsNotEmpty()
    @IsInt()
    unitId: number;

    @IsNotEmpty()
    @IsInt()
    commentId: number;

    @IsNotEmpty()
    @IsInt()
    deliveryTypeCategoryId: number;
}