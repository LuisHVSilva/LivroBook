// core/config/container/configContainer.ts
import { container } from "tsyringe";
import { Database } from "../database";
import { Sequelize } from "sequelize-typescript";
import { ILogger } from "@coreShared/logs/ILogger";
import { Logger } from "@coreShared/logs/logger";
import { ICache } from "@coreConfig/cache/ICache";
import { RedisCache } from "@coreConfig/cache/RedisCache";
import { CacheManager } from "@coreConfig/cache/CacheManager";

// Registra instâncias
container.registerInstance(Sequelize, Database.getInstance());
container.registerSingleton<ILogger>("ILogger", Logger);
container.registerSingleton<ICache>("ICache", RedisCache);
container.registerSingleton("CacheManager", CacheManager);

export {container}