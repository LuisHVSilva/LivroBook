import { DataType, Model } from 'sequelize-typescript';
import { sequelize } from '../config/db';
import { UserSessionEntity } from '../app/interface/Entities/IUserSession';

class UserSession extends Model<UserSessionEntity> implements UserSessionEntity {
    id!: bigint;
    userId!: bigint;    
    ipAddress!: string; 
    refreshToken!: string;    
    status!: bigint;
    expiresAt!: Date;
    lastUsedAt!: Date;
    createdAt!: Date;
    updatedAt!: Date;
}

UserSession.init(
    {
        id: {
            type: DataType.BIGINT,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        userId: {
            type: DataType.BIGINT,
            allowNull: false
        },
        ipAddress: {
            type: DataType.STRING,
            allowNull: false
        },
        refreshToken: {
            type: DataType.STRING,
            allowNull: false
        },
        status: {
            type: DataType.BIGINT,
            allowNull: false
        },
        lastUsedAt: {
            type: DataType.DATEONLY,
            allowNull: false,
            defaultValue: Date.now()
        },
        expiresAt: {
            type: DataType.DATE,
            allowNull: false,
        },
        createdAt: {
            type: DataType.DATE,
            allowNull: false,
            defaultValue: Date.now(),
        },
        updatedAt: {
            type: DataType.DATE,
            allowNull: false,
            defaultValue: Date.now()
        },
    },
    {
        sequelize,
        modelName: 'UserSession',
        tableName: 'USER_SESSION',
        timestamps: true,
    }
);



export { UserSession };
