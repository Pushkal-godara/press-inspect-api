import { Table, Column, Model, DataType, BelongsTo, ForeignKey, BelongsToMany, HasMany } from 'sequelize-typescript';
import { Role } from '../../roles/entities/role.entity';
import { UserRole } from '../../roles/entities/user-role.entity';
import { Report } from '../../report/entities/report.entity';
import { Country } from 'src/modules/country/entities/country.entity';
import { GeneralInfoTxn } from 'src/modules/report/entities/general-info-txn.entity';
import { SubUnitTxn } from 'src/modules/units/entities/sub-unit-txns.entity';
import { ControlStationTxns } from 'src/modules/report/entities/common-entity/control-station-txns.entity';
import { CoatingSystemTxn } from 'src/modules/units/entities/coating-system-txn.entity';
import { DeliveryTypeCategory } from 'src/modules/units/entities/delivery-type-category.entity';

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
    allowNull: true,
    defaultValue: null,
  })
  first_name?: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
    defaultValue: null,
  })
  last_name?: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
    defaultValue: null,
  })
  passport_number?: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
    unique: true,
    defaultValue: null,
  })
  email?: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
    defaultValue: null,
  })
  mobile?: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
    defaultValue: null,
  })
  password?: string;

  @Column({
    type: DataType.DATE,
    allowNull: true,
    defaultValue: DataType.NOW,
  })
  joining_date?: Date;

  @Column({
    type: DataType.TEXT,
    allowNull: true,
    defaultValue: null,
  })
  address?: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
    defaultValue: null,
  })
  city?: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
    defaultValue: null,
  })
  state?: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
    defaultValue: null,
  })
  pincode?: string;

  @ForeignKey(() => Country)
  @Column({
    type: DataType.INTEGER,
    allowNull: true,
    defaultValue: null,
  })
  country_id?: number;

  @BelongsTo(() => Country)
  country: Country;

  @Column({
    type: DataType.STRING,
    allowNull: true,
    defaultValue: null,
  })
  company_name?: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
    unique: true,
    defaultValue: null,
  })
  registration_id: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
    defaultValue: null,
  })
  cv_url?: string;

  @Column({
    type: DataType.TEXT,
    allowNull: true,
    defaultValue: null,
  })
  work_experience?: string;

  @Column({
    type: DataType.DATE,
    allowNull: true,
    defaultValue: null,
  })
  passport_expiry_date?: Date;

  @Column({
    type: DataType.STRING,
    allowNull: true,
    defaultValue: null,
  })
  passport_attachment?: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
    defaultValue: null,
  })
  photo_of_engineer?: string;

  @BelongsToMany(() => Role, () => UserRole)
  roles: Role[];

  @HasMany(() => CoatingSystemTxn)
  coatingSystemTxns: CoatingSystemTxn[]

  @HasMany(() => DeliveryTypeCategory)
  deliveryTypeCategories: DeliveryTypeCategory[]

  @HasMany(() => Report, 'inspector_id')
  reports: Report[];

  @HasMany(() => GeneralInfoTxn)
  generalInfoTxns: GeneralInfoTxn[]

  @HasMany(() => SubUnitTxn)
  subUnitTxns: SubUnitTxn[]

  @HasMany(() => ControlStationTxns)
  controlStationTxns: ControlStationTxns[]

  @Column({
    type: DataType.DATE,
    allowNull: true,
    defaultValue: DataType.NOW,
  })
  created_at?: Date;

  @Column({
    type: DataType.DATE,
    allowNull: true,
    defaultValue: DataType.NOW,
  })
  updated_at?: Date;

  @Column({
    type: DataType.BOOLEAN,
    allowNull: true,
    defaultValue: true
  })
  is_active?: boolean;

}