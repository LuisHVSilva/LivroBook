import "reflect-metadata";
import {inject, injectable} from 'tsyringe';
import {Sequelize} from "sequelize-typescript";
import {Transaction} from 'sequelize';
import {IStatusRepository} from "./IStatusRepository";
import {Status} from "../../domain/status"
import {StatusModel} from "../models/StatusModel";
import {StringUtils} from "@coreShared/utils/StringUtils";
import {Result} from "@coreShared/types/Result";
import {RepositoryError} from "@coreShared/errors/RepositoryError";
import {CacheManager} from "@coreConfig/cache/CacheManager";
import {ILogger} from "@coreShared/logs/ILogger";
import {StatusMessages} from "@coreShared/messages/statusMessages";
import {DataConverter} from "@coreShared/utils/dataConverterUtils";
import {StateEnum} from "@coreShared/enums/StateEnum";

@injectable()
export class StatusRepository implements IStatusRepository {
    //#region Properties

    private readonly className: string = "StatusRepository";
    private readonly CACHE_PREFIX: string = 'status';

    //#endregion

    //#region Constructor
    constructor(
        @inject(Sequelize) private sequelize: Sequelize,
        @inject("ILogger") private readonly logger: ILogger,
        @inject('CacheManager') private cacheManager: CacheManager
    ) {
    }
    //#endregion

    //#region Private methods

    private nullFoundReturn(message: string, method: string): Result<Status, RepositoryError> {
        const error = new RepositoryError(this.className, method, message);
        return Result.failure<Status, RepositoryError>(error);
    }

    //#endregion

    //#region IBaseRepository

    public async startTransaction(): Promise<Transaction> {
        return this.sequelize.transaction();
    };

    public async create(statusToSave: Status): Promise<Result<Status, RepositoryError>> {
        const method = "create";
        try {
            const persistedStatus: StatusModel = await StatusModel.create({
                description: statusToSave.getDescription(),
                active: DataConverter.convertStateEnumToBoolean(statusToSave.getActive()),
            });

            const restoredStatus: Status = Status.restore({
                id: persistedStatus.id,
                description: persistedStatus.description,
                active: DataConverter.convertBooleanToStateEnum(persistedStatus.active),
            });

            await this.cacheManager.invalidateRelatedCaches(
                this.CACHE_PREFIX, {description: statusToSave.getDescription()}, ['findByDescription']
            );

            return Result.success(restoredStatus);
        } catch (e) {
            const error = new RepositoryError(this.className, e as Error);
            this.logger.logError(this.className, method, error, error.toJSON());
            return Result.failure<Status, RepositoryError>(error);
        }
    }

    public async findById(id: number): Promise<Result<Status, RepositoryError>> {
        const method = "findById";
        try {
            const cacheKey: string = this.cacheManager.generateCacheKey(this.CACHE_PREFIX, 'findById', {id: id});
            return this.cacheManager.getOrSet(
                cacheKey,
                async (): Promise<Result<Status, RepositoryError>> => {
                    const foundStatus: StatusModel | null = await StatusModel.findByPk(id);

                    if (!foundStatus) {
                        return this.nullFoundReturn(method, StatusMessages.Error.NotFound.INVALID_ID(id.toString()));
                    }

                    const status: Status = Status.restore({
                        id: foundStatus.id,
                        description: foundStatus.description,
                        active: DataConverter.convertBooleanToStateEnum(foundStatus.active),
                    });

                    return Result.success(status);
                }
            );
        } catch (e) {
            const error = new RepositoryError(this.className, e as Error);
            this.logger.logError(this.className, method, error, error.toJSON());
            return Result.failure<Status, RepositoryError>(error);
        }
    };

    //#endregion

    //#region StatusRepository methods

    public async findByDescription(description: string): Promise<Result<Status, RepositoryError>> {
        const method: string = "findByDescription";

        try {
            const cacheKey: string = this.cacheManager.generateCacheKey(
                this.CACHE_PREFIX, 'findByDescription', {description: description}
            );

            return this.cacheManager.getOrSet(
                cacheKey,
                async (): Promise<Result<Status, RepositoryError>> => {
                    const descriptionFormatted: string = StringUtils.transformCapitalLetterWithoutAccent(description);
                    const foundStatus: StatusModel | null = await StatusModel.findOne(
                        {where: {description: descriptionFormatted}}
                    );

                    if (!foundStatus) {
                        return this.nullFoundReturn(method, StatusMessages.Error.NotFound.DESCRIPTION_NOT_FOUND(description));
                    }

                    const status: Status = Status.restore({
                        id: foundStatus.id,
                        description: foundStatus.description,
                        active: DataConverter.convertBooleanToStateEnum(foundStatus.active),
                    });

                    return Result.success(status);
                }
            )
        } catch (e) {
            const error = new RepositoryError(this.className, e as Error);
            this.logger.logError(this.className, method, error, error.toJSON());
            return Result.failure<Status, RepositoryError>(error);
        }
    };

    public async updateDescription(id: number, newDescription: string): Promise<void> {
        const method: string = "updateDescription";
        try {
            await StatusModel.update({description: newDescription}, {where: {id}});
        } catch (e) {
            const error = new RepositoryError(this.className, e as Error);
            this.logger.logError(this.className, method, error, error.toJSON());
        }
    };

    public async updateActive(id: number, newActive: StateEnum): Promise<void> {
        const method: string = "updateActive";
        try {
            const convertedState: boolean = DataConverter.convertStateEnumToBoolean(newActive);
            await StatusModel.update({active: convertedState}, {where: {id}});
        } catch (e) {
            const error = new RepositoryError(this.className, e as Error);
            this.logger.logError(this.className, method, error, error.toJSON());
        }
    }

    //#endregion
}
