import { IsNotEmpty, IsInt, IsDate, IsString, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';

export class CreateSubUnitTxnDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  remarks: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsInt()
  model_id: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsInt()
  things_to_check_id: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsInt()
  condition_id: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsInt()
  user_id: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsInt()
  sub_unit_id: number;

  @ApiProperty()
  @IsOptional()
  @IsInt()
  coating_system_unit_id?: number;

  @ApiProperty()
  @IsNotEmpty()
  @Type(() => Date)
  @IsDate()
  txns_date: Date;
}
