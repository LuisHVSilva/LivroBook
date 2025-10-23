import {inject, injectable} from "tsyringe";
import {ServiceBase} from "@coreShared/base/service.base";
import {IUserCredentialService} from "@user/domain/services/interface/IUserCredential.service";
import {IUserCredentialRepository} from "@user/infrastructure/repositories/interface/IUserCredential.repository";
import {IStatusService} from "@status/domain/services/interfaces/IStatus.service";
import {UserCredentialDtoBaseType} from "@user/adapters/dtos/userCredential.dto";
import {UserCredentialEntity, UserCredentialProps} from "@user/domain/entities/userCredential.entity";
import {NotFoundError, ValidationError} from "@coreShared/errors/classes.error";
import {EntitiesMessage} from "@coreShared/messages/entities.message";
import {IUserCredentialTypeService} from "@user/domain/services/interface/IUserCredentialType.service";
import {UserCredentialTypeEnum} from "@user/domain/enums/userCredentialType.enum";
import {IUserService} from "@user/domain/services/interface/IUser.service";
import {UserCredentialTypeTransform} from "@user/domain/transformers/userCredentialType.transformer";
import {StatusTransformer} from "@status/domain/transformers/Status.transformer";
import {StringUtil} from "@coreShared/utils/string.util";
import {Transaction} from "sequelize";
import {UserEntity} from "@user/domain/entities/user.entity";
import {ResultType} from "@coreShared/types/result.type";
import {Transactional} from "@coreShared/decorators/Transactional";
import {ErrorMessages} from "@coreShared/messages/errorMessages";

@injectable()
export class UserCredentialService extends ServiceBase<UserCredentialDtoBaseType, UserCredentialEntity> implements IUserCredentialService {
    //#region CONSTRUCTOR
    constructor(
        @inject("IUserCredentialRepository")
        protected readonly repo: IUserCredentialRepository,
        @inject("IUserService")
        private readonly userService: IUserService,
        @inject("IUserCredentialTypeService")
        private readonly userCredentialTypeService: IUserCredentialTypeService,
        @inject('IStatusService')
        protected readonly statusService: IStatusService,
    ) {
        super(repo, UserCredentialEntity, statusService);
    }

    //#endregion
    //
    // public async update(newData: UserCredentialDtoBaseType["UpdateDTO"], transaction: Transaction): Promise<UpdateResultType<UserCredentialEntity>> {
    //     if (newData.newPassword) {
    //         if (!newData.password) {
    //             throw new ValidationError(EntitiesMessage.error.validation.oldPasswordRequired);
    //         }
    //         const {password, userTypeId} = await this.updatePassword(newData.id, newData.password, newData.newPassword);
    //         newData.password = password;
    //         newData.userCredentialTypeId = userTypeId;
    //     }
    //
    //     return super.update(newData, transaction);
    // }


    @Transactional(true)
    public async validateLoginCredential(user: UserEntity, password: string, ip: string, transaction?: Transaction): Promise<ResultType<UserCredentialEntity>> {
        if (!transaction) {
            return ResultType.failure(new Error(ErrorMessages.failure.transactionCreation));
        }

        const userCredential: UserCredentialEntity = await this.findOneByFilter({userEmail: user.email}, true);
        const isPasswordValid: boolean = await this.isPasswordValid(userCredential.id!, password);

        const userCredentialEntityUpdatedProps: Partial<UserCredentialProps> = {
            id: userCredential.id,
            loginAttempts: 0,
            lastLoginIp: ip,
            lastLoginAt: new Date()
        }

        if (!isPasswordValid) {
            userCredentialEntityUpdatedProps.loginAttempts = userCredential.loginAttempts + 1;
            userCredentialEntityUpdatedProps.lastLoginIp = userCredential.lastLoginIp;
            userCredentialEntityUpdatedProps.lastLoginAt = userCredential.lastLoginAt;
        }

        const userCredentialUpdated: UserCredentialEntity = userCredential.update(userCredentialEntityUpdatedProps);
        await this.update({id: userCredentialUpdated.id!, ...userCredentialEntityUpdatedProps}, transaction);

        if (userCredentialUpdated.loginAttempts > UserCredentialEntity.MAX_LOGIN_ATTEMPTS) {
            const inactiveStatus = await this.statusService.getStatusForBlockedEntities();
            const {id, ...userProps} = user.update({status: inactiveStatus.description});
            await this.userService.update({id: id!, ...userProps}, transaction);
            return ResultType.failure(new ValidationError(EntitiesMessage.error.validation.blockedAccount));
        }

        if (!isPasswordValid) {
            return ResultType.failure(new ValidationError(EntitiesMessage.error.validation.invalidPassword));
        }

        return ResultType.success(userCredentialUpdated)
    }


    private async isPasswordValid(userCredentialId: number, password: string): Promise<boolean> {
        const userCredential: UserCredentialEntity = await this.getById(userCredentialId);
        const storagePassword: string | undefined = userCredential.password;

        if (!storagePassword) {
            throw new NotFoundError(EntitiesMessage.error.retrieval.noPasswordRegister);
        }

        return await UserCredentialEntity.verifyPassword(storagePassword, password);
    }

    //#region HELPERS

    private async updatePassword(id: number, oldPassword: string, newPassword: string): Promise<{
        password: string,
        userTypeId: number
    }> {
        const userCredential: UserCredentialEntity = await this.getById(id);

        const isPasswordValid: boolean = await this.isPasswordValid(id, oldPassword);

        if (!isPasswordValid) {
            throw new ValidationError(EntitiesMessage.error.validation.oldPasswordWrong);
        }

        const password: string = await userCredential.changePassword(newPassword);
        const userTypeId: number = (await this.userCredentialTypeService.getExactByDescription(UserCredentialTypeEnum.PASSWORD)).id!;
        return {password, userTypeId};
    }


    protected async createEntity(data: UserCredentialDtoBaseType["CreateDTO"], status: string): Promise<UserCredentialEntity> {
        let userCredentialType: string | undefined;

        if (data.password) {
            userCredentialType = (await this.userCredentialTypeService.getExactByDescription(UserCredentialTypeEnum.PASSWORD)).description;
        }

        if (userCredentialType === undefined) {
            throw new NotFoundError(EntitiesMessage.error.retrieval.notFound("Tipo de credencial"))
        }

        return UserCredentialEntity.create({
            ...data,
            userCredentialType,
            status
        });
    }


    protected async uniquenessValidatorEntity(): Promise<void> {
        return;
    }


    protected filterTransform(input: UserCredentialDtoBaseType['FilterDTO']): UserCredentialDtoBaseType['FilterDTO'] {
        return StringUtil.applyFilterTransform(input, {
            userCredentialType: UserCredentialTypeTransform.normalizeDescription,
            status: StatusTransformer.normalizeDescription,
        });
    }


    protected async validateForeignKeys(data: Partial<UserCredentialDtoBaseType["DTO"]>, transaction?: Transaction): Promise<void> {
        await Promise.all([
            this.validateExistence("userEmail", data.userEmail, 'email', this.userService, false, transaction),
            this.validateExistence("userCredentialType", data.userCredentialType, 'description', this.userCredentialTypeService),
            this.validateStatusExistence(data.status)
        ]);
    }

    //#endregion
}