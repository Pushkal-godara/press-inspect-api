import { Table, Column, Model, DataType, BelongsTo, ForeignKey, HasMany } from 'sequelize-typescript';
import { Department } from './department.entity';
import { Equipment } from '../../equipment/entities/equipment.entity';
import { InspectionJob } from '../../inspection/entities/inspection-job.entity';

@Table({
  tableName: 'production_lines',
})
export class ProductionLine extends Model<ProductionLine> {
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

  @Column({
    type: DataType.STRING,
    allowNull: false,
    defaultValue: 'inactive',
  })
  status: string;

  @ForeignKey(() => Department)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  departmentId: number;

  @BelongsTo(() => Department)
  department: Department;

  @HasMany(() => Equipment)
  equipment: Equipment[];

  @HasMany(() => InspectionJob)
  inspectionJobs: InspectionJob[];
}