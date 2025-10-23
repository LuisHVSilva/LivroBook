import {inject, injectable} from "tsyringe";
import {EntityUniquenessValidator} from "@coreShared/validators/entityUniqueness.validator";
import {EntityUniquenessValidatorFactory} from "@coreShared/factories/entityUniquenessValidator.factory";
import {IRepositoryBase} from "@coreShared/base/interfaces/IRepositoryBase";
import {ConflictError, InactiveError, NotFoundError} from "@coreShared/errors/classes.error";
import {EntitiesMessage} from "@coreShared/messages/entities.message";
import {IStatusService} from "@status/domain/services/interfaces/IStatus.service";
import {ServiceBase} from "@coreShared/base/service.base";
import {UserEntity} from "@user/domain/entities/user.entity";
import {IUserService} from "@user/domain/services/interface/IUser.service";
import {UserBaseRepositoryType, UserDtoBaseType} from "@user/adapters/dtos/user.dto";
import {IUserRepository} from "@user/infrastructure/repositories/interface/IUser.repository";
import {IUserTypeService} from "@user/domain/services/interface/IUserType.service";
import {ICityService} from "@location/domain/services/interfaces/ICity.service";
import {IPhoneService} from "@phone/domain/service/interfaces/IPhone.service";
import {ResultType} from "@coreShared/types/result.type";
import {StringUtil} from "@coreShared/utils/string.util";
import {UserTypeTransform} from "@user/domain/transformers/userType.transformer";
import {CityTransformer} from "@location/domain/transformers/city.transform";
import {StatusTransformer} from "@status/domain/transformers/Status.transformer";
import {DocumentTypeTransform} from "@document/domain/transformers/documentType.transform";
import {IDocumentTypeService} from "@document/domain/services/interfaces/IDocumentType.service";
import {Transaction} from "sequelize";

@injectable()
export class UserService extends ServiceBase<UserDtoBaseType, UserEntity> implements IUserService {
    //#region PROPERTIES
    private readonly uniquenessValidator: EntityUniquenessValidator<UserBaseRepositoryType>;
    //#endregion

    //#region CONSTRUCTOR
    constructor(
        @inject("IUserRepository")
        protected readonly repo: IUserRepository,
        @inject("EntityUniquenessValidatorFactory")
        private readonly validatorFactory: EntityUniquenessValidatorFactory,
        @inject("UserRepository")
        private readonly userRepo: IRepositoryBase<UserBaseRepositoryType>,
        @inject('IStatusService')
        protected readonly statusService: IStatusService,
        @inject("IUserTypeService")
        protected readonly userTypeService: IUserTypeService,
        @inject("ICityService")
        protected readonly cityService: ICityService,
        @inject("IPhoneService")
        protected readonly phoneService: IPhoneService,
        @inject("IDocumentTypeService")
        protected readonly documentTypeService: IDocumentTypeService,
    ) {
        super(repo, UserEntity, statusService);
        this.uniquenessValidator = this.validatorFactory(this.userRepo);
    }

    //#endregion

    public async getUserActiveByEmail(email: string): Promise<UserEntity> {
        const founded: ResultType<UserEntity> = await this.repo.findOneByFilter({email});
        const entity: UserEntity | null = founded.unwrapOrNull();

        if (!entity) {
            throw new NotFoundError(EntitiesMessage.error.retrieval.notFound(this.entityClass.name))
        }

        const isActive: boolean = await this.statusService.isEntityActive(entity.status);

        if (!isActive) {
            throw new InactiveError(EntitiesMessage.error.forbidden.inactiveUser);
        }

        return entity;
    }



    protected async createEntity(data: UserDtoBaseType["CreateDTO"], status: string): Promise<UserEntity> {
        return UserEntity.create({
            ...data,
            status
        });
    }


    protected async uniquenessValidatorEntity(entity: UserEntity, previousEntity?: UserEntity): Promise<void> {
        const isUniqueEmail: boolean = await this.uniquenessValidator.validate('email', entity.email, previousEntity);

        if (!isUniqueEmail) {
            throw new ConflictError(EntitiesMessage.error.conflict.duplicateValue(UserEntity.name, 'email'));
        }

        if (entity.document !== undefined) {
            const isUniqueDocument: boolean = await this.uniquenessValidator.validate('document', entity.document, previousEntity);

            if (!isUniqueDocument) {
                throw new ConflictError(EntitiesMessage.error.conflict.duplicateValue(UserEntity.name, 'document'));
            }
        }
    }


    protected filterTransform(input: UserDtoBaseType['FilterDTO']): UserDtoBaseType['FilterDTO'] {
        return StringUtil.applyFilterTransform(input, {
            userType: UserTypeTransform.normalizeDescription,
            documentType: DocumentTypeTransform.normalizeDescription,
            city: CityTransformer.normalizeDescription,
            status: StatusTransformer.normalizeDescription,
        });
    }


    protected async validateForeignKeys(data: Partial<UserDtoBaseType["DTO"]>, transaction?: Transaction): Promise<void> {
        await Promise.all([
            this.validateExistence("phone", data.phone, "number", this.phoneService, true, transaction),
            this.validateExistence("userType", data.userType, "description", this.userTypeService),
            this.validateExistence("city", data.city, "description", this.cityService, true),
            this.validateExistence("documentType", data.documentType, "description", this.documentTypeService, true),
            this.validateStatusExistence(data.status),
        ]);
    }
}
