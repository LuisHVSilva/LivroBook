import { DataType, Model } from "sequelize-typescript";
import { sequelize } from '../config/db';
import { LoginAttemptsEntity } from "../app/interface/Entities/ILoginAttemptsEntity";
import { User } from "./User";
import { Status } from "./Status";

class LoginAttempts extends Model<LoginAttemptsEntity> implements LoginAttemptsEntity {
    id!: bigint;
    userId!: bigint;
    ipAddress!: string;
    userAgent!: string;
    reason!: string;
    status!: number;
    createdAt!: Date;
    updatedAt!: Date; 
}

LoginAttempts.init(
    {
        id: {
            type: DataType.BIGINT,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        userId: {
            type: DataType.BIGINT,
            allowNull: false
        },
        ipAddress: {
            type: DataType.STRING,
            allowNull: false
        },
        userAgent: {
            type: DataType.STRING,
            allowNull: false
        },
        reason: {
            type: DataType.STRING,
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
        modelName: 'LoginAttempts',
        tableName: 'LOGIN_ATTEMPTS',
        timestamps: true,
    }
);

LoginAttempts.belongsTo(User, { foreignKey: 'userId', as: 'userId', onDelete: 'CASCADE', onUpdate: "CASCADE" });
LoginAttempts.belongsTo(Status, { foreignKey: 'status', as: 'currentStatus', onDelete: 'SET NULL', onUpdate: "CASCADE" });

export { LoginAttempts };
