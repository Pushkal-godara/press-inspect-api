import { Table, Column, Model, DataType, BelongsTo, ForeignKey, BelongsToMany, HasMany } from 'sequelize-typescript';
import { Role } from '../../roles/entities/role.entity';
import { UserRole } from '../../roles/entities/user-role.entity';
import { Report } from '../../report/entities/report.entity';

@Table({
  tableName: 'users',
})
export class User extends Model<User> {
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
  username: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
    unique: true,
  })
  email: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  password: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  country: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
    field: 'registration_id',
  })
  registrationId: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
    field: 'cv_url',
  })
  cvUrl: string;

  @Column({
    type: DataType.TEXT,
    allowNull: true,
    field: 'work_experience',
  })
  workExperience: string;

  @BelongsToMany(() => Role, () => UserRole)
  roles: Role[];

  @HasMany(() => Report, 'inspector_id')
  reports: Report[];

  @Column({
    type: DataType.DATE,
    allowNull: true,
  })
  created_at?: Date;

  @Column({
    type: DataType.DATE,
    allowNull: true,
  })
  updated_at?: Date;

}