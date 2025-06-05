import { IsNotEmpty, IsInt, IsDate, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateCoatingSystemTxnDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsInt()
  conditionId: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsInt()
  thingsToCheckId: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  manufacturer: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  makeOfUvDryer: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  noOfAniloxRoller: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  aniloxRollerSpec: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  coatingRemoteControl: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  additionalSpares: string;

  @ApiProperty()
  @IsInt()
  @IsNotEmpty()
  userId: number;

  @ApiProperty()
  @IsDate()
  @IsNotEmpty()
  dateOfInspection: Date;
}
