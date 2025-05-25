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
  import { ThingToCheckControlStation } from './m-things-to-check.entity';

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

    @ForeignKey(() => ThingToCheckControlStation)
    @Column({
      type: DataType.INTEGER,
      allowNull: false,
    })
    thingsToCheckId: number;

    @BelongsTo(() => ThingToCheckControlStation)
    thingsToCheck: ThingToCheckControlStation

    @HasMany(() => ColorMeasurementTxns)
    colorMeasurementTxns: ColorMeasurementTxns[]

  }