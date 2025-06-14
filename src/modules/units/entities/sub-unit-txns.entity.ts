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
  import { ThingsToCheckUnits } from './m-unit-things-to-check.entity';
  import { Condition } from '../../report/entities/common-entity/condition.entity';
  import { User } from 'src/modules/user/entities/user.entity';
  import { ModelEntity } from 'src/modules/models/entities/model.entity';
  import { SubUnit } from './sub-unit.entity';
  import { Report } from 'src/modules/report/entities/report.entity';
  import { CoatingSystemUnit } from './m-coating-system-unit.entity';

  @Table({
    tableName: 'sub_unit_txns',
  })

  export class SubUnitTxn extends Model {
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
    remarks: string;

    @ForeignKey(() => ModelEntity)
    @Column({
      type: DataType.INTEGER,
      allowNull: false,
    })
    modelId: number;

    @BelongsTo(() => ModelEntity)
    model: ModelEntity

    @ForeignKey(() => ThingsToCheckUnits)
    @Column({
      type: DataType.INTEGER,
      allowNull: false,
    })
    thingsToCheckId: number;

    @BelongsTo(() => ThingsToCheckUnits) 
    thingsToCheck: ThingsToCheckUnits

    @ForeignKey(() => Condition)
    @Column({
      type: DataType.INTEGER,
      allowNull: false,
    })
    conditionId: number;

    @BelongsTo(() => Condition)
    condition: Condition

    @ForeignKey(() => User)
    @Column({
      type: DataType.INTEGER,
      allowNull: false,
    })
    userId: number;

    @BelongsTo(() => User)
    user: User

    @ForeignKey(() => SubUnit)
    @Column({
      type: DataType.INTEGER,
      allowNull: false,
    })
    subUnitId: number;

    @BelongsTo(() => SubUnit)
    subUnit: SubUnit

    @ForeignKey(() => CoatingSystemUnit)
    @Column({
      type: DataType.INTEGER,
      allowNull: false,
    })
    coatingSystemUnitId: number;

    @BelongsTo(() => CoatingSystemUnit)
    coatingSystemUnit: CoatingSystemUnit

    @Column({
      type: DataType.DATE,
      allowNull: false,
    })
    txnsDate: Date;

    @HasMany(() => Report)
    reports: Report[];
}