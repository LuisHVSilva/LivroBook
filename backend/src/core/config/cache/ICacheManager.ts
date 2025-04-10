export interface ICacheManager <T> {
    generateCacheKey(cachePrefix: string, method: string, params: Record<string, any>): string;
    invalidateRelatedCaches(cachePrefix: string, params: Record<string, any>, queryTypes: string[]): Promise<void>,
    getOrSet<T>(key: string,factory: () => Promise<T>,ttlSeconds?: number): Promise<T>;
}