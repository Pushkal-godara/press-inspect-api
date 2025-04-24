import { 
    Table, 
    Column, 
    Model, 
    DataType, 
    CreatedAt, 
    UpdatedAt, 
    HasMany 
  } from 'sequelize-typescript';
  import { Checkpoint } from '../../checkpoints/entities/checkpoint.entity';
  
  @Table({
    tableName: 'units',
  })
  export class Unit extends Model {
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
    name: string;
  
    @HasMany(() => Checkpoint)
    checkpoints: Checkpoint[];
  
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