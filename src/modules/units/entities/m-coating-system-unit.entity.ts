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

  }