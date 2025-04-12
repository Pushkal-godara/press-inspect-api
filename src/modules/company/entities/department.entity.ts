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
  plantId: number;

  @BelongsTo(() => Plant)
  plant: Plant;

  @HasMany(() => ProductionLine)
  productionLines: ProductionLine[];
}