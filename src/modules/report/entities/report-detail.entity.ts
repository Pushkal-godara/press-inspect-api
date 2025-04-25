import {
  Table,
  Column,
  Model,
  DataType,
  CreatedAt,
  UpdatedAt,
  ForeignKey,
  BelongsTo
} from 'sequelize-typescript';
import { Report } from './report.entity';
import { Checkpoint } from '../../checkpoints/entities/checkpoint.entity';

@Table({
  tableName: 'report_details',
})
export class ReportDetail extends Model {
  @Column({
    primaryKey: true,
    autoIncrement: true,
    type: DataType.INTEGER
  })
  id: number;

  @ForeignKey(() => Report)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  reportId: number;

  @BelongsTo(() => Report)
  report: Report;

  @ForeignKey(() => Checkpoint)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  checkpointId: number;

  @BelongsTo(() => Checkpoint)
  checkpoint: Checkpoint;

  @Column({
    type: DataType.ENUM('Good', 'Bad', 'Better'),
    allowNull: false,
  })
  rating: string;

  @Column({
    type: DataType.TEXT,
    allowNull: true,
  })
  notes: string;

  @Column({
    type: DataType.DATE,
    allowNull: true,
  })
  created_at?: Date;

  @Column({
    type: DataType.DATE,
    allowNull: true,
  })
  updated_at?: Date;
}