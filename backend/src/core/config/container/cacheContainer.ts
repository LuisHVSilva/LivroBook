import {container} from 'tsyringe';
import {ICache} from '@coreConfig/cache/ICache';
import {RedisCache} from '@coreConfig/cache/RedisCache';
import {CacheManager} from '@coreConfig/cache/CacheManager';
import {ICacheManager} from "@coreConfig/cache/ICacheManager";

container.registerSingleton<ICache>('ICache', RedisCache);
container.registerSingleton<ICacheManager<any>>('ICacheManager', CacheManager);

export {container};
