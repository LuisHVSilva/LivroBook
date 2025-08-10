import {Dialect} from "sequelize";
import {Sequelize} from "sequelize-typescript";
import * as dotenv from 'dotenv';
import * as path from 'path';
import {DocumentTypeModel} from "@document/infrastructure/models/documentType.model";
import {CityModel} from "@location/infrastructure/models/city.model";
import {CountryModel} from "@location/infrastructure/models/country.model";
import {StateModel} from "@location/infrastructure/models/state.model";
import {PhoneTypeModel} from "@phone/infrastructure/models/phoneType.model";
import {PhoneCodeModel} from "@phone/infrastructure/models/phoneCode.model";
import {PhoneModel} from "@phone/infrastructure/models/phone.model";
import {StatusModel} from "@status/infrastructure/models/status.model";
import {UserCredentialTypeModel} from "@user/infrastructure/models/userCredentialType.model";
import {UserTypeModel} from "@user/infrastructure/models/userType.model";
import {UserCredentialModel} from "@user/infrastructure/models/userCredential.model";
import {UserModel} from "@user/infrastructure/models/user.model";

dotenv.config({path: path.resolve(__dirname, '../../../.env')});

export class Database {
    private static instance: Sequelize;

    //#region Database

    public static getInstance(): Sequelize {
        Database.instance ??= new Sequelize({
            dialect: process.env.DB_DIALECT as Dialect,
            database: process.env.DB_NAME!,
            username: process.env.DB_USERNAME!,
            password: process.env.DB_PASSWORD!,
            host: process.env.DB_HOST!,
            port: Number(process.env.DB_PORT),
            models: [DocumentTypeModel, CityModel, CountryModel, StateModel, PhoneTypeModel, PhoneCodeModel,
                PhoneModel, StatusModel, UserCredentialTypeModel, UserTypeModel, UserCredentialModel, UserModel]
        });

        return Database.instance;
    }

    //#endregion

    public static async connect(): Promise<void> {
        try {
            await Database.getInstance().authenticate();
            console.log("🎉 Banco de dados conectado com sucesso!");

        } catch (error) {
            console.error("🚨 Erro ao conectar no banco:", error);
        }
    }
}