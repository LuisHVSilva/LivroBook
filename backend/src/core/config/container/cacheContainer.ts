import {container} from 'tsyringe';
import {ICache} from '@coreConfig/cache/ICache';
import {RedisCache} from '@coreConfig/cache/RedisCache';
import {CacheManager} from '@coreConfig/cache/CacheManager';

container.registerSingleton<ICache>('ICache', RedisCache);
container.registerSingleton<CacheManager>('CacheManager', CacheManager);

export {container};
