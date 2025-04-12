import { Table, Column, Model, DataType, BelongsTo, ForeignKey, HasMany } from 'sequelize-typescript';
import { ProductionLine } from '../../company/entities/production-line.entity';
import { User } from '../../user/entities/user.entity';
import { QualityParameter } from './quality-parameter.entity';
import { AlertConfiguration } from '../../notification/entities/alert-configuration.entity';

@Table({
  tableName: 'inspection_jobs',
})
export class InspectionJob extends Model<InspectionJob> {
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
    allowNull: false,
    defaultValue: 'draft',
  })
  status: string;

  @Column({
    type: DataType.JSONB,
    allowNull: true,
    defaultValue: {},
  })
  configuration: Record<string, any>;

  @ForeignKey(() => ProductionLine)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  productionLineId: number;

  @BelongsTo(() => ProductionLine)
  productionLine: ProductionLine;

  @ForeignKey(() => User)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  createdBy: number;

  @BelongsTo(() => User)
  creator: User;

  @HasMany(() => QualityParameter)
  qualityParameters: QualityParameter[];

  @HasMany(() => AlertConfiguration)
  alertConfigurations: AlertConfiguration[];
}