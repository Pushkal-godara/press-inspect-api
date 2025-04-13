import { Table, Column, Model, DataType, BelongsTo, ForeignKey, HasMany } from 'sequelize-typescript';
import { Plant } from './plant.entity';
import { ProductionLine } from './production-line.entity';

@Table({
  tableName: 'departments',
})
export class Department extends Model<Department> {
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
  name: string;

  @ForeignKey(() => Plant)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  plant_id: number;

  @Column({
    type: DataType.DATE,
    allowNull: false,
  })
  created_at: Date;

  @Column({
    type: DataType.DATE,
    allowNull: false,
  })
  updated_at: Date;

  @BelongsTo(() => Plant)
  plant: Plant;

  @HasMany(() => ProductionLine)
  productionLines: ProductionLine[];
}