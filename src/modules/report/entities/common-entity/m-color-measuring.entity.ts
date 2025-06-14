import {
    Table,
    Column,
    Model,
    DataType,
    CreatedAt,
    UpdatedAt,
    HasMany,
    HasOne
  } from 'sequelize-typescript';
  import { ColorMeasurementTxns } from './color-measuring-txns.entity';
  
  @Table({
    tableName: 'm_color_measurments',
  })

  export class ColorMeasurments extends Model {
    @Column({
      primaryKey: true,
      autoIncrement: true,
      type: DataType.INTEGER,
    })
    id: number;

    @Column({
      type: DataType.STRING,
      allowNull: false,
    })
    device_name: string;

    @HasMany(() => ColorMeasurementTxns)
    colorMeasurementTxns: ColorMeasurementTxns[]

  }