import {
    Table,
    Column,
    Model,
    DataType,
    ForeignKey,
    BelongsTo,
  } from 'sequelize-typescript';
  import { ModelEntity } from './model.entity';
  
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
      allowNull:  true,
      defaultValue: null,
      unique: true, // Ensures one-to-one (only one spec per model)
    })
    model_id?: number;
  
    @BelongsTo(() => ModelEntity)
    model: ModelEntity;
  
    @Column({
      type: DataType.DATE,
      allowNull: true,
      defaultValue: DataType.NOW, // Automatically sets to current date if not provided
    })
    date_of_upload?: Date;
  
    @Column({
      type: DataType.STRING, // or DataType.TEXT if path/URL is long
      allowNull: true,
      defaultValue: null,
    })
    pdf?: string; // store path or URL to the uploaded PDF

    @Column({
      type: DataType.TEXT,
      allowNull: true,
      defaultValue: null,
    })
    file_name?: string;
  }
  