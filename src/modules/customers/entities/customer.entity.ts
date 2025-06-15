import {
  Table,
  Column,
  Model,
  DataType,
  CreatedAt,
  UpdatedAt,
  HasMany
} from 'sequelize-typescript';
import { Report } from '../../report/entities/report.entity';

@Table({
  tableName: 'customers',
})
export class Customer extends Model {
  @Column({
    primaryKey: true,
    autoIncrement: true,
    type: DataType.INTEGER
  })
  id: number;

  @Column({
    type: DataType.STRING,
    allowNull: true,
    defaultValue: null,
  })
  name?: string;

  @Column({
    type: DataType.TEXT,
    allowNull: true,
    defaultValue: null,
  })
  address?: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
    defaultValue: null,
  })
  contact_person?: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
    defaultValue: null,
  })
  email?: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
    defaultValue: null,
  })
  phone?: string;

  @HasMany(() => Report)
  reports: Report[];

  @Column({
    type: DataType.DATE,
    allowNull: true,
    defaultValue: DataType.NOW
  })
  created_at?: Date;

  @Column({
    type: DataType.DATE,
    allowNull: true,
    defaultValue: DataType.NOW
  })
  updated_at?: Date;
}