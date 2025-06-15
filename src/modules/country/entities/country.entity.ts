import { Table, Column, Model, DataType, HasMany, BelongsToMany } from 'sequelize-typescript';
import { User } from '../../user/entities/user.entity';

@Table({
    tableName: 'country',
})

export class Country extends Model<Country> {
    @Column({
        primaryKey: true,
        autoIncrement: true,
        type: DataType.INTEGER,
    })
    id: number;

    @Column({
        type: DataType.STRING,
        allowNull: true,
        unique: true,
        defaultValue: null,
    })
    name?: string;

    @Column({
        type: DataType.STRING,
        allowNull: true,
        defaultValue: null,
    })
    code?: string;

    @Column({
        type: DataType.STRING,
        allowNull: true,
        defaultValue: null,
    })
    phone_code?: string;

    @HasMany(() => User)
    users: User[];

}