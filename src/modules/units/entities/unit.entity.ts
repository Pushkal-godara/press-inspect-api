import {
  Table,
  Column,
  Model,
  DataType,
  CreatedAt,
  UpdatedAt,
  HasMany
} from 'sequelize-typescript';
import { SubUnit } from './sub-unit.entity';
import { CoatingSystemUnit } from './m-coating-system-unit.entity';

@Table({
  tableName: 'units',
})
export class Unit extends Model {
  @Column({
    primaryKey: true,
    autoIncrement: true,
    type: DataType.INTEGER
  })
  id: number;

  @Column({
    type: DataType.STRING,
    allowNull: true,
    unique: true,
    defaultValue: null,
  })
  name?: string;

  @HasMany(() => SubUnit)
  subUnits: SubUnit[];

  @Column({
    type: DataType.DATE,
    allowNull: true,
    defaultValue: DataType.NOW,
  })
  created_at?: Date;

  @Column({
    type: DataType.DATE,
    allowNull: true,
    defaultValue: DataType.NOW,
  })
  updated_at?: Date;
}