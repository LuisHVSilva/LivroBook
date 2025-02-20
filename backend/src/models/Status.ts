import { DataType, Model, PrimaryKey, AutoIncrement, AllowNull, Column, Table, Default } from "sequelize-typescript";
import { CreationOptional, InferAttributes, InferCreationAttributes } from "sequelize";
import { sequelize } from "../config/db";
// import { User } from "./User";
// import { UserType } from "./UserType";
// import { PhoneCode } from "./PhoneCode";
// import { Country } from "./Country";
// import { LoginAttempts } from "./LoginAttempts";

@Table({ tableName: "STATUS", timestamps: true })
class Status extends Model<InferAttributes<Status>, InferCreationAttributes<Status>> {
    @PrimaryKey
    @AutoIncrement
    @AllowNull(false)
    @Column(DataType.BIGINT)
    declare id: CreationOptional<bigint>;

    @AllowNull(false)
    @Column(DataType.STRING)
    declare description: string;

    @AllowNull(false)
    @Default(false)
    @Column(DataType.BOOLEAN)
    declare active: CreationOptional<boolean>;
}

sequelize.addModels([Status]);
// Definindo relacionamentos
// Status.hasMany(User, { foreignKey: 'status' });
// Status.hasMany(UserType, { foreignKey: 'status' });
// Status.hasMany(PhoneCode, { foreignKey: 'status' });
// Status.hasMany(Country, { foreignKey: 'status' });
// Status.hasMany(LoginAttempts, { foreignKey: 'status' });

export { Status };
