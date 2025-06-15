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
  import { ControlStationTxns } from './control-station-txns.entity';
  import { ThingToCheckControlStation } from './m-things-to-check.entity';

  @Table({
    tableName: 'm_control_station',
  })
  export class ControlStation extends Model {
    @Column({
      primaryKey: true,
      autoIncrement: true,
      type: DataType.INTEGER,
    })
    id: number;

    @Column({
      type: DataType.STRING,
      allowNull: true,
      defaultValue: null,
    })
    station_name?: string;

    @HasMany(() => ControlStationTxns)
    controlStationTxns: ControlStationTxns[]

    @HasMany(() => ThingToCheckControlStation)
    thingToChecks: ThingToCheckControlStation[]
  }