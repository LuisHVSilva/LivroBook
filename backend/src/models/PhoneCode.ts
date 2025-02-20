import { DataType, Model } from "sequelize-typescript"
import { sequelize } from '../config/db';
import { PhoneCodeEntity } from "../app/interface/Entities/IPhoneCode";
import { Country } from "./Country";
import { User } from "./User";
import { Status } from "./Status";


class PhoneCode extends Model<PhoneCodeEntity> implements PhoneCodeEntity {
    id!: bigint;
    country!: bigint;
    regionDescription!: string;
    phoneDDD!: number;
    status!: number;
    createdAt!: Date;
    updatedAt!: Date;
}

PhoneCode.init(
    {
        id: {
            type: DataType.BIGINT,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        country: {
            type: DataType.BIGINT,
            allowNull: false
        },
        regionDescription: {
            type: DataType.STRING,
            allowNull: false
        },
        phoneDDD: {
            type: DataType.NUMBER,
            allowNull: false
        },
        status: {
            type: DataType.INTEGER,
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
        modelName: 'PhoneCode',
        tableName: 'PHONE_CODE',
        timestamps: true,
    }
);

PhoneCode.belongsTo(Status, { foreignKey: 'status', as: 'statusId', onDelete: 'SET NULL', onUpdate: "CASCADE" });
PhoneCode.belongsTo(Country, { foreignKey: 'country', as: 'countryId', onDelete: 'SET NULL', onUpdate: "CASCADE" });
PhoneCode.hasMany(User, { foreignKey: 'phoneDDD' });

export { PhoneCode };