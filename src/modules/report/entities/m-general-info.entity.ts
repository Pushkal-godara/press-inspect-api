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
  import { GeneralInfoTxn } from './general-info-txn.entity';

  @Table({
    tableName: 'general_info',
  })
  export class GeneralInfoQuestion extends Model {
    @Column({
      primaryKey: true,
      autoIncrement: true,
      type: DataType.INTEGER
    })
    id: number;

    @Column({
      type: DataType.TEXT,
      allowNull: false,
    })
    question: string;

    @HasMany(() => GeneralInfoTxn)
    generalInfoTxns: GeneralInfoTxn[]

}