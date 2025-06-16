import {
  Table,
  Column,
  Model,
  DataType,
  CreatedAt,
  UpdatedAt,
  ForeignKey,
  BelongsTo,
  HasMany,
  HasOne
} from 'sequelize-typescript';
import { Group } from '../../groups/entities/group.entity';
import { GeneralInfoTxn } from '../../report/entities/general-info-txn.entity';
import { TechnicalSpecification } from './tech-specification.entity';
import { Seller } from '../../report/entities/seller.entity';
import { Buyer } from '../../report/entities/buyer.entity';
import { SubUnitTxn } from 'src/modules/units/entities/sub-unit-txns.entity';
import { Report } from 'src/modules/report/entities/report.entity';

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
    allowNull: true,
    defaultValue: null,
  })
  name?: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
    defaultValue: null,
    unique: true,
  })
  serial_number?: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
    defaultValue: null,
  })
  total_impressions?: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
    defaultValue: null,
  })
  manufacturer?: string;

  @Column({
    type: DataType.INTEGER,
    allowNull: true,
    defaultValue: null,
    validate: {
      min: 1000,
      max: 9999
    }
  })
  year?: number;

  @Column({
    type: DataType.JSON,
    allowNull: true,
    defaultValue: null
  })
  metadata?: any;

  @ForeignKey(() => Group)
  @Column({
    type: DataType.INTEGER,
    allowNull: true,
    defaultValue: null,
  })
  group_id?: number;

  @BelongsTo(() => Group)
  group: Group;

  @HasMany(() => Report)
  reports: Report[]

  @HasMany(() => GeneralInfoTxn)
  generalInfoTxns: GeneralInfoTxn[]

  @HasMany(() => SubUnitTxn)
  subUnitTxns: SubUnitTxn[]

  @HasOne(() => TechnicalSpecification)
  technicalSpecification: TechnicalSpecification

  @ForeignKey(() => Seller)
  @Column({
    type: DataType.INTEGER,
    allowNull: true,
    defaultValue: null,
  })
  seller_id?: number;

  @BelongsTo(() => Seller)
  seller: Seller

  @ForeignKey(() => Buyer)
  @Column({
    type: DataType.INTEGER,
    allowNull: true,
    defaultValue: null,
  })
  buyer_id?: number;

  @BelongsTo(() => Buyer)
  buyer: Buyer

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