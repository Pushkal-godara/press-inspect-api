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
import { GeneralInfoTxn } from './general-info-txn.entity';
import { TechnicalSpecification } from '../../report/entities/tech-specification.entity';
import { Seller } from '../../report/entities/seller.entity';
import { Buyer } from '../../report/entities/buyer.entity';
import { SubUnitTxn } from 'src/modules/units/entities/sub-unit-txns.entity';

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

  @HasMany(() => GeneralInfoTxn)
  generalInfoTxns: GeneralInfoTxn[]

  @HasMany(() => SubUnitTxn)
  subUnitTxns: SubUnitTxn[]

  @HasOne(() => TechnicalSpecification)
  technicalSpecification: TechnicalSpecification

  @ForeignKey(() => Seller)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  sellerId: number;

  @BelongsTo(() => Seller)
  seller: Seller

  @ForeignKey(() => Buyer)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  buyerId: number;
  
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