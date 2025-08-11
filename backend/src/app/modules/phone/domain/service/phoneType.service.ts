import {inject, injectable} from "tsyringe";
import {IPhoneTypeService} from "@phone/domain/service/interfaces/IPhoneType.service";
import {EntityUniquenessValidator} from "@coreShared/validators/entityUniqueness.validator";
import {EntityUniquenessValidatorFactory} from "@coreShared/factories/entityUniquenessValidator.factory";
import {IBaseRepository} from "@coreShared/interfaces/IBaseRepository";
import {IStatusService} from "@status/domain/services/interfaces/IStatus.service";
import {PhoneTypeEntity} from "@phone/domain/entities/phoneType.entity";
import {PhoneTypeModel} from "@phone/infrastructure/models/phoneType.model";
import {CreatePhoneTypeDTO, PhoneTypeDTO} from "@phone/adapters/dtos/phoneType.dto";
import {IPhoneTypeRepository} from "@phone/infrastructure/repositories/interface/IPhoneType.repository";
import {LogError} from "@coreShared/decorators/LogError";
import {Transaction} from "sequelize";
import {CreateResultType} from "@coreShared/types/crudResult.type";
import {StatusEntity} from "@status/domain/entities/status.entity";
import {ConflictError} from "@coreShared/errors/domain.error";
import {EntitiesMessage} from "@coreShared/messages/entities.message";

@injectable()
export class PhoneTypeService implements IPhoneTypeService {
    //#region PROPERTIES
    private readonly uniquenessValidator: EntityUniquenessValidator<PhoneTypeEntity, PhoneTypeModel, PhoneTypeDTO>;
    private readonly DESCRIPTION: string = 'description';
    private readonly PHONE_TYPE: string = PhoneTypeEntity.ENTITY_NAME;
    //#endregion

    //#region CONSTRUCTOR
    constructor(
        @inject("IPhoneTypeRepository") private readonly repo: IPhoneTypeRepository,
        @inject("EntityUniquenessValidatorFactory") validatorFactory: EntityUniquenessValidatorFactory,
        @inject("PhoneTypeRepository") phoneTypeRepository: IBaseRepository<PhoneTypeEntity, PhoneTypeModel, PhoneTypeDTO>,
        @inject('IStatusService') private readonly statusService: IStatusService,
    ) {
        this.uniquenessValidator = validatorFactory(phoneTypeRepository);
    }
    //#endregion

    @LogError()
    async create(data: CreatePhoneTypeDTO, transaction: Transaction): Promise<CreateResultType<PhoneTypeEntity>> {
        const status: StatusEntity = await this.statusService.getStatusForNewEntities();
        const statusId: number = status.id!;

        const entity: PhoneTypeEntity = PhoneTypeEntity.create({
            description: data.description,
            statusId: statusId
        });

        const isUnique: boolean = await this.uniquenessValidator.validate('description', entity.description);

        if (!isUnique) {
            throw new ConflictError(EntitiesMessage.error.conflict.duplicateValue(this.PHONE_TYPE, this.DESCRIPTION));
        }

        const created: PhoneTypeEntity = (await this.repo.create(entity, transaction)).unwrapOrThrow();

        return {entity: created, created: true};
    }
}