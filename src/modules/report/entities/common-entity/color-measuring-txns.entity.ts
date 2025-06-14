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
      allowNull: false,
    })
    versionOfDevice: string;

    @Column({
      type: DataType.STRING,
      allowNull: false,
    })
    deviceCondition: string;   //  working, not working

    @Column({
      type: DataType.STRING,
      allowNull: false,
    })
    commentsForDeviceCondition: string;

    @Column({
      type: DataType.STRING,
      allowNull: false,
    })
    expiryOfCalibrationCard: string;  //  Expired, Not Expired

    @Column({
      type: DataType.STRING,
      allowNull: false,
    })
    commentsForExpiryOfCalibrationCard: string;

    @ForeignKey(() => ColorMeasurments)
    @Column({
      type: DataType.INTEGER,
      allowNull: false,
    })
    colorMeasurmentsId: number;

    @BelongsTo(() => ColorMeasurments)
    colorMeasurments: ColorMeasurments

    @ForeignKey(() => ControlStationTxns)
    @Column({
      type: DataType.INTEGER,
      allowNull: false,
    })
    controlStationTxnsId: number;

    @BelongsTo(() => ControlStationTxns)
    controlStationTxns: ControlStationTxns

    @HasMany(() => Report)
    reports: Report[]
  }