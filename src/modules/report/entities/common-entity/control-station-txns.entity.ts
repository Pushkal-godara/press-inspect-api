import {
    Table,
    Column,
    Model,
    DataType,
    CreatedAt,
    UpdatedAt,
    HasMany,
    HasOne,
    ForeignKey,
    BelongsTo
  } from 'sequelize-typescript';
  import { ControlStation } from './m-control-station.entity';
  import { ColorMeasurementTxns } from './color-measuring-txns.entity';

  @Table({
    tableName: 'control_station_txns',
  })

  export class ControlStationTxns extends Model {
    @Column({
      primaryKey: true,
      autoIncrement: true,
      type: DataType.INTEGER,
    })
    id: number;

    @ForeignKey(() => ControlStation)
    @Column({
      type: DataType.INTEGER,
      allowNull: false,
    })
    controlStationId: number;

    @BelongsTo(() => ControlStation)
    controlStation: ControlStation

    @Column({
      type: DataType.STRING,
      allowNull: false,
    })
    model: string; // Flash or USB

    // @Column({
    //     type: DataType.TEXT,
    //     allowNull: false,
    // })
    // thingsToCheck: string

    @HasMany(() => ColorMeasurementTxns)
    colorMeasurementTxns: ColorMeasurementTxns[]

  }