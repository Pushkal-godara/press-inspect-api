import { Table, Column, Model, ForeignKey, DataType } from 'sequelize-typescript';
import { User } from '../../user/entities/user.entity';
import { Role } from './role.entity';

@Table({
  tableName: 'user_roles',
  timestamps: false,
})
export class UserRole extends Model {
  @ForeignKey(() => User)
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    allowNull: false,
  })
  userId: number;

  @ForeignKey(() => Role)
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    allowNull: false,
  })
  roleId: number;

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