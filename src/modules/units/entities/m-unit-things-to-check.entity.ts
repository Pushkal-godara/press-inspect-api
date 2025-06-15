import {
    Table,
    Column,
    Model,
    DataType,
    CreatedAt,
    UpdatedAt,
    HasMany,
    ForeignKey,
    BelongsTo
} from 'sequelize-typescript';
import { SubUnit } from './sub-unit.entity';
import { SubUnitTxn } from './sub-unit-txns.entity';
import { CoatingSystemUnit } from './m-coating-system-unit.entity';
import { CoatingSystemTxn } from './coating-system-txn.entity';

@Table({
    tableName: 'things_to_check_units',
    timestamps: true
})

export class ThingsToCheckUnits extends Model {
    @Column({
        primaryKey: true,
        autoIncrement: true,
        type: DataType.INTEGER
    })
    id: number;

    @Column({
        type: DataType.TEXT,
        allowNull: true,
        unique: true,
        defaultValue: null
    })
    things_to_check?: string;

    @ForeignKey(() => SubUnit)
    @Column({
        type: DataType.INTEGER,
        allowNull: true,
        defaultValue: null
    })
    sub_unit_id?: number;

    @BelongsTo(() => SubUnit)
    subUnit: SubUnit;
    
    @ForeignKey(() => CoatingSystemUnit)
    @Column({
        type: DataType.INTEGER,
        allowNull: true,
        defaultValue: null
    })
    coating_system_unit_id?: number;

    @BelongsTo(() => CoatingSystemUnit)
    coatingSystemUnit: CoatingSystemUnit

    @Column({
        type: DataType.DATE,
        allowNull: true,
        defaultValue: DataType.NOW
    })
    created_at?: Date;

    @HasMany(() => SubUnitTxn)
    subUnitTxns: SubUnitTxn[]

    @HasMany(() => CoatingSystemTxn)
    coatingSystemTxns: CoatingSystemTxn[]
}