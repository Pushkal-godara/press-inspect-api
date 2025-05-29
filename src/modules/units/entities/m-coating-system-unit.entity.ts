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
  import { Unit } from './unit.entity';
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
      allowNull: false,
    })
    coatingSystem: string;

    @ForeignKey(() => Unit)
    @Column({
      type: DataType.INTEGER,
      allowNull: false,
    })
    unitId: number;
  
    @BelongsTo(() => Unit)
    unit: Unit

  }