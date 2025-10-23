import {inject, injectable} from "tsyringe";
import {FindOptions, InferCreationAttributes, ModelStatic} from "sequelize";
import {IPhoneRepository} from "@phone/infrastructure/repositories/interface/IPhone.repository";
import {PhoneBaseRepositoryType, PhoneNormalizedRelations} from "@phone/adapters/dtos/phone.dto";
import {PhoneModel} from "@phone/infrastructure/models/phone.model";
import {RepositoryBase} from "@coreShared/base/repository.base";
import {PhoneEntity} from "@phone/domain/entities/phone.entity";
import {IStatusRepository} from "@status/infrastructure/repositories/IStatusRepository";
import {RelationMapType} from "@coreShared/types/controller.type";
import {IPhoneCodeRepository} from "@phone/infrastructure/repositories/interface/IPhoneCode.repository";
import {IPhoneTypeRepository} from "@phone/infrastructure/repositories/interface/IPhoneType.repository";
import {NotFoundError} from "@coreShared/errors/classes.error";

@injectable()
export class PhoneRepository extends RepositoryBase<PhoneBaseRepositoryType> implements IPhoneRepository {
    constructor(
        @inject("PhoneModel")
        model: ModelStatic<PhoneModel>,
        @inject("IStatusRepository")
        protected readonly statusRepository: IStatusRepository,
        @inject("IPhoneCodeRepository")
        protected readonly phoneCodeRepository: IPhoneCodeRepository,
        @inject("IPhoneTypeRepository")
        protected readonly phoneTypeRepository: IPhoneTypeRepository,
    ) {
        super(model);
    }

    protected getIncludes(): FindOptions['include'] {
        return [
            {
                association: PhoneModel.associations.phoneCode,
                attributes: ['id', 'ddiCode', 'dddCode'],
            },
            {
                association: PhoneModel.associations.phoneType,
                attributes: ['id', 'description'],
            },
            {
                association: PhoneModel.associations.status,
                attributes: ['id', 'description'],
            },
        ];
    }

    protected associationMap(): Partial<Record<keyof PhoneBaseRepositoryType["Filter"], string>> {
        return {
            phoneCodeDdiCode: "phoneCode.ddiCode",
            phoneCodeDddCode: "phoneCode.dddCode",
            phoneType: "phoneType.description",
            status: "status.description",
        };
    }

    protected filter(): Partial<Record<keyof PhoneBaseRepositoryType["Filter"], {
        in?: boolean;
        like?: boolean
    }>> | undefined {
        return {
            id: {in: true},
            phoneCodeDdiCode: {in: true},
            phoneCodeDddCode: {in: true},
            phoneType: {like: true},
            status: {like: true},
        };
    }

    protected async toPersistence(entity: PhoneBaseRepositoryType["Entity"]): Promise<InferCreationAttributes<PhoneModel>> {
        const relationData = {
            phoneCode: entity.phoneCode,
            phoneType: entity.phoneType,
            status: entity.status,
        }

        const relations: RelationMapType = {
            phoneCode: {
                idField: 'phoneCodeId',
                filterField: ['dddCode', 'ddiCode'],
                repo: this.phoneCodeRepository
            },
            phoneType: {idField: 'phoneTypeId', filterField: 'description', repo: this.phoneTypeRepository},
            status: {idField: 'statusId', filterField: 'description', repo: this.statusRepository},
        }


        const normalized: PhoneNormalizedRelations = await this.normalizeRelations(relationData, relations);

        return {
            id: entity.id,
            number: entity.number,
            phoneCodeId: normalized.phoneCodeId,
            phoneTypeId: normalized.phoneTypeId,
            statusId: normalized.statusId
        };
    }

    protected async toEntity(model: PhoneBaseRepositoryType["Model"]): Promise<PhoneBaseRepositoryType["Entity"]> {
        const normalized = await this.normalizeEntityStatus(model);

        if (!normalized.phoneType?.description) {
            throw new NotFoundError('Sem phoneType associado para a telefone');
        }

        if (!normalized.phoneCode?.dddCode) {
            throw new NotFoundError('Sem dddCode associado para a telefone');
        }

        if (!normalized.phoneCode?.ddiCode) {
            throw new NotFoundError('Sem ddiCode associado para a telefone');
        }

        return PhoneEntity.create({
            id: model.id,
            number: model.number,
            phoneCode: {
                dddCode: normalized.phoneCode.dddCode,
                ddiCode: normalized.phoneCode.ddiCode,
            },
            phoneType: normalized.phoneType.description,
            status: normalized.status,
        });
    }
}