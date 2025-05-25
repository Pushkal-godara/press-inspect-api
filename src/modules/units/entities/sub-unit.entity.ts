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
      allowNull: false,
    })
    subUnitName: string;
  
    @ForeignKey(() => Unit)
    @Column({
      type: DataType.INTEGER,
      allowNull: false,
    })
    UnitId: number;

    @BelongsTo(() => Unit)
    unit: Unit

    @HasMany(() => ThingsToCheckUnits)
    thingsToCheck: ThingsToCheckUnits[]
  }