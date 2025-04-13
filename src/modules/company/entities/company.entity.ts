import { Table, Column, Model, DataType, HasMany } from 'sequelize-typescript';
import { User } from '../../user/entities/user.entity';
import { Plant } from './plant.entity';

@Table({
  tableName: 'companies',
})
export class Company extends Model<Company> {
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
  name: string;

  @Column({
    type: DataType.TEXT,
    allowNull: true,
  })
  address: string;

  @Column({
    type: DataType.JSONB,
    allowNull: true,
    defaultValue: {},
  })
  contact_info: Record<string, any>;

  @Column({
    type: DataType.STRING,
    allowNull: false,
    defaultValue: 'active',
  })
  subscription_status: string;

  @Column({
    type: DataType.DATE,
    allowNull: false,
  })
  created_at: Date;

  @Column({
    type: DataType.DATE,
    allowNull: false,
  })
  updated_at: Date;

  @HasMany(() => User)
  users: User[];

  @HasMany(() => Plant)
  plants: Plant[];
}