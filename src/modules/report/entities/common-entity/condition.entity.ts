import {
    Table,
    Column,
    Model,
    DataType,
    CreatedAt,
    UpdatedAt,
    HasMany,
    HasOne
  } from 'sequelize-typescript';
  import { ConditionName } from '../../enum/condition.enum';
  import { SubUnitTxn } from 'src/modules/units/entities/sub-unit-txns.entity';

  @Table({
    tableName: 'conditions',
  })

  export class Condition extends Model {
    @Column({
      primaryKey: true,
      autoIncrement: true,
      type: DataType.INTEGER
    })
    id: number;

    @Column({
      type: DataType.STRING,
      allowNull: false,
      validate: {
        isIn: [Object.values(ConditionName)],
      },
    })
    name: ConditionName;

    @HasMany(() => SubUnitTxn)
    subUnitTxns: SubUnitTxn[]

  }