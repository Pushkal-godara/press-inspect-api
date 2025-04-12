import { Table, Column, Model, DataType, BelongsTo, ForeignKey } from 'sequelize-typescript';
import { InspectionJob } from './inspection-job.entity';

@Table({
  tableName: 'quality_parameters',
})
export class QualityParameter extends Model<QualityParameter> {
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
    type: DataType.TEXT,
    allowNull: true,
  })
  description: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  unit: string;

  @Column({
    type: DataType.FLOAT,
    allowNull: true,
  })
  minValue: number;

  @Column({
    type: DataType.FLOAT,
    allowNull: true,
  })
  maxValue: number;

  @Column({
    type: DataType.FLOAT,
    allowNull: true,
  })
  targetValue: number;

  @ForeignKey(() => InspectionJob)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  inspectionJobId: number;

  @BelongsTo(() => InspectionJob)
  inspectionJob: InspectionJob;
}