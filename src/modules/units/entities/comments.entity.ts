import {
  Table,
  Column,
  Model,
  DataType,
  CreatedAt,
  UpdatedAt,
  HasMany,
  ForeignKey,
  BelongsTo
} from 'sequelize-typescript';

import { SubUnit } from './sub-unit.entity';
import { User } from 'src/modules/user/entities/user.entity';

@Table({
  tableName: 'comments',
})
export class Comments extends Model {
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

  @ForeignKey(() => User)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  user_id: number;

  @BelongsTo(() => User)
  user: User;

  @ForeignKey(() => SubUnit)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  sub_unit_id: number;

  @BelongsTo(() => SubUnit)
  subUnit: SubUnit
  
  @Column({
    type: DataType.DATE,
    allowNull: true,
  })
  date_of_inspection: Date;

  @Column({
    type: DataType.DATE,
    allowNull: true,
  })
  updated_at: Date;
}