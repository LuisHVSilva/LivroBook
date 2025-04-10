import { injectable, inject } from 'tsyringe';
import { ICache } from './ICache';
import { ILogger } from "@coreShared/logs/ILogger";
import {ICacheManager} from "@coreConfig/cache/ICacheManager";

@injectable()
export class CacheManager<T> implements ICacheManager<T>{
    private readonly className = 'CacheManager';

    constructor(
        @inject('ICache') private readonly cache: ICache,
        @inject('ILogger') private readonly logger: ILogger
    ) {}

    private generateKey(prefix: string, params: Record<string, any>): string {
        // Ordena as chaves de forma consistente e cria a chave concatenando os parâmetros
        const sortedParams = Object.keys(params)
            .sort()
            .map(key => `${key}:${params[key]}`)
            .join(':');
        return `${prefix}:${sortedParams}`;
    }

    private async invalidatePattern(pattern: string): Promise<void> {
        try {
            // Obtém todas as chaves que correspondem ao padrão
            const keys = await this.cache.keys(pattern);
            if (keys.length > 0) {
                await Promise.all(keys.map(key => this.cache.delete(key)));
                this.logger.logInfo(this.className, 'Pattern Invalidation', `Pattern: ${pattern}, Keys invalidated: ${keys.length}`);
            } else {
                this.logger.logInfo(this.className, 'No Keys Found', `No keys matched the pattern: ${pattern}`);
            }
        } catch (error) {
            // Log de erro detalhado
            this.logger.logError(this.className, 'Invalidate Pattern Error', error as Error);
        }
    }

    private async invalidateKey(key: string): Promise<void> {
        try {
            await this.cache.delete(key);
            this.logger.logInfo(this.className, 'Key Invalidation', `Key: ${key}`);
        } catch (error) {
            this.logger.logError(this.className, 'Invalidate Key Error', error as Error);
        }
    }

    public generateCacheKey(cachePrefix: string, method: string, params: Record<string, any>): string {
        const prefix = `${cachePrefix}:${method}`;
        return this.generateKey(prefix, params);
    }

    public async invalidateRelatedCaches(cachePrefix: string, params: Record<string, any>, queryTypes: string[]): Promise<void> {
        for (const queryType of queryTypes) {
            const specificKey = this.generateCacheKey(cachePrefix, queryType, params);
            await this.invalidateKey(specificKey);
        }

        await this.invalidatePattern(`${cachePrefix}:findAll*`);
    }

    public async getOrSet<T>(key: string,factory: () => Promise<T>,ttlSeconds?: number): Promise<T> {
        try {
            const cached = await this.cache.get(key);
            if (cached) {
                await this.logger.logInfo(this.className, 'Cache Hit', `Key: ${key}`);
                return JSON.parse(cached);
            }

            await this.logger.logInfo(this.className, 'Cache Miss', `Key: ${key}`);
            const value = await factory();

            await this.cache.set(key, JSON.stringify(value), ttlSeconds);
            return value;
        } catch (error) {
            await this.logger.logError(this.className, 'GetOrSet Error', error as Error);
            return await factory();
        }
    }
}
