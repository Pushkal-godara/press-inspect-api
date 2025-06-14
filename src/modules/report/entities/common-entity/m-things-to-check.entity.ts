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
import { ControlStationTxns } from './control-station-txns.entity';

@Table({ tableName: 'm_things_to_check_control_station' })

export class ThingToCheckControlStation extends Model {
  @Column({
    primaryKey: true,
    autoIncrement: true,
    type: DataType.INTEGER
  })
  id: number;

  @Column({
    type: DataType.TEXT,
    allowNull: true,
    unique: true,
    defaultValue: null
  })
  things_to_check?: string;

  @ForeignKey(() => ControlStation)
  @Column({
    type: DataType.INTEGER,
    allowNull: true,
    defaultValue: null
  })
  control_station_id?: number;

  @BelongsTo(() => ControlStation)
  controlStation: ControlStation;

  @Column({
    type: DataType.DATE,
    allowNull: true,
    defaultValue: null
  })
  date_of_creation?: Date;

  @HasMany(() => ControlStationTxns)
  controlStationTxns: ControlStationTxns[]
}
