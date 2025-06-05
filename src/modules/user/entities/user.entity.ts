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
    allowNull: false,
  })
  firstName: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  lastName: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  passportNumber: string;

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
  mobile: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  password: string;

  @Column({
    type: DataType.DATE,
    allowNull: false,
    defaultValue: DataType.NOW,
  })
  joiningDate: Date;

  @Column({
    type: DataType.TEXT,
    allowNull: true,
  })
  address: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  city: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  state: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  pincode: string;

  @ForeignKey(() => Country)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  countryId: number;

  @BelongsTo(() => Country)
  country: Country;

  @Column({
    type: DataType.STRING,
    allowNull: true,
    field: 'company_name',
  })
  companyName: string;

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

  @Column({
    type: DataType.DATE,
    allowNull: true,
    field: 'passport_expiry_date',
  })
  passportExpiryDate: Date;

  @Column({
    type: DataType.STRING,
    allowNull: true,
    field: 'passport_attachment',
  })
  passportAttachment: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
    field: 'photo_of_engineer',
  })
  photoOfEngineer: string;

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
  })
  created_at?: Date;

  @Column({
    type: DataType.DATE,
    allowNull: true,
  })
  updated_at?: Date;

  @Column({
    type: DataType.BOOLEAN,
    allowNull: true,
    defaultValue: true
  })
  is_active: boolean;

}