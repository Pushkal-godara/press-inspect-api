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
import { CoatingSystemUnit } from './coating-system-unit.entity';

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
        allowNull: false,
    })
    thingsToCheck: string;

    @ForeignKey(() => SubUnit)
    @Column({
        type: DataType.INTEGER,
        allowNull: false,
    })
    subUnitId: number;

    @BelongsTo(() => SubUnit)
    subUnit: SubUnit
    
    @ForeignKey(() => CoatingSystemUnit)
    @Column({
        type: DataType.INTEGER,
        allowNull: false,
    })
    coatingSystemUnitId: number;

    @BelongsTo(() => CoatingSystemUnit)
    coatingSystemUnit: CoatingSystemUnit

    @Column({
        type: DataType.DATE,
        allowNull: false,
    })
    created_at: Date;

    @HasMany(() => SubUnitTxn)
    subUnitTxns: SubUnitTxn[]
}