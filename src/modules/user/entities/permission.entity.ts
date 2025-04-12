// src/modules/user/entities/permission.entity.ts
import { Table, Column, Model, DataType, BelongsToMany } from 'sequelize-typescript';
import { Role } from './role.entity';
import { RolePermission } from './role-permission.entity';

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

  @BelongsToMany(() => Role, () => RolePermission)
  roles: Role[];
}