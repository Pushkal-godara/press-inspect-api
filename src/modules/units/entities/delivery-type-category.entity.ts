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
import { SubUnit } from './sub-unit.entity';
import { User } from 'src/modules/user/entities/user.entity';

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
        allowNull: false,
    })
    userId: number;

    @BelongsTo(() => User)
    user: User;

    @ForeignKey(() => DeliveryType)
    @Column({
        type: DataType.INTEGER,
        allowNull: false,
    })
    deliveryTypeId: number;

    @BelongsTo(() => DeliveryType)
    deliveryType: DeliveryType;

    @Column({
        type: DataType.DATE,
        allowNull: true,
    })
    dateOfInspection: Date;

    // @HasMany(() => SubUnit)
    // subUnits: SubUnit[];
}