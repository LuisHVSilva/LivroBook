import {ICacheManager} from "@coreConfig/cache/ICacheManager";
import {Result} from "@coreShared/types/Result";

export class MockCacheManager<T, E> {
    private readonly cacheManagerMock: jest.Mocked<ICacheManager<T>>;

    constructor() {
        this.cacheManagerMock = {
            generateCacheKey: jest.fn(),
            invalidateRelatedCaches: jest.fn(),
            getOrSet: jest.fn(),
        }
    }

    get mock(): jest.Mocked<ICacheManager<T>> {
        return this.cacheManagerMock;
    }

    public withInvalidateRelatedCaches(): this {
        this.cacheManagerMock.invalidateRelatedCaches.mockResolvedValueOnce();
        return this;
    }

    public withGenerateCacheKey(): this {
        this.cacheManagerMock.invalidateRelatedCaches.mockResolvedValueOnce();
        return this;
    }

    public withGetOrSet(result: Result<T, E>): this {
        this.cacheManagerMock.getOrSet.mockResolvedValueOnce(result);
        return this;
    }

    public withGetOrSetFetcher(): this {
        this.cacheManagerMock.getOrSet.mockImplementation((_key, fetcher) => fetcher());
        return this;
    }

    public withGetOrSetError(error: E): this {
        this.cacheManagerMock.getOrSet.mockResolvedValueOnce(error);
        return this;
    }
}