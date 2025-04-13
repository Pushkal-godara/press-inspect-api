import { Table, Column, Model, DataType, ForeignKey, CreatedAt, UpdatedAt } from 'sequelize-typescript';
import { Role } from './role.entity';
import { Permission } from './permission.entity';

@Table({
  tableName: 'role_permissions',
  timestamps: true 
})
export class RolePermission extends Model<RolePermission> {
  @ForeignKey(() => Role)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  role_id: number;

  @ForeignKey(() => Permission)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  permission_id: number;

  @CreatedAt
  @Column({
    type: DataType.DATE,
    field: 'created_at',
  })
  created_at: Date;

  @UpdatedAt
  @Column({
    type: DataType.DATE,
    field: 'updated_at',
  })
  updated_at: Date;

}