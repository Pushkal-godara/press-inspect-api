import { Table, Column, Model, DataType, ForeignKey, CreatedAt, UpdatedAt } from 'sequelize-typescript';
import { Role } from './role.entity';
import { Permission } from '../../permissions/entities/permission.entity';

@Table({
  tableName: 'role_permissions',
  timestamps: true 
})
export class RolePermission extends Model<RolePermission> {
  @ForeignKey(() => Role)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    primaryKey: true,
  })
  role_id: number;

  @ForeignKey(() => Permission)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    primaryKey: true,
  })
  permission_id: number;

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