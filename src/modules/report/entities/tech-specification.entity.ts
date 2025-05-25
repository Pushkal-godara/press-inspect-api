import {
    Table,
    Column,
    Model,
    DataType,
    ForeignKey,
    BelongsTo,
  } from 'sequelize-typescript';
  import { ModelEntity } from '../../models/entities/model.entity';
  
  @Table({
    tableName: 'technical_specifications',
  })
  export class TechnicalSpecification extends Model {
    @Column({
      primaryKey: true,
      autoIncrement: true,
      type: DataType.INTEGER,
    })
    id: number;
  
    @ForeignKey(() => ModelEntity)
    @Column({
      type: DataType.INTEGER,
      allowNull: false,
      unique: true, // Ensures one-to-one (only one spec per model)
    })
    modelId: number;
  
    @BelongsTo(() => ModelEntity)
    model: ModelEntity;
  
    @Column({
      type: DataType.DATE,
      allowNull: false,
    })
    dateOfUpload: Date;
  
    @Column({
      type: DataType.STRING, // or DataType.TEXT if path/URL is long
      allowNull: false,
    })
    pdf: string; // store path or URL to the uploaded PDF

    @Column({
      type: DataType.TEXT,
      allowNull: false,
    })
    fileName: string;
  }
  