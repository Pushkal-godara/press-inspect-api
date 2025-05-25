import {
  Table,
  Column,
  Model,
  DataType,
  CreatedAt,
  UpdatedAt,
  HasMany
} from 'sequelize-typescript';
import { Checkpoint } from '../../checkpoints/entities/checkpoint.entity';
import { SubUnit } from './sub-unit.entity';
import { CoatingSystemUnit } from './coating-system-unit.entity';

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
    allowNull: false,
    unique: true,
  })
  name: string;

  @HasMany(() => SubUnit)
  subUnits: SubUnit[];

  @HasMany(() => Checkpoint)
  checkpoints: Checkpoint[];

  @HasMany(() => CoatingSystemUnit)
  coatingSystemUnits: CoatingSystemUnit[];

  @Column({
    type: DataType.DATE,
    allowNull: true,
  })
  created_at: Date;

  @Column({
    type: DataType.DATE,
    allowNull: true,
  })
  updated_at: Date;
}