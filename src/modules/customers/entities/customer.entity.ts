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
    tableName: 'customers',
  })
  export class Customer extends Model {
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
  
    @Column({
      type: DataType.TEXT,
      allowNull: true,
    })
    address: string;
  
    @Column({
      type: DataType.STRING,
      allowNull: true,
    })
    contactPerson: string;
  
    @Column({
      type: DataType.STRING,
      allowNull: true,
    })
    email: string;
  
    @Column({
      type: DataType.STRING,
      allowNull: true,
    })
    phone: string;
  
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