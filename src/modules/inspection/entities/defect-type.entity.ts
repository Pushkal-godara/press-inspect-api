import { Table, Column, Model, DataType } from 'sequelize-typescript';

export enum SeverityLevel {
  LOW = 'low',
  MEDIUM = 'medium',
  HIGH = 'high',
  CRITICAL = 'critical'
}

@Table({
  tableName: 'defect_types',
})
export class DefectType extends Model<DefectType> {
  @Column({
    primaryKey: true,
    autoIncrement: true,
    type: DataType.INTEGER,
  })
  id: number;

  @Column({
    type: DataType.STRING,
    allowNull: false,
    unique: true,
  })
  name: string;

  @Column({
    type: DataType.TEXT,
    allowNull: true,
  })
  description: string;

  @Column({
    type: DataType.ENUM(...Object.values(SeverityLevel)),
    allowNull: false,
    defaultValue: SeverityLevel.LOW,
  })
  severity: SeverityLevel;
}