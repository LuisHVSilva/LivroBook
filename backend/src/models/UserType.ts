import { DataType, Model } from "sequelize-typescript";
import { sequelize } from '../config/db';
import { UserTypeEntity } from "../app/interface/Entities/IUserTypeEntity";
import { User } from "./User";
import { Status } from "./Status";

class UserType extends Model<UserTypeEntity> implements UserTypeEntity {
    id!: number;
    description!: string;
    status!: number;
    createdAt!: Date;
    updatedAt!: Date;
}

UserType.init(
    {
        id: {
            type: DataType.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        description: {
            type: DataType.STRING,
            allowNull: false
        },
        status: {
            type: DataType.INTEGER,
            allowNull: false,
            defaultValue: false
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
        modelName: 'UserType',
        tableName: 'USER_TYPE',
        timestamps: true,
    }
);

UserType.belongsTo(Status, {foreignKey: 'status', as: 'currentStatus', onDelete: 'SET NULL', onUpdate: "CASCADE" });
UserType.hasMany(User, { foreignKey: 'userTypeId' });

export { UserType };
