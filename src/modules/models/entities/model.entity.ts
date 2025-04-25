import {
  Table,
  Column,
  Model,
  DataType,
  CreatedAt,
  UpdatedAt,
  ForeignKey,
  BelongsTo,
  HasMany
} from 'sequelize-typescript';
import { Group } from '../../groups/entities/group.entity';
import { Item } from '../../items/entities/item.entity';
import { Report } from '../../report/entities/report.entity';

@Table({
  tableName: 'models',
})
export class ModelEntity extends Model {
  @Column({
    primaryKey: true,
    autoIncrement: true,
    type: DataType.INTEGER
  })
  id: number;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  name: string;

  @ForeignKey(() => Group)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  groupId: number;

  @BelongsTo(() => Group)
  group: Group;

  @HasMany(() => Item)
  items: Item[];

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