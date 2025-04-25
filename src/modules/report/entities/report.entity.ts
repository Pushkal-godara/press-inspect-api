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
import { User } from '../../user/entities/user.entity';
import { Customer } from '../../customers/entities/customer.entity';
import { Group } from '../../groups/entities/group.entity';
import { ModelEntity } from '../../models/entities/model.entity';
import { Item } from '../../items/entities/item.entity';
import { Year } from '../../years/entities/year.entity';
import { ReportDetail } from './report-detail.entity';

@Table({
  tableName: 'reports',
})
export class Report extends Model {
  @Column({
    primaryKey: true,
    autoIncrement: true,
    type: DataType.INTEGER
  })
  id: number;

  @ForeignKey(() => Customer)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  customerId: number;

  @BelongsTo(() => Customer)
  customer: Customer;

  @ForeignKey(() => User)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  inspectorId: number;

  @BelongsTo(() => User)
  inspector: User;

  @ForeignKey(() => Group)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  groupId: number;

  @BelongsTo(() => Group)
  group: Group;

  @ForeignKey(() => ModelEntity)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  modelId: number;

  @BelongsTo(() => ModelEntity)
  model: ModelEntity;

  @ForeignKey(() => Item)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  itemId: number;

  @BelongsTo(() => Item)
  item: Item;

  @ForeignKey(() => Year)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  yearId: number;

  @BelongsTo(() => Year)
  year: Year;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  location: string;

  @Column({
    type: DataType.DATE,
    allowNull: false,
    defaultValue: DataType.NOW,
  })
  inspectionDate: Date;

  @Column({
    type: DataType.FLOAT,
    allowNull: true,
    field: 'overall_score',
  })
  overallScore: number;

  @Column({
    type: DataType.ENUM('Good', 'Average', 'Not Good'),
    allowNull: true,
  })
  status: string;

  @HasMany(() => ReportDetail)
  details: ReportDetail[];

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