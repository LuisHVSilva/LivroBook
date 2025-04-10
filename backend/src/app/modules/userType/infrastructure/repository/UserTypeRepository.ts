import "reflect-metadata"
import {IUserTypeRepository} from "@userType/infrastructure/repository/IUserTypeRepository";
import {UserType} from "@userType/domain/userType";
import {inject, injectable} from "tsyringe";
import {Sequelize} from "sequelize-typescript";
import {Transaction} from "sequelize";
import {UserTypeModel} from "@userType/infrastructure/model/UserTypeModel";
import {RepositoryError} from "@coreShared/errors/RepositoryError";
import {Result} from "@coreShared/types/Result";
import {StatusModel} from "@status/infrastructure/models/StatusModel";
import {Status} from "@status/domain/status";
import {DataConverter} from "@coreShared/utils/dataConverterUtils";
import {ICacheManager} from "@coreConfig/cache/ICacheManager";

@injectable()
export class UserTypeRepository implements IUserTypeRepository {
    //#region constants

    private readonly CLASS_NAME: string = 'UserTypeRepository';
    private readonly CACHE_TTL: number = 3600; // 1 hour in seconds
    private readonly CACHE_PREFIX: string = 'userType';

    //#endregion

    //#region Constructor
    constructor(
        @inject(Sequelize) private readonly sequelize: Sequelize,
        @inject('ICacheManager') private readonly cacheManager: ICacheManager<Result<UserType, RepositoryError>>
    ) {
    }

    //#endregion

    //#region IBaseRepository

    public async startTransaction(): Promise<Transaction> {
        return this.sequelize.transaction();
    }

    public async create(entity: UserType): Promise<Result<UserType, RepositoryError>> {
        try {
            const savedEntity: UserTypeModel = await UserTypeModel.create({
                description: entity.description,
                statusId: entity.status.getId()!
            });

            await this.cacheManager.invalidateRelatedCaches(
                this.CACHE_PREFIX, {description: savedEntity.description}, ['findByDescription']
            );

            const restoredUserType: UserType = UserType.restore({
                id: savedEntity.id,
                description: savedEntity.description,
                status: entity.status,
            });

            return Result.success(restoredUserType);
        } catch (e) {
            throw new RepositoryError(this.CLASS_NAME, e as Error);
        }
    }

    public async findById(id: number): Promise<Result<UserType, RepositoryError>> {
        const cacheKey: string = this.cacheManager.generateCacheKey(this.CACHE_PREFIX, 'findById', {id: id});
        return this.cacheManager.getOrSet(
            cacheKey,
            async (): Promise<Result<UserType, RepositoryError>> => {
                try {

                    const foundUserType: UserTypeModel | null = await UserTypeModel.findByPk(id);

                    if (!foundUserType) {
                        return Result.none();
                    }

                    const foundStatus: StatusModel | null = await StatusModel.findByPk(foundUserType.statusId);

                    if (!foundStatus) {
                        return Result.none();
                    }

                    const status: Status = Status.restore({
                        id: foundStatus.id,
                        description: foundStatus.description,
                        active: DataConverter.convertBooleanToStateEnum(foundStatus.active),
                    });

                    const userType: UserType = UserType.restore({
                        id: foundUserType.id,
                        description: foundUserType.description,
                        status: status,
                    });

                    return Result.success(userType);
                } catch (e) {
                    throw new RepositoryError(this.CLASS_NAME, e as Error);
                }
            }
        );
    }

    //#endregion

    //#region IUserTypeRepository methods
    public async countByDescription(description: string): Promise<number> {
        const cacheKey: string = this.cacheManager.generateCacheKey(this.CACHE_PREFIX,
            'countByDescription', {description});

        return this.cacheManager.getOrSet(
            cacheKey,
            async (): Promise<number> => {
                return await UserTypeModel.count({
                    where: {description}
                });
            },
            this.CACHE_TTL
        );
    }

    //#endregion
}