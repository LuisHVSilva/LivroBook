import { DataType, Model } from "sequelize-typescript";
import { sequelize } from '../config/db';
import { StatusEntity } from "../app/interface/Entities/IStatusEntity";
import { Country } from "./Country";
import { PhoneCode } from "./PhoneCode";
import { User } from "./User";
import { UserType } from "./UserType";
import { LoginAttempts } from "./LoginAttempts";

class Status extends Model<StatusEntity> implements StatusEntity {
    id!: bigint;
    description!: string;
    createdAt!: Date;
    updatedAt!: Date;
}

Status.init(
    {
        id: {
            type: DataType.BIGINT,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        description: {
            type: DataType.STRING,
            allowNull: false
        },
        createdAt: {
            type: DataType.DATE,
            allowNull: false
        },
        updatedAt: {
            type: DataType.DATE,
            allowNull: false
        },
    },
    {
        sequelize,
        modelName: 'Status',
        tableName: 'STATUS',
        timestamps: true,
    }
);

Status.hasMany(User, { foreignKey: 'status' });
Status.hasMany(UserType, {foreignKey: 'status'});
Status.hasMany(PhoneCode, {foreignKey: 'status'});
Status.hasMany(Country, {foreignKey: 'status'});
Status.hasMany(LoginAttempts, {foreignKey: 'status'});


export { Status };
