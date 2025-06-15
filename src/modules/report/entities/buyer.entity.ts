import {
    Table,
    Column,
    Model,
    DataType,
    CreatedAt,
    UpdatedAt,
    ForeignKey,
    BelongsTo,
    HasMany
  } from 'sequelize-typescript';
  import { ModelEntity } from '../../models/entities/model.entity';

  @Table({
    tableName: 'buyers',
  })

  export class Buyer extends Model {
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
    company_name?: string;

    @Column({
        type: DataType.TEXT,
        allowNull: true,
        defaultValue: null,
    })
    address?: string;

    @HasMany(() => ModelEntity)
    models: ModelEntity[]
}