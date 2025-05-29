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
import { DeliveryTypeCategory } from './delivery-type-category.entity';

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

    @ForeignKey(() => Comments)
    @Column({
      type: DataType.INTEGER,
      allowNull: false,
    })
    commentsId: number;

    @BelongsTo(() => Comments)
    comments: Comments
  
    @ForeignKey(() => Unit)
    @Column({
      type: DataType.INTEGER,
      allowNull: false,
    })
    UnitId: number;

    @BelongsTo(() => Unit)
    unit: Unit

    @ForeignKey(() => DeliveryTypeCategory)
    @Column({
      type: DataType.INTEGER,
      allowNull: false,
    })
    deliveryTypeCategoryId: number;

    @BelongsTo(() => DeliveryTypeCategory)
    deliveryTypeCategory: DeliveryTypeCategory

    @HasMany(() => ThingsToCheckUnits)
    thingsToCheck: ThingsToCheckUnits[]
  }