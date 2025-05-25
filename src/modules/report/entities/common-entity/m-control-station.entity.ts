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
  import { ThingToCheck } from './m-things-to-check.entity';

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
      allowNull: false,
    })
    stationName: string;

    @HasMany(() => ControlStationTxns)
    controlStationTxns: ControlStationTxns[]

    @HasMany(() => ThingToCheck)
    thingToChecks: ThingToCheck[]
  }