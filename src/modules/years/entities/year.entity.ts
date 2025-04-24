import { 
    Table, 
    Column, 
    Model, 
    DataType, 
    CreatedAt, 
    UpdatedAt, 
    HasMany 
  } from 'sequelize-typescript';
  import { Report } from '../../reports/entities/report.entity';
  
  @Table({
    tableName: 'years',
  })
  export class Year extends Model {
    @Column({
        primaryKey: true,
        autoIncrement: true,
        type: DataType.INTEGER
    })
    id: number;
  
    @Column({
      type: DataType.STRING,
      allowNull: false,
      unique: true,
    })
    range: string;
  
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