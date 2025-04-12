import { Table, Column, Model, DataType, BelongsTo, ForeignKey, HasMany } from 'sequelize-typescript';
import { Company } from './company.entity';
import { Department } from './department.entity';

@Table({
  tableName: 'plants',
})
export class Plant extends Model<Plant> {
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
  name: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  location: string;

  @ForeignKey(() => Company)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  companyId: number;

  @BelongsTo(() => Company)
  company: Company;

  @HasMany(() => Department)
  departments: Department[];
}