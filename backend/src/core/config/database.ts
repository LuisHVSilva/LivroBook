import {Dialect} from "sequelize";
import {Sequelize} from "sequelize-typescript";
import * as dotenv from 'dotenv';
import * as path from 'path';

dotenv.config({path: path.resolve(__dirname, './.env')});

export class Database {
    private static instance: Sequelize;

    public static getInstance(): Sequelize {
        if (!Database.instance) {
            Database.instance = new Sequelize({
                dialect: process.env.DB_DIALECT as Dialect,
                database: process.env.DB_NAME!,
                username: process.env.DB_USERNAME!,
                password: process.env.DB_PASSWORD!,
                host: process.env.DB_HOST!,
                port: Number(process.env.DB_PORT),
            });
        }

        return Database.instance;
    }

    public static async connect(): Promise<void> {
        try {
            await Database.getInstance().authenticate();
            console.log("🎉 Banco de dados conectado com sucesso!");
        } catch (error) {
            console.error("🚨 Erro ao conectar no banco:", error);
        }
    }
}