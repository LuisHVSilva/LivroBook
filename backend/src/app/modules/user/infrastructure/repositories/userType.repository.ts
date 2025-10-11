import {inject, injectable} from "tsyringe";
import {RepositoryBase} from "@coreShared/base/repository.base";
import {IUserTypeRepository} from "@user/infrastructure/repositories/interface/IUserType.repository";
import {UserTypeModel} from "@user/infrastructure/models/userType.model";
import {FindOptions, InferCreationAttributes, ModelStatic} from "sequelize";
import {UserTypeBaseRepositoryType} from "@user/adapters/dtos/userType.dto";
import {UserTypeEntity} from "@user/domain/entities/userType.entity";
import {IStatusRepository} from "@status/infrastructure/repositories/IStatusRepository";
import {RelationMapType} from "@coreShared/types/controller.type";


@injectable()
export class UserTypeRepository extends RepositoryBase<UserTypeBaseRepositoryType> implements IUserTypeRepository {
    constructor(
        @inject("UserTypeModel")
        model: ModelStatic<UserTypeModel>,
        @inject("IStatusRepository")
        protected readonly statusRepository: IStatusRepository,
    ) {
        super(model);
    }

    protected getIncludes(): FindOptions['include'] {
        return [
            {
                association: UserTypeModel.associations.status,
                attributes: ['id', 'description'],
            },
        ];
    }

    protected associationMap(): Partial<Record<keyof UserTypeBaseRepositoryType["Filter"], string>> {
        return {
            status: "status.description",
        };
    }

    protected filter(): Partial<Record<keyof UserTypeBaseRepositoryType["Filter"], {
        in?: boolean;
        like?: boolean
    }>> | undefined {
        return {
            id: {in: true},
            description: {like: true},
            status: {like: true},
        };
    }

    protected async toPersistence(entity: UserTypeBaseRepositoryType["Entity"]): Promise<InferCreationAttributes<UserTypeModel>> {
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

    protected async toEntity(model: UserTypeBaseRepositoryType["Model"]): Promise<UserTypeBaseRepositoryType["Entity"]> {
        const normalized = await this.normalizeEntityStatus(model);

        return UserTypeEntity.create({
            id: model.id,
            description: model.description,
            status: normalized.status,
        });
    }
}