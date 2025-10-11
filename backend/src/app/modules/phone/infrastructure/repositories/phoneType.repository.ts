import {inject, injectable} from "tsyringe";
import {IPhoneTypeRepository} from "@phone/infrastructure/repositories/interface/IPhoneType.repository";
import {PhoneTypeEntity} from "@phone/domain/entities/phoneType.entity";
import {FindOptions, InferCreationAttributes, ModelStatic} from "sequelize";
import {PhoneTypeModel} from "@phone/infrastructure/models/phoneType.model";
import {PhoneTypeBaseRepositoryType} from "@phone/adapters/dtos/phoneType.dto";
import {RepositoryBase} from "@coreShared/base/repository.base";
import {IStatusRepository} from "@status/infrastructure/repositories/IStatusRepository";
import {RelationMapType} from "@coreShared/types/controller.type";

@injectable()
export class PhoneTypeRepository extends RepositoryBase<PhoneTypeBaseRepositoryType> implements IPhoneTypeRepository {
    constructor(
        @inject("PhoneTypeModel")
        model: ModelStatic<PhoneTypeModel>,
        @inject("IStatusRepository")
        protected readonly statusRepository: IStatusRepository,
    ) {
        super(model);
    }

    protected getIncludes(): FindOptions['include'] {
        return [
            {
                association: PhoneTypeModel.associations.status,
                attributes: ['id', 'description'],
            }
        ];
    }

    protected associationMap(): Partial<Record<keyof PhoneTypeBaseRepositoryType["Filter"], string>> {
        return {
            status: 'status.description',
        };
    }

    protected filter(): Partial<Record<keyof PhoneTypeBaseRepositoryType["Filter"], {
        in?: boolean;
        like?: boolean
    }>> | undefined {
        return {
            id: {in: true},
            description: {like: true},
            status: {like: true},
        };
    }

    protected async toPersistence(
        entity: PhoneTypeBaseRepositoryType["Entity"]
    ): Promise<InferCreationAttributes<PhoneTypeModel>> {
        const relationData = {
            status: entity.status,
        };

        const relations: RelationMapType = {
            status: {idField: 'statusId', filterField: 'description', repo: this.statusRepository},
        };


        const normalized = await this.normalizeRelations(relationData, relations);

        return {
            id: entity.id,
            description: entity.description,
            statusId: normalized.statusId,
        }
    }

    protected async toEntity(model: PhoneTypeBaseRepositoryType["Model"]): Promise<PhoneTypeBaseRepositoryType["Entity"]> {
        const normalized = await this.normalizeEntityStatus(model);

        return PhoneTypeEntity.create({
            id: model.id,
            description: model.description,
            status: normalized.status,
        });
    }
}