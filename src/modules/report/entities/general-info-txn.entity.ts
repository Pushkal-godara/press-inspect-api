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
      allowNull: false,
    })
    answer: string;

    @ForeignKey(() => GeneralInfoQuestion)
    @Column({
      type: DataType.INTEGER,
      allowNull: false,
    })
    questionId: number;

    @BelongsTo(() => GeneralInfoQuestion)
    generalInfo: GeneralInfoQuestion

    @ForeignKey(() => ModelEntity)
    @Column({
      type: DataType.INTEGER,
      allowNull: false,
    })
    modelId: number;

    @BelongsTo(() => ModelEntity)
    model: ModelEntity

    @ForeignKey(() => User)
    @Column({
      type: DataType.INTEGER,
      allowNull: false,
    })
    inspectorId: number;

    @BelongsTo(() => User)
    user: User

    @Column({
      type: DataType.STRING,
      allowNull: false,
    })
    inspectionPlace: string

    @Column({
      type: DataType.DATE,
      allowNull: false,
    })
    inspectionDate: Date

}