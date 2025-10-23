import {inject, injectable} from "tsyringe";
import {RepositoryBase} from "@coreShared/base/repository.base";
import {FindOptions, InferCreationAttributes, ModelStatic, Transaction} from "sequelize";
import {
    UserCredentialBaseRepositoryType,
    UserCredentialNormalizedRelations
} from "@user/adapters/dtos/userCredential.dto";
import {IUserCredentialRepository} from "@user/infrastructure/repositories/interface/IUserCredential.repository";
import {UserCredentialModel} from "@user/infrastructure/models/userCredential.model";
import {UserCredentialEntity} from "@user/domain/entities/userCredential.entity";
import {IStatusRepository} from "@status/infrastructure/repositories/IStatusRepository";
import {
    IUserCredentialTypeRepository
} from "@user/infrastructure/repositories/interface/IUserCredentialType.repository";
import {IUserRepository} from "@user/infrastructure/repositories/interface/IUser.repository";
import {RelationMapType} from "@coreShared/types/controller.type";
import {UserCredentialTypeModel} from "@user/infrastructure/models/userCredentialType.model";
import {NotFoundError} from "@coreShared/errors/classes.error";


@injectable()
export class UserCredentialRepository extends RepositoryBase<UserCredentialBaseRepositoryType> implements IUserCredentialRepository {
    constructor(
        @inject("UserCredentialModel")
        model: ModelStatic<UserCredentialModel>,
        @inject("IStatusRepository")
        protected readonly statusRepository: IStatusRepository,
        @inject("IUserCredentialTypeRepository")
        protected readonly userCredentialTypeRepository: IUserCredentialTypeRepository,
        @inject("IUserRepository")
        protected readonly userRepository: IUserRepository,
    ) {
        super(model);
    }

    protected getIncludes(): FindOptions['include'] {
        return [
            {
                association: UserCredentialModel.associations.user,
                attributes: ['id', 'email', 'isTwoFactorEnable', 'isEmailVerified'],
                required: true
            },
            {
                association: UserCredentialModel.associations.userCredentialType,
                attributes: ['id', 'description'],
                required: true
            },
            {
                association: UserCredentialTypeModel.associations.status,
                attributes: ['id', 'description'],
                required: true
            },
        ];
    }

    protected associationMap(): Partial<Record<keyof UserCredentialBaseRepositoryType["Filter"], string>> {
        return {
            userEmail: "user.email",
            userCredentialType: "userCredentialType.description",
            status: "status.description",
        };
    }

    protected filter(): Partial<Record<keyof UserCredentialBaseRepositoryType["Filter"], {
        in?: boolean;
        like?: boolean
    }>> | undefined {
        return {
            id: {in: true},
            userEmail: {like: true},
            password: {like: true},
            loginAttempts: {in: true},
            lastLoginIP: {like: true},
            lastLoginAt: {in: true},
            userCredentialType: {like: true},
            status: {like: true},
        };
    }

    protected async toPersistence(entity: UserCredentialBaseRepositoryType["Entity"], transaction?: Transaction): Promise<InferCreationAttributes<UserCredentialModel>> {
        const relationData = {
            userEmail: entity.userEmail,
            userCredentialType: entity.userCredentialType,
            status: entity.status,
        }

        const relations: RelationMapType = {
            userEmail: {idField: 'userId', filterField: 'email', repo: this.userRepository},
            userCredentialType: {
                idField: 'userCredentialTypeId',
                filterField: 'description',
                repo: this.userCredentialTypeRepository
            },
            status: {idField: 'statusId', filterField: 'description', repo: this.statusRepository},
        }


        const normalized: UserCredentialNormalizedRelations = await this.normalizeRelations(relationData, relations, transaction);

        return {
            id: entity.id,
            userId: normalized.userId,
            password: entity.password,
            loginAttempts: entity.loginAttempts,
            lastLoginIp: entity.lastLoginIp,
            lastLoginAt: entity.lastLoginAt,
            userCredentialTypeId: normalized.userCredentialTypeId,
            statusId: normalized.statusId
        };
    }

    protected async toEntity(model: UserCredentialBaseRepositoryType["Model"]): Promise<UserCredentialBaseRepositoryType["Entity"]> {
        const normalized = await this.normalizeEntityStatus(model);

        if (!normalized.user.email) {
            throw new NotFoundError('Sem email associado para a credencial de usuário');
        }

        if (!normalized.userCredentialType.description) {
            throw new NotFoundError('Sem tipo de credencial associado para a credencial de usuário');
        }

        return UserCredentialEntity.rehydrate({
            id: model.id,
            userEmail: normalized.user.email,
            password: model.password,
            loginAttempts: model.loginAttempts,
            lastLoginIp: model.lastLoginIp,
            lastLoginAt: model.lastLoginAt,
            userCredentialType: normalized.userCredentialType.description,
            status: normalized.status,
        });
    }
}