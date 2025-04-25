import { Table, Column, Model, DataType, BelongsToMany } from 'sequelize-typescript';
import { Role } from '../../roles/entities/role.entity';
import { RolePermission } from '../../roles/entities/role-permission.entity';

@Table({
  tableName: 'permissions',
})
export class Permission extends Model<Permission> {
  @Column({
    primaryKey: true,
    autoIncrement: true,
    type: DataType.INTEGER,
  })
  id: number;

  @Column({
    type: DataType.STRING,
    allowNull: false,
    unique: true,
  })
  name: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  resource: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  action: string;

  @Column({
    type: DataType.TEXT,
    allowNull: true,
  })
  description: string;

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

  @BelongsToMany(() => Role, () => RolePermission)
  roles: Role[];
}