import { IsNotEmpty, IsInt, IsDate, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateCoatingSystemTxnDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsInt()
  condition_id: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsInt()
  things_to_check_id: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  manufacturer: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  make_of_uv_dryer: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  no_of_anilox_roller: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  anilox_roller_spec: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  coating_remote_control: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  additional_spares: string;

  @ApiProperty()
  @IsInt()
  @IsNotEmpty()
  user_id: number;

  @ApiProperty()
  @IsDate()
  @IsNotEmpty()
  date_of_inspection: Date;
}
