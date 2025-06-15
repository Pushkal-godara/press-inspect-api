import {
    Table,
    Column,
    Model,
    DataType,
    CreatedAt,
    UpdatedAt,
    HasMany,
    HasOne,
    ForeignKey,
    BelongsTo
  } from 'sequelize-typescript';
  import { ColorMeasurments } from './m-color-measuring.entity';
  import { ControlStationTxns } from './control-station-txns.entity';
  import { Report } from '../report.entity';

  @Table({
    tableName: 'color_measurement_txns',
  })

  export class  ColorMeasurementTxns extends Model {
    @Column({
      primaryKey: true,
      autoIncrement: true,
      type: DataType.INTEGER,
    })
    id: number;

    @Column({
      type: DataType.STRING,
      allowNull: true,
      defaultValue: null
    })
    version_of_device?: string;

    @Column({
      type: DataType.STRING,
      allowNull: true,
      defaultValue: null
    })
    device_condition?: string;   //  working, not working

    @Column({
      type: DataType.STRING,
      allowNull: true,
      defaultValue: null
    })
    comments_for_device_condition?: string;

    @Column({
      type: DataType.STRING,
      allowNull: true,
      defaultValue: null
    })
    expiry_of_calibration_card?: string;  //  Expired, Not Expired

    @Column({
      type: DataType.STRING,
      allowNull: true,
      defaultValue: null
    })
    comments_for_expiry_of_calibration_card?: string;

    @ForeignKey(() => ColorMeasurments)
    @Column({
      type: DataType.INTEGER,
      allowNull: true,
      defaultValue: null,
    })
    color_measurments_id?: number;

    @BelongsTo(() => ColorMeasurments)
    colorMeasurments: ColorMeasurments

    @ForeignKey(() => ControlStationTxns)
    @Column({
      type: DataType.INTEGER,
      allowNull: true,
      defaultValue: null,
    })
    control_station_txns_id?: number;

    @BelongsTo(() => ControlStationTxns)
    controlStationTxns: ControlStationTxns

    @HasMany(() => Report)
    reports: Report[]
  }