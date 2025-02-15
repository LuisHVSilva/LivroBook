import { DataType, Model } from 'sequelize-typescript';
import { sequelize } from '../config/db';
import { UserEntity } from '../app/interface/Entities/IUserEntity';
import { UserType } from './UserType';
import { Status } from './Status';
import { PhoneCode } from './PhoneCode';
import { Country } from './Country';
import { LoginAttempts } from './LoginAttempts';

class User extends Model<UserEntity> implements UserEntity {
    id!: bigint;
    userTypeId!: bigint;
    name!: string;
    phoneDDD!: bigint
    phoneCountryCode!: bigint;
    phoneNumber!: number;
    birthDate!: Date;
    nationality!: bigint;
    email!: string;
    username!: string;
    password!: string;
    loginCount!: bigint;
    status!: bigint
    createdAt!: Date;
    updatedAt!: Date;
}

User.init(
    {
        id: {
            type: DataType.BIGINT,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        userTypeId: {
            type: DataType.INTEGER,
            allowNull: false,
            defaultValue: 3,
        },
        name: {
            type: DataType.STRING,
            allowNull: false
        },
        phoneDDD: {
            type: DataType.BIGINT,
            allowNull: false
        },
        phoneCountryCode: {
            type: DataType.BIGINT,
            allowNull: false
        },
        phoneNumber: {
            type: DataType.NUMBER,
            allowNull: false
        },
        birthDate: {
            type: DataType.DATEONLY,
            allowNull: false,
        },
        nationality: {
            type: DataType.BIGINT,
            allowNull: false,
        },
        email: {
            type: DataType.STRING,
            allowNull: false,
            unique: true
        },
        username: {
            type: DataType.STRING,
            allowNull: false,
            unique: true
        },
        password: {
            type: DataType.STRING,
            allowNull: false,
        },
        loginCount: {
            type: DataType.BIGINT,
            allowNull: false
        },
        status: {
            type: DataType.BOOLEAN,
            allowNull: false,
            defaultValue: false
        },
        createdAt: {
            type: DataType.DATE,
            allowNull: false,
            defaultValue: Date.now()
        },
        updatedAt: {
            type: DataType.DATE,
            allowNull: false,
            defaultValue: Date.now()
        },

    },
    {
        sequelize,
        modelName: 'User',
        tableName: 'USER',
        timestamps: true,
    }
);


User.belongsTo(UserType, { foreignKey: 'userTypeId', as: 'userTypeId', onDelete: 'SET NULL', onUpdate: "CASCADE" });
User.belongsTo(Status, { foreignKey: 'status', as: 'userId', onDelete: 'SET NULL', onUpdate: "CASCADE" });
User.belongsTo(PhoneCode, { foreignKey: 'phoneDDD', as: 'phoneId', onDelete: 'SET NULL', onUpdate: "CASCADE" });
User.belongsTo(Country, { foreignKey: 'phoneCountryCode', as: 'phoneCountryCode', onDelete: 'SET NULL', onUpdate: "CASCADE" });
User.belongsTo(Country, { foreignKey: 'nationality', as: 'nationality', onDelete: 'SET NULL', onUpdate: "CASCADE" });
User.hasMany(LoginAttempts, {foreignKey: 'userId'});

export { User };
