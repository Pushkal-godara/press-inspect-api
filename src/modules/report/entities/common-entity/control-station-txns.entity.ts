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
      allowNull: true,
      defaultValue: null,
    })
    control_station_id?: number;

    @BelongsTo(() => ControlStation)
    controlStation: ControlStation

    @ForeignKey(() => Condition)
    @Column({
      type: DataType.INTEGER,
      allowNull: true,
      defaultValue: null,
    })
    condition_id?: number;

    @BelongsTo(() => Condition)
    condition: Condition

    @Column({
      type: DataType.STRING,
      allowNull: true,
      defaultValue: null,
    })
    model?: string; // Flash or USB

    @ForeignKey(() => ThingToCheckControlStation)
    @Column({
      type: DataType.INTEGER,
      allowNull: true,
    })
    things_to_check_id?: number;

    @BelongsTo(() => ThingToCheckControlStation)
    thingsToCheck: ThingToCheckControlStation

    @Column({
      type: DataType.DATE,
      allowNull: true,
      defaultValue: null,
    })
    date_of_inspection?: Date;

    @Column({
      type: DataType.STRING,
      allowNull: true,
      defaultValue: null,
    })
    remarks?: string;

    @ForeignKey(() => User)
    @Column({
      type: DataType.INTEGER,
      allowNull: true,
    })
    user_id?: number;

    @BelongsTo(() => User)
    user: User

    @HasMany(() => ColorMeasurementTxns)
    colorMeasurementTxns: ColorMeasurementTxns[]

    @HasMany(() => Report)
    report: Report

  }