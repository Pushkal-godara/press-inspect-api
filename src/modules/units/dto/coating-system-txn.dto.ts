import { IsNotEmpty, IsInt, IsDate, IsString } from 'class-validator';

export class CreateCoatingSystemTxnDto {
  @IsInt()
  conditionId: number;

  @IsNotEmpty()
  @IsInt()
  thingsToCheckId: number;

  @IsNotEmpty()
  @IsString()
  manufacturer: string;

  @IsNotEmpty()
  @IsString()
  makeOfUvDryer: string;

  @IsNotEmpty()
  @IsString()
  noOfAniloxRoller: string;

  @IsNotEmpty()
  @IsString()
  aniloxRollerSpec: string;

  @IsNotEmpty()
  @IsString()
  coatingRemoteControl: string;

  @IsNotEmpty()
  @IsString()
  additionalSpares: string;

  @IsInt()
  @IsNotEmpty()
  userId: number;

  @IsDate()
  @IsNotEmpty()
  dateOfInspection: Date;
}
