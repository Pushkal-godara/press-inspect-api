import {
    Table,
    Column,
    Model,
    DataType,
    CreatedAt,
    UpdatedAt,
    HasMany,
    HasOne,
    ForeignKey,
    BelongsTo
} from 'sequelize-typescript';
import { DeliveryType } from './m-delivery-type.entity';
import { User } from 'src/modules/user/entities/user.entity';
import { Report } from 'src/modules/report/entities/report.entity';

@Table({
    tableName: 'delivery_type_category',
    timestamps: true
})

export class DeliveryTypeCategory extends Model {

    @Column({
        primaryKey: true,
        autoIncrement: true,
        type: DataType.INTEGER
    })
    id: number;

    @ForeignKey(() => User)
    @Column({
        type: DataType.INTEGER,
        allowNull: true,
        defaultValue: null,
    })
    user_id?: number;

    @BelongsTo(() => User)
    user: User;

    @ForeignKey(() => DeliveryType)
    @Column({
        type: DataType.INTEGER,
        allowNull: true,
        defaultValue: null,
    })
    delivery_type_id?: number;

    @BelongsTo(() => DeliveryType)
    deliveryType: DeliveryType;

    @Column({
        type: DataType.DATE,
        allowNull: true,
        defaultValue: null,
    })
    date_of_inspection?: Date;

    @HasMany(() => Report)
    reports: Report[];

}