import { DataType, Model } from "sequelize-typescript";
import { sequelize } from '../config/db';
import { CountryEntity } from "../app/interface/Entities/ICountryEntity";
import { Status } from "./Status";
import { PhoneCode } from "./PhoneCode";
import { User } from "./User";

class Country extends Model<CountryEntity> implements CountryEntity {
    id!: bigint;
    description!: string;
    phoneCode!: number;
    status!: bigint;
    createdAt!: Date;
    updatedAt!: Date;
}

Country.init(
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
        phoneCode: {
            type: DataType.NUMBER,
            allowNull: false
        },
        status: {
            type: DataType.BIGINT,
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
        modelName: 'Country',
        tableName: 'COUNTRY',
        timestamps: true,
    }
);


Country.belongsTo(Status, { foreignKey: 'status', as: 'currentStatus', onDelete: 'SET NULL', onUpdate: "CASCADE" });
Country.hasMany(PhoneCode, { foreignKey: 'country' });
Country.hasMany(User, { foreignKey: 'phoneCountryCode' });
Country.hasMany(User, { foreignKey: 'nationality' });

export { Country };
