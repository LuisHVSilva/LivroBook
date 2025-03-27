import {Dialect} from "sequelize";
import {Sequelize} from "sequelize-typescript";
import * as dotenv from 'dotenv';
import * as path from 'path';
import {createClient, RedisClientType} from "redis";

dotenv.config({path: path.resolve(__dirname, '../../../../.env')});

export class Database {
    private static instance: Sequelize;
    private static redisClient: RedisClientType;

    //#region Database

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

    //#endregion

    //#region Redis

    public static async redisConnect() {
        try {
            if (!Database.redisClient) {
                Database.redisClient = createClient({
                    url: process.env.REDIS_URL || 'redis://localhost:6379'
                });

                Database.redisClient.on('error', err => console.error('🚨 Redis Client Error', err));
                Database.redisClient.on('connect', () => console.log('✅ Redis connected successfully'));

                await Database.redisClient.connect();
            }
            return Database.redisClient;
        } catch (error) {
            console.error('❌ Redis Connection Error:', error);
            throw error;
        }
    }

    public static getRedisClient(): RedisClientType {
        if (!Database.redisClient) {
            throw new Error('Redis client not initialized');
        }
        return Database.redisClient;
    }

    //#endregion

    public static async connect(): Promise<void> {
        try {
            await Database.getInstance().authenticate();
            console.log("🎉 Banco de dados conectado com sucesso!");

            await Database.redisConnect();
        } catch (error) {
            console.error("🚨 Erro ao conectar no banco:", error);
        }
    }
}