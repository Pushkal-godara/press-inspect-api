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
      allowNull: true,
      defaultValue: null,
    })
    remarks?: string;

    @ForeignKey(() => ModelEntity)
    @Column({
      type: DataType.INTEGER,
      allowNull: true,
      defaultValue: null,
    })
    model_id?: number;

    @BelongsTo(() => ModelEntity)
    model: ModelEntity

    @ForeignKey(() => ThingsToCheckUnits)
    @Column({
      type: DataType.INTEGER,
      allowNull: true,
      defaultValue: null,
    })
    things_to_check_id?: number;

    @BelongsTo(() => ThingsToCheckUnits) 
    thingsToCheck: ThingsToCheckUnits

    @ForeignKey(() => Condition)
    @Column({
      type: DataType.INTEGER,
      allowNull: true,
      defaultValue: null,
    })
    condition_id?: number;

    @BelongsTo(() => Condition)
    condition: Condition

    @ForeignKey(() => User)
    @Column({
      type: DataType.INTEGER,
      allowNull: true,
      defaultValue: null,
    })
    user_id?: number;

    @BelongsTo(() => User)
    user: User

    @ForeignKey(() => SubUnit)
    @Column({
      type: DataType.INTEGER,
      allowNull: true,
      defaultValue: null,
    })
    sub_unit_id?: number;

    @BelongsTo(() => SubUnit)
    subUnit: SubUnit

    @ForeignKey(() => CoatingSystemUnit)
    @Column({
      type: DataType.INTEGER,
      allowNull: true,
      defaultValue: null,
    })
    coating_system_unit_id?: number;

    @BelongsTo(() => CoatingSystemUnit)
    coatingSystemUnit: CoatingSystemUnit

    @Column({
      type: DataType.DATE,
      allowNull: true,
      defaultValue: null,
    })
    txns_date?: Date;

    @HasMany(() => Report)
    reports: Report[];
}