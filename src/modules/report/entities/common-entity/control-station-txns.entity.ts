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
  import { Condition } from './condition.entity';
  import { User } from 'src/modules/user/entities/user.entity';
  import { Report } from '../report.entity';

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

    @ForeignKey(() => Condition)
    @Column({
      type: DataType.INTEGER,
      allowNull: false,
    })
    conditionId: number;

    @BelongsTo(() => Condition)
    condition: Condition

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

    @Column({
      type: DataType.DATE,
      allowNull: true,
    })
    dateOfInspection: Date;

    @Column({
      type: DataType.STRING,
      allowNull: true,
    })
    remarks: string;

    @ForeignKey(() => User)
    @Column({
      type: DataType.INTEGER,
      allowNull: false,
    })
    userId: number;

    @BelongsTo(() => User)
    user: User

    @HasMany(() => ColorMeasurementTxns)
    colorMeasurementTxns: ColorMeasurementTxns[]

    @HasMany(() => Report)
    report: Report

  }