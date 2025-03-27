import { createClient, RedisClientType } from 'redis';
import {inject, injectable} from 'tsyringe';
import { ICache } from './ICache';
import {ILogger} from "@coreShared/logs/ILogger";
import * as dotenv from "dotenv";
import path from "path";

dotenv.config({path: path.resolve(__dirname, '../../../../.env')});

@injectable()
export class RedisCache implements ICache {
    private client: any;
    private readonly className: string = 'RedisCache';
    private connected: boolean = false;

    constructor(
        @inject("ILogger") private readonly logger: ILogger,
    ) {
        this.initializeClient();
    }

    private async initializeClient(): Promise<void> {
        try {
            this.client = createClient({
                url: process.env.REDIS_URL || 'redis://localhost:6379',
                //password: process.env.REDIS_PASSWORD
            });

            this.client.on('error', (err: any) => {
                this.logger.logError(this.className, 'Redis Client Error', err as Error);
                this.connected = false;
            });

            this.client.on('connect', () => {
                this.logger.logInfo(this.className, "initializeClient", 'Redis Client Connected');
                this.connected = true;
            });

            await this.client.connect();
        } catch (error) {
            this.logger.logError(this.className, 'Redis Connection Error', error as Error);
            throw error;
        }
    }

    private async ensureConnection(): Promise<void> {
        if (!this.connected) {
            await this.initializeClient();
        }
    }

    public async get(key: string): Promise<string | null> {
        try {
            await this.ensureConnection();
            return await this.client.get(key);
        } catch (error) {
            this.logger.logError(this.className, 'Get Error', error as Error);
            return null;
        }
    }

    public async set(key: string, value: string, ttlSeconds?: number): Promise<void> {
        try {
            await this.ensureConnection();
            if (ttlSeconds) {
                await this.client.setEx(key, ttlSeconds, value);
            } else {
                await this.client.set(key, value);
            }
        } catch (error) {
            this.logger.logError(this.className, 'Set Error', error as Error);
        }
    }

    public async delete(key: string): Promise<void> {
        try {
            await this.ensureConnection();
            await this.client.del(key);
        } catch (error) {
            this.logger.logError(this.className, 'Delete Error', error as Error);
        }
    }

    public async clear(): Promise<void> {
        try {
            await this.ensureConnection();
            await this.client.flushAll();
        } catch (error) {
            this.logger.logError(this.className, 'Clear Error', error as Error);
        }
    }

    public async keys(pattern: string): Promise<string[]> {
        try {
            await this.ensureConnection();
            return await this.client.keys(pattern);
        } catch (error) {
            this.logger.logError(this.className, 'Keys Error', error as Error);
            return [];
        }
    }
}