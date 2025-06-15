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
  import { ControlStationTxns } from 'src/modules/report/entities/common-entity/control-station-txns.entity';
  import { CoatingSystemTxn } from 'src/modules/units/entities/coating-system-txn.entity';

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
      allowNull: true,
      defaultValue: null,
      validate: {
        isIn: [Object.values(ConditionName)],
      },
    })
    name?: ConditionName;

    @HasMany(() => ControlStationTxns)
    controlStationTxns: ControlStationTxns[]

    @HasMany(() => SubUnitTxn)
    subUnitTxns: SubUnitTxn[]

    @HasMany(() => CoatingSystemTxn)
    coatingSystemTxns: CoatingSystemTxn[]

  }