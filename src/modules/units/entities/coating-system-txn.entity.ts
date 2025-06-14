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

import { User } from 'src/modules/user/entities/user.entity';
import { Condition } from 'src/modules/report/entities/common-entity/condition.entity';
import { ThingsToCheckUnits } from './m-unit-things-to-check.entity';
import { CoatingSystemUnit } from './m-coating-system-unit.entity';
import { Report } from 'src/modules/report/entities/report.entity';

  @Table({
    tableName: 'coating_system_txns',
    timestamps: true,
  })
  export class CoatingSystemTxn extends Model {
    @Column({
      primaryKey: true,
      autoIncrement: true,
      type: DataType.INTEGER,
    })
    id: number;

    @ForeignKey(() => Condition)
    @Column({
      type: DataType.INTEGER,
      allowNull: false,
    })
    condition_id: number;
  
    @BelongsTo(() => Condition)
    condition: Condition

    @ForeignKey(() => CoatingSystemUnit)
    @Column({
      type: DataType.INTEGER,
      allowNull: false,
    })
    coating_system_unit_id: number;

    @BelongsTo(() => CoatingSystemUnit)
    coatingSystemUnit: CoatingSystemUnit;

    @ForeignKey(() => ThingsToCheckUnits)
    @Column({
      type: DataType.INTEGER,
      allowNull: false,
    })
    things_to_check_id: number;
  
    @BelongsTo(() => ThingsToCheckUnits)
    thingsToCheck: ThingsToCheckUnits

    @Column({
        type: DataType.STRING,
        allowNull: false,
      })
      manufacturer: string;
  
      @Column({
        type: DataType.STRING,
        allowNull: false,
      })
      make_of_uv_dryer: string;

      @Column({
        type: DataType.STRING,
        allowNull: false,
      })
      no_of_anilox_roller: string;

      @Column({
        type: DataType.STRING,
        allowNull: false,
      })
      anilox_roller_spec: string;

      @Column({
        type: DataType.STRING,
        allowNull: false,
      })
      coating_remote_control: string;

      @Column({
        type: DataType.STRING,
        allowNull: false,
      })
      additional_spares: string;

      @ForeignKey(() => User)
      @Column({
        type: DataType.INTEGER,
        allowNull: false,
      })
      user_id: number;

      @BelongsTo(() => User)
      user: User

      @Column({
        type: DataType.DATE,
        allowNull: false,
      })
      date_of_inspection: Date;

      @HasMany(() => Report)
      reports: Report[]

  }