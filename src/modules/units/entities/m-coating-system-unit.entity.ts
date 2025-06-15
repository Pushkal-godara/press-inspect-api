import {
    Table,
    Column,
    Model,
    DataType,
    CreatedAt,
    UpdatedAt,
    HasMany,
    HasOne,
    ForeignKey,
    BelongsTo
  } from 'sequelize-typescript';
  import { SubUnitTxn } from './sub-unit-txns.entity';
  import { CoatingSystemTxn } from './coating-system-txn.entity';

  @Table({
    tableName: 'coating_system_unit',
  })

  export class  CoatingSystemUnit extends Model {
    @Column({
      primaryKey: true,
      autoIncrement: true,
      type: DataType.INTEGER,
    })
    id: number;

    @Column({
      type: DataType.STRING,
      allowNull: true,
      defaultValue: null,
    })
    coating_system?: string;

    @HasMany(() => SubUnitTxn)
    subUnitTxns: SubUnitTxn[]

    @HasMany(() => CoatingSystemTxn)
    coatingSystemTxns: CoatingSystemTxn[]

  }