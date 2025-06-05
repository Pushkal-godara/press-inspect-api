import { IsNotEmpty, IsInt, IsDate, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateSubUnitTxnDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  remarks: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsInt()
  modelId: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsInt()
  thingsToCheckId: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsInt()
  conditionId: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsInt()
  userId: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsDate()
  txnsDate: Date;
}
