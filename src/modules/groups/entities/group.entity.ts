import {
  Table,
  Column,
  Model,
  DataType,
  CreatedAt,
  UpdatedAt,
  HasMany
} from 'sequelize-typescript';
import { ModelEntity } from '../../models/entities/model.entity';
import { Report } from '../../report/entities/report.entity';

@Table({
  tableName: 'groups',
})
export class Group extends Model {
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

  @HasMany(() => ModelEntity)
  models: ModelEntity[];

  @HasMany(() => Report)
  reports: Report[];

  @Column({
    type: DataType.DATE,
    allowNull: true,
  })
  created_at?: Date;

  @Column({
    type: DataType.DATE,
    allowNull: true,
  })
  updated_at?: Date;
}