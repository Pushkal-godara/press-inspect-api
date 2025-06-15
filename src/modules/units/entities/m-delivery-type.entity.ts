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
  import { DeliveryTypeCategory } from './delivery-type-category.entity';

  @Table({
    tableName: 'm_delivery_type',
    timestamps: true
  })

  export class DeliveryType extends Model {

    @Column({
      primaryKey: true,
      autoIncrement: true,
      type: DataType.INTEGER
    })
    id: number;

    @Column({
      type: DataType.STRING,
      allowNull: true,
      unique: true,
      defaultValue: null,
    })
    name?: string;

    @HasMany(() => DeliveryTypeCategory)
    deliveryTypeCategories: DeliveryTypeCategory[]
  }