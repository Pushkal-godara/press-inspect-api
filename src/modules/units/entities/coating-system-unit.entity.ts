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
import { ThingsToCheck } from './m-unit-things-to-check.entity';

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

    @ForeignKey(() => Unit)
        @Column({
          type: DataType.INTEGER,
          allowNull: false,
        })
        UnitId: number;
    
        @BelongsTo(() => Unit)
        unit: Unit

    @Column({
      type: DataType.STRING,
      allowNull: false,
    })
    coatingSystem: string;

    @Column({
      type: DataType.STRING,
      allowNull: false,
    })
    manufacturer: string;

    @Column({
      type: DataType.STRING,
      allowNull: false,
    })
    makeOfUvDryer: string;

    @Column({
      type: DataType.STRING,
      allowNull: false,
    })
    noOfAniloxRoller: string;

    @Column({
      type: DataType.STRING,
      allowNull: false,
    })
    aniloxRollerSpec: string;

    @Column({
      type: DataType.STRING,
      allowNull: false,
    })
    coatingRemoteControl: string;

    @Column({
      type: DataType.STRING,
      allowNull: false,
    })
    additionalSpares: string;

    @HasMany(() => ThingsToCheck)
        thingsToCheck: ThingsToCheck[]
  }