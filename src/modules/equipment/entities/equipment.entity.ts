import { Table, Column, Model, DataType, BelongsTo, ForeignKey } from 'sequelize-typescript';
import { ProductionLine } from '../../company/entities/production-line.entity';

export enum EquipmentType {
  PRESS = 'press',
  CAMERA = 'camera',
  SENSOR = 'sensor'
}

@Table({
  tableName: 'equipment',
})

export class Equipment extends Model<Equipment> {
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
    type: DataType.ENUM(...Object.values(EquipmentType)),
    allowNull: false,
  })
  type: EquipmentType;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  model: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  serialNumber: string;

  @Column({
    type: DataType.JSONB,
    allowNull: true,
    defaultValue: {},
  })
  configuration: Record<string, any>;

  @Column({
    type: DataType.STRING,
    allowNull: false,
    defaultValue: 'inactive',
  })
  status: string;

  @Column({
    type: DataType.DATE,
    allowNull: true,
  })
  lastMaintenance: Date;

  @ForeignKey(() => ProductionLine)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  productionLineId: number;

  @BelongsTo(() => ProductionLine)
  productionLine: ProductionLine;
}

