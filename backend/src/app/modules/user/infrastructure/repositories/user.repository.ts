import {inject, injectable} from "tsyringe";
import {RepositoryBase} from "@coreShared/base/repository.base";
import {FindOptions, Includeable, InferCreationAttributes, ModelStatic, Transaction} from "sequelize";
import {UserBaseRepositoryType, UserNormalizedRelations} from "@user/adapters/dtos/user.dto";
import {IUserRepository} from "@user/infrastructure/repositories/interface/IUser.repository";
import {UserModel} from "@user/infrastructure/models/user.model";
import {UserEntity} from "@user/domain/entities/user.entity";
import {IStatusRepository} from "@status/infrastructure/repositories/IStatusRepository";
import {UserCredentialModel} from "@user/infrastructure/models/userCredential.model";
import {PhoneModel} from "@phone/infrastructure/models/phone.model";
import {RelationMapType} from "@coreShared/types/controller.type";
import {IUserTypeRepository} from "@user/infrastructure/repositories/interface/IUserType.repository";
import {ICityRepository} from "@location/infrastructure/repositories/interfaces/ICity.repository";
import {IDocumentTypeRepository} from "@document/infrastructure/repositories/interface/IDocumentType.repository";
import {IPhoneRepository} from "@phone/infrastructure/repositories/interface/IPhone.repository";
import {NotFoundError} from "@coreShared/errors/classes.error";

@injectable()
export class UserRepository extends RepositoryBase<UserBaseRepositoryType> implements IUserRepository {
    constructor(
        @inject("UserModel")
        model: ModelStatic<UserModel>,
        @inject("IStatusRepository")
        protected readonly statusRepository: IStatusRepository,
        @inject("IUserTypeRepository")
        protected readonly userTypeRepository: IUserTypeRepository,
        @inject("ICityRepository")
        protected readonly cityRepository: ICityRepository,
        @inject("IDocumentTypeRepository")
        protected readonly documentTypeRepository: IDocumentTypeRepository,
        @inject("IPhoneRepository")
        protected readonly phoneRepository: IPhoneRepository,
    ) {
        super(model);
    }

    private getPhoneInclude(): Includeable {
        return {
            association: UserModel.associations.phone,
            attributes: ['id', 'number'],
            include: [{
                association: PhoneModel.associations.phoneCode,
                attributes: ['id', 'ddiCode', 'dddCode'],
            }],
        };
    }

    private getUserCredentialInclude(): Includeable {
        return {
            association: UserModel.associations.userCredential,
            attributes: ['id', 'loginAttempts', 'lastLoginAt'],
            include: [{
                association: UserCredentialModel.associations.userCredentialType,
                attributes: ['id', 'description'],
            }],
        };
    }


    protected override getIncludes(): FindOptions['include'] {
        return [
            {
                association: UserModel.associations.userType,
                attributes: ['id', 'description'],
                required: true
            },
            {
                association: UserModel.associations.city,
                attributes: ['id', 'description']
            },
            {
                association: UserModel.associations.documentType,
                attributes: ['id', 'description']
            },
            {
                association: UserModel.associations.status,
                attributes: ['id', 'description'],
                required: true
            },
            this.getPhoneInclude(),
            this.getUserCredentialInclude(),
        ];
    }


    protected associationMap(): Partial<Record<keyof UserBaseRepositoryType["Filter"], string>> {
        return {
            userType: "userType.description",
            city: "city.description",
            documentType: "documentType.description",
            phone: "phone.number",
            status: "status.description",
        };
    }

    protected filter(): Partial<Record<keyof UserBaseRepositoryType["Filter"], {
        in?: boolean;
        like?: boolean
    }>> | undefined {
        return {
            id: {in: true},
            name: {like: true},
            email: {like: true},
            document: {like: true},
            birthday: {in: true},
            isTwoFactorEnable: {in: true},
            isEmailVerified: {in: true},
            userType: {like: true},
            city: {like: true},
            documentType: {like: true},
            phone: {like: true},
            status: {like: true},
        };
    }

    protected async toPersistence(entity: UserBaseRepositoryType["Entity"], transaction?: Transaction): Promise<InferCreationAttributes<UserModel>> {
        const relationData = {
            userType: entity.userType,
            city: entity.city,
            documentType: entity.documentType,
            phone: entity.phone,
            status: entity.status,
        }

        const relations: RelationMapType = {
            userType: {idField: 'userTypeId', filterField: 'description', repo: this.userTypeRepository},
            city: {idField: 'cityId', filterField: 'description', repo: this.cityRepository},
            documentType: {idField: 'documentTypeId', filterField: 'description', repo: this.documentTypeRepository},
            phone: {idField: 'phoneId', filterField: 'number', repo: this.phoneRepository},
            status: {idField: 'statusId', filterField: 'description', repo: this.statusRepository},
        }


        const normalized: UserNormalizedRelations = await this.normalizeRelations(relationData, relations, transaction);

        return {
            id: entity.id,
            name: entity.name,
            email: entity.email,
            document: entity.document,
            birthday: entity.birthday,
            isTwoFactorEnable: entity.isTwoFactorEnable,
            isEmailVerified: entity.isEmailVerified,
            userTypeId: normalized.userTypeId,
            cityId: normalized.cityId,
            documentTypeId: normalized.documentTypeId,
            phoneId: normalized.phoneId,
            statusId: normalized.statusId,
        };
    }

    protected async toEntity(model: UserBaseRepositoryType["Model"]): Promise<UserBaseRepositoryType["Entity"]> {
        const normalized = await this.normalizeEntityStatus(model);

        if (!normalized.userType.description) {
            throw new NotFoundError('Sem tipo de usuário associado para usuário');
        }

        return UserEntity.rehydrate({
            id: model.id,
            name: model.name,
            email: model.email,
            document: model.document,
            birthday: model.birthday,
            isEmailVerified: model.isEmailVerified,
            isTwoFactorEnable: model.isTwoFactorEnable,
            userType: normalized.userType.description,
            city: normalized.city?.description ?? "",
            documentType: normalized.documentType?.description  ?? "",
            phone: normalized.phone?.number.toString() ?? "",
            status: normalized.status
        });
    }
}