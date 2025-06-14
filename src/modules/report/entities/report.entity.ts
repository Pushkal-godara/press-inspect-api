import {
  Table,
  Column,
  Model,
  DataType,
  CreatedAt,
  UpdatedAt,
  ForeignKey,
  BelongsTo,
  HasMany
} from 'sequelize-typescript';
import { User } from '../../user/entities/user.entity';
import { Customer } from '../../customers/entities/customer.entity';
import { Group } from '../../groups/entities/group.entity';
import { ModelEntity } from '../../models/entities/model.entity';
import { GeneralInfoTxn } from '../../report/entities/general-info-txn.entity';
import { ControlStationTxns } from '../../report/entities/common-entity/control-station-txns.entity';
import { ColorMeasurementTxns } from '../../report/entities/common-entity/color-measuring-txns.entity';
import { SubUnitTxn } from '../../units/entities/sub-unit-txns.entity';
import { DeliveryTypeCategory } from '../../units/entities/delivery-type-category.entity';
import { CoatingSystemTxn } from '../../units/entities/coating-system-txn.entity';

@Table({
  tableName: 'reports',
})
export class Report extends Model {
  @Column({
    primaryKey: true,
    autoIncrement: true,
    type: DataType.INTEGER
  })
  id: number;

  @ForeignKey(() => SubUnitTxn)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  sub_unit_id: number;

  @BelongsTo(() => SubUnitTxn)
  sub_unit: SubUnitTxn;

  @ForeignKey(() => DeliveryTypeCategory)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  delivery_type_id: number;

  @BelongsTo(() => DeliveryTypeCategory)
  delivery_type: DeliveryTypeCategory;

  @ForeignKey(() => CoatingSystemTxn)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  coating_system_id: number;

  @BelongsTo(() => CoatingSystemTxn)
  coating_system: CoatingSystemTxn;

  @ForeignKey(() => Customer)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  customer_id: number;

  @BelongsTo(() => Customer)
  customer: Customer;

  @ForeignKey(() => User)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  inspector_id: number;

  @BelongsTo(() => User)
  inspector: User;

  @ForeignKey(() => Group)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  group_id: number;

  @BelongsTo(() => Group)
  group: Group;

  @ForeignKey(() => ModelEntity)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  model_id: number;

  @BelongsTo(() => ModelEntity)
  model: ModelEntity;

  @ForeignKey(() => GeneralInfoTxn)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  general_info_id: number;

  @BelongsTo(() => GeneralInfoTxn)
  general_info: GeneralInfoTxn;

  @ForeignKey(() => ControlStationTxns)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  control_station_id: number;

  @BelongsTo(() => ControlStationTxns)
  control_station: ControlStationTxns;

  @ForeignKey(() => ColorMeasurementTxns)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  color_measurement_id: number;

  @BelongsTo(() => ColorMeasurementTxns)
  color_measurement: ColorMeasurementTxns;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  inspection_place: string;

  @Column({
    type: DataType.DATE,
    allowNull: false,
    defaultValue: DataType.NOW,
  })
  inspectionDate: Date;

  @Column({
    type: DataType.FLOAT,
    allowNull: true,
    field: 'overall_score',
  })
  overall_score: number;

  @Column({
    type: DataType.ENUM('Excellent', 'Good', 'Average', 'Bad'),
    allowNull: true,
  })
  overall_grade: string;

  @Column({
    type: DataType.ENUM('Draft', 'Completed', 'Submitted'),
    allowNull: true,
  })
  status: string;

  @Column({
    type: DataType.TEXT,
    allowNull: true,
  })
  additional_comments: string;

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