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
  import { Unit } from '../../units/entities/unit.entity';
  import { ReportDetail } from '../../reports/entities/report-detail.entity';
  
  @Table({
    tableName: 'checkpoints',
  })
  export class Checkpoint extends Model {
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
    description: string;
  
    @ForeignKey(() => Unit)
    @Column({
      type: DataType.INTEGER,
      allowNull: false,
    })
    unitId: number;
  
    @BelongsTo(() => Unit)
    unit: Unit;
  
    @HasMany(() => ReportDetail)
    reportDetails: ReportDetail[];
  
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