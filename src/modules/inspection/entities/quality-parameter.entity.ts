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
  min_value: number;

  @Column({
    type: DataType.FLOAT,
    allowNull: true,
  })
  max_value: number;

  @Column({
    type: DataType.FLOAT,
    allowNull: true,
  })
  target_value: number;

  @ForeignKey(() => InspectionJob)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  inspection_job_id: number;

  @BelongsTo(() => InspectionJob)
  inspectionJob: InspectionJob;

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

}