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
  import { GeneralInfoQuestion } from './m-general-info.entity';
  import { ModelEntity } from '../../models/entities/model.entity';
  import { User } from '../../user/entities/user.entity';
  import { Report } from './report.entity';

  @Table({
    tableName: 'general_info_txn',
  })
  export class GeneralInfoTxn extends Model {
    @Column({
      primaryKey: true,
      autoIncrement: true,
      type: DataType.INTEGER
    })
    id: number;

    @Column({
      type: DataType.TEXT,
      allowNull: true,
      defaultValue: null,
    })
    answer?: string;

    @ForeignKey(() => GeneralInfoQuestion)
    @Column({
      type: DataType.INTEGER,
      allowNull: true,
      defaultValue: null,
    })
    question_id?: number;

    @BelongsTo(() => GeneralInfoQuestion)
    generalInfo: GeneralInfoQuestion

    @ForeignKey(() => ModelEntity)
    @Column({
      type: DataType.INTEGER,
      allowNull: true,
      defaultValue: null,
    })
    model_id?: number;

    @BelongsTo(() => ModelEntity)
    model: ModelEntity

    @ForeignKey(() => User)
    @Column({
      type: DataType.INTEGER,
      allowNull: true,
      defaultValue: null,
    })
    inspector_id?: number;

    @BelongsTo(() => User)
    user: User

    @Column({
      type: DataType.STRING,
      allowNull: true,
      defaultValue: null,
    })
    inspection_place?: string

    @Column({
      type: DataType.DATE,
      allowNull: true,
      defaultValue: DataType.NOW,
    })
    inspection_date?: Date

    @HasMany(() => Report)
    reports: Report[]

}