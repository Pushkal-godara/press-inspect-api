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
import { Unit } from './unit.entity';
import { ThingsToCheckUnits } from './m-unit-things-to-check.entity';
import { Comments } from './comments.entity';

  @Table({
    tableName: 'sub_units',
  })
  export class SubUnit extends Model {
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
    sub_unit_name?: string;

    @ForeignKey(() => Unit)
    @Column({
      type: DataType.INTEGER,
      allowNull: true,
      defaultValue: null,
    })
    unit_id?: number;

    @BelongsTo(() => Unit)
    unit: Unit

    @HasMany(() => ThingsToCheckUnits)
    thingsToCheck: ThingsToCheckUnits[]

    @HasMany(() => Comments)
    comments: Comments[]
  }