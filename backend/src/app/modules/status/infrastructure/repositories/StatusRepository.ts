import "reflect-metadata";
import {inject, injectable} from 'tsyringe';
import {Sequelize} from "sequelize-typescript";
import {Transaction} from 'sequelize';
import {IStatusRepository} from "./IStatusRepository";
import {Status} from "../../domain/status"
import {StatusModel} from "../models/StatusModel";
import {Result} from "@coreShared/types/Result";
import {RepositoryError} from "@coreShared/errors/RepositoryError";
import {DataConverter} from "@coreShared/utils/dataConverterUtils";
import {StateEnum} from "@coreShared/enums/StateEnum";
import {ICacheManager} from "@coreConfig/cache/ICacheManager";

@injectable()
export class StatusRepository implements IStatusRepository {
    //#region Properties

    private readonly className: string = "StatusRepository";
    private readonly CACHE_PREFIX: string = 'status';

    //#endregion

    //#region Constructor
    constructor(
        @inject(Sequelize) private readonly sequelize: Sequelize,
        @inject('ICacheManager') private readonly cacheManager: ICacheManager<Result<Status, RepositoryError>>
    ) {
    }

    //#endregion

    //#region IBaseRepository

    public async startTransaction(): Promise<Transaction> {
        return this.sequelize.transaction();
    };

    public async create(statusToSave: Status): Promise<Result<Status, RepositoryError>> {
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
            throw new RepositoryError(this.className, e as Error);
        }
    }

    public async findById(id: number): Promise<Result<Status, RepositoryError>> {
        const cacheKey: string = this.cacheManager.generateCacheKey(this.CACHE_PREFIX, 'findById', { id });

        const rawResult = await this.cacheManager.getOrSet(
            cacheKey,
            async (): Promise<Result<Status, RepositoryError>> => {
                try {
                    const foundStatus: StatusModel | null = await StatusModel.findByPk(id);

                    if (!foundStatus) {
                        return Result.none();
                    }

                    const status: Status = Status.restore({
                        id: foundStatus.id,
                        description: foundStatus.description,
                        active: DataConverter.convertBooleanToStateEnum(foundStatus.active),
                    });

                    return Result.success(status);
                } catch (e) {
                    return Result.failure(new RepositoryError(this.className, e as Error));
                }
            }
        );

        return Result.fromObject<Status, RepositoryError>(rawResult);
    }

    //#endregion

    //#region StatusRepository methods

    public async findByDescription(description: string): Promise<Result<Status, RepositoryError>> {

        const cacheKey: string = this.cacheManager.generateCacheKey(
            this.CACHE_PREFIX, 'findByDescription', {description: description}
        );

        const rawResult = await this.cacheManager.getOrSet(
            cacheKey,
            async (): Promise<Result<Status, RepositoryError>> => {
                try {
                    const foundStatus: StatusModel | null = await StatusModel.findOne(
                        {where: {description: description}}
                    );

                    if (!foundStatus) {
                        return Result.none();
                    }

                    const status: Status = Status.restore({
                        id: foundStatus.id,
                        description: foundStatus.description,
                        active: DataConverter.convertBooleanToStateEnum(foundStatus.active),
                    });

                    return Result.success(status);
                } catch (e) {
                    throw new RepositoryError(this.className, e as Error);
                }
            }
        )

        return Result.fromObject<Status, RepositoryError>(rawResult);
    };

    public async updateDescription(id: number, newDescription: string): Promise<void> {
        try {
            await StatusModel.update({description: newDescription}, {where: {id}});
        } catch (e) {
            throw new RepositoryError(this.className, e as Error);
        }
    };

    public async updateActive(id: number, newActive: StateEnum): Promise<void> {
        try {
            const convertedState: boolean = DataConverter.convertStateEnumToBoolean(newActive);
            await StatusModel.update({active: convertedState}, {where: {id}});
        } catch (e) {
            throw new RepositoryError(this.className, e as Error);
        }
    }

    //#endregion
}
