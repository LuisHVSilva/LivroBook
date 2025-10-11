import {inject, injectable} from "tsyringe";
import {RepositoryBase} from "@coreShared/base/repository.base";
import {FindOptions, InferCreationAttributes, ModelStatic} from "sequelize";
import {
    IUserCredentialTypeRepository
} from "@user/infrastructure/repositories/interface/IUserCredentialType.repository";
import {UserCredentialTypeModel} from "@user/infrastructure/models/userCredentialType.model";
import {UserCredentialTypeEntity} from "@user/domain/entities/userCredentialType.entity";
import {UserCredentialTypeBaseRepositoryType} from "@user/adapters/dtos/userCredentialType.dto";
import {IStatusRepository} from "@status/infrastructure/repositories/IStatusRepository";
import {RelationMapType} from "@coreShared/types/controller.type";


@injectable()
export class UserCredentialTypeRepository extends RepositoryBase<UserCredentialTypeBaseRepositoryType> implements IUserCredentialTypeRepository {
    constructor(
        @inject("UserCredentialTypeModel")
        model: ModelStatic<UserCredentialTypeModel>,
        @inject("IStatusRepository")
        protected readonly statusRepository: IStatusRepository,
    ) {
        super(model);
    }

    protected getIncludes(): FindOptions['include'] {
        return [
            {
                association: UserCredentialTypeModel.associations.status,
                attributes: ['id', 'description'],
            },
        ];
    }

    protected associationMap(): Partial<Record<keyof UserCredentialTypeBaseRepositoryType["Filter"], string>> {
        return {
            status: "status.description",
        };
    }


    protected filter(): Partial<Record<keyof UserCredentialTypeBaseRepositoryType["Filter"], {
        in?: boolean;
        like?: boolean
    }>> | undefined {
        return {
            id: {in: true},
            description: {like: true},
            status: {like: true},
        };
    }

    protected async toPersistence(entity: UserCredentialTypeBaseRepositoryType["Entity"]): Promise<InferCreationAttributes<UserCredentialTypeModel>> {
        const relationData = {
            status: entity.status,
        }

        const relations: RelationMapType = {
            status: {idField: 'statusId', filterField: 'description', repo: this.statusRepository},
        }


        const normalized = await this.normalizeRelations(relationData, relations);

        return {
            id: entity.id,
            description: entity.description,
            statusId: normalized.statusId
        };
    }

    protected async toEntity(model: UserCredentialTypeBaseRepositoryType["Model"]): Promise<UserCredentialTypeBaseRepositoryType["Entity"]> {
        const normalized = await this.normalizeEntityStatus(model);

        return UserCredentialTypeEntity.create({
            id: model.id,
            description: model.description,
            status: normalized.status,
        });
    }

    //#endregion
}