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
  import { ModelEntity } from '../../models/entities/model.entity';
  import { Report } from '../../reports/entities/report.entity';
  
  @Table({
    tableName: 'items',
  })
  export class Item extends Model {
    @Column({
        primaryKey: true,
        autoIncrement: true,
        type: DataType.INTEGER
    })
    id: number;
  
    @Column({
      type: DataType.STRING,
      allowNull: false,
    })
    name: string;
  
    @ForeignKey(() => ModelEntity)
    @Column({
      type: DataType.INTEGER,
      allowNull: false,

    })
    modelId: number;
  
    @BelongsTo(() => ModelEntity)
    model: ModelEntity;
  
    @HasMany(() => Report)
    reports: Report[];
  
    @Column({
        type: DataType.DATE,
        allowNull: false,
      })
      created_at: Date;
    
      @Column({
        type: DataType.DATE,
        allowNull: false,
      })
      updated_at: Date;
  }