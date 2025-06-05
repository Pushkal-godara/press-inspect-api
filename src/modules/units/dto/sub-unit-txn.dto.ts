import { IsNotEmpty, IsInt, IsDate, IsString } from 'class-validator';

export class CreateSubUnitTxnDto {
  @IsNotEmpty()
  @IsString()
  remarks: string;

  @IsNotEmpty()
  @IsInt()
  modelId: number;

  @IsNotEmpty()
  @IsInt()
  thingsToCheckId: number;

  @IsNotEmpty()
  @IsInt()
  conditionId: number;

  @IsNotEmpty()
  @IsInt()
  userId: number;

  @IsNotEmpty()
  @IsDate()
  txnsDate: Date;
}
