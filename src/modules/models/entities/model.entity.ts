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
// import { Item } from '../../items/entities/item.entity';
import { Report } from '../../report/entities/report.entity';
import { GeneralInfoTxn } from './general-info-txn.entity'
import { TechnicalSpecification } from '../../report/entities/tech-specification.entity';
import { Seller } from '../../report/entities/seller.entity';
import { Buyer } from '../../report/entities/buyer.entity';

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

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  serialNumber: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  manufacturer: string;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    validate: {
      min: 1000,
      max: 9999
    }
  })
  year: number;

  @Column({
    type: DataType.JSON,
    allowNull: true
  })
  metadata: any;

  @ForeignKey(() => Group)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  groupId: number;

  @BelongsTo(() => Group)
  group: Group;

  // @HasMany(() => Item)
  // items: Item[];

  @HasMany(() => Report)
  reports: Report[];

  @HasMany(() => GeneralInfoTxn)
  generalInfoTxns: GeneralInfoTxn[]

  @HasOne(() => TechnicalSpecification)
  technicalSpecification: TechnicalSpecification

  @BelongsTo(() => Seller)
  seller: Seller

  @BelongsTo(() => Buyer)
  buyer: Buyer

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