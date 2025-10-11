import {inject, injectable} from "tsyringe";
import {PhoneCodeEntity} from "@phone/domain/entities/phoneCode.entity";
import {FindOptions, InferCreationAttributes, ModelStatic} from "sequelize";
import {PhoneCodeModel} from "@phone/infrastructure/models/phoneCode.model";
import {PhoneCodeBaseRepository} from "@phone/adapters/dtos/phoneCode.dto";
import {IPhoneCodeRepository} from "@phone/infrastructure/repositories/interface/IPhoneCode.repository";
import {RepositoryBase} from "@coreShared/base/repository.base";
import {IStatusRepository} from "@status/infrastructure/repositories/IStatusRepository";
import {RelationMapType} from "@coreShared/types/controller.type";
import {IStateRepository} from "@location/infrastructure/repositories/interfaces/IState.repository";
import {NotFoundError} from "@coreShared/errors/domain.error";

@injectable()
export class PhoneCodeRepository extends RepositoryBase<PhoneCodeBaseRepository> implements IPhoneCodeRepository {
    constructor(
        @inject("PhoneCodeModel")
        model: ModelStatic<PhoneCodeModel>,
        @inject('IStateRepository')
        private readonly stateRepository: IStateRepository,
        @inject("IStatusRepository")
        private readonly statusRepository: IStatusRepository,
    ) {
        super(model);
    }

    protected getIncludes(): FindOptions['include'] {
        return [
            {
                association: PhoneCodeModel.associations.state,
                attributes: ['id', 'description'],
            },
            {
                association: PhoneCodeModel.associations.status,
                attributes: ['id', 'description'],
            },

        ];
    }

    protected associationMap(): Partial<Record<keyof PhoneCodeBaseRepository["Filter"], string>> {
        return {
            state: 'state.description',
            status: 'status.description',
        };
    }

    protected filter(): Partial<Record<keyof PhoneCodeBaseRepository["Filter"], {
        in?: boolean;
        like?: boolean
    }>> | undefined {
        return {
            id: {in: true},
            ddiCode: {like: true},
            dddCode: {like: true},
            state: {like: true},
            status: {like: true},
        };
    }

    protected async toPersistence(entity: PhoneCodeBaseRepository["Entity"]): Promise<InferCreationAttributes<PhoneCodeModel>> {
        const relationData = {
            state: entity.state,
            status: entity.status,
        }

        const relations: RelationMapType = {
            state: {idField: 'stateId', filterField: 'description', repo: this.stateRepository},
            status: {idField: 'statusId', filterField: 'description', repo: this.statusRepository},
        }

        const normalized = await this.normalizeRelations(relationData, relations);

        return {
            id: entity.id,
            ddiCode: entity.ddiCode,
            dddCode: entity.dddCode,
            stateId: normalized.stateId,
            statusId: normalized.statusId
        };
    }

    protected async toEntity(model: PhoneCodeBaseRepository["Model"]): Promise<PhoneCodeBaseRepository["Entity"]> {
        const normalized = await this.normalizeEntityStatus(model);

        if (!normalized.state?.description) {
            throw new NotFoundError('Sem estado associado para a cidade');
        }

        return PhoneCodeEntity.create({
            id: model.id,
            ddiCode: model.ddiCode,
            dddCode: model.dddCode,
            state: normalized.state.description,
            status: normalized.status,
        });
    }
}