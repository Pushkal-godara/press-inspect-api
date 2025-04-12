import { Table, Column, Model, DataType, BelongsTo, ForeignKey } from 'sequelize-typescript';
import { InspectionJob } from '../../inspection/entities/inspection-job.entity';

@Table({
  tableName: 'alert_configurations',
})
export class AlertConfiguration extends Model<AlertConfiguration> {
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
    type: DataType.JSONB,
    allowNull: false,
    defaultValue: {},
  })
  condition: Record<string, any>;

  @Column({
    type: DataType.JSONB,
    allowNull: false,
    defaultValue: [],
  })
  recipients: Array<{ type: string; value: string; }>;

  @ForeignKey(() => InspectionJob)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  inspectionJobId: number;

  @BelongsTo(() => InspectionJob)
  inspectionJob: InspectionJob;
}