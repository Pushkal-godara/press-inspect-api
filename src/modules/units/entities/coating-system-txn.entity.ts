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

import { User } from 'src/modules/user/entities/user.entity';

  @Table({
    tableName: 'coating_system_txns',
    timestamps: true,
  })
  export class CoatingSystemTxn extends Model {
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
      manufacturer: string;
  
      @Column({
        type: DataType.STRING,
        allowNull: false,
      })
      makeOfUvDryer: string;
  
      @Column({
        type: DataType.STRING,
        allowNull: false,
      })
      noOfAniloxRoller: string;
  
      @Column({
        type: DataType.STRING,
        allowNull: false,
      })
      aniloxRollerSpec: string;
  
      @Column({
        type: DataType.STRING,
        allowNull: false,
      })
      coatingRemoteControl: string;
  
      @Column({
        type: DataType.STRING,
        allowNull: false,
      })
      additionalSpares: string;

      @ForeignKey(() => User)
      @Column({
        type: DataType.INTEGER,
        allowNull: false,
      })
      userId: number;
  
      @BelongsTo(() => User)
      user: User

      @Column({
        type: DataType.DATE,
        allowNull: false,
      })
      dateOfInspection: Date;

  }