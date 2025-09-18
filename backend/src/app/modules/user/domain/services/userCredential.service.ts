import {inject, injectable} from "tsyringe";
import {ServiceBase} from "@coreShared/base/service.base";
import {IUserCredentialService} from "@user/domain/services/interface/IUserCredential.service";
import {IUserCredentialRepository} from "@user/infrastructure/repositories/interface/IUserCredential.repository";
import {IStatusService} from "@status/domain/services/interfaces/IStatus.service";
import {LogError} from "@coreShared/decorators/LogError";
import {
    CreateUserCredentialEntityDTO,
    CreateUserCredentialRequestDTO,
    UserCredentialDtoBaseType
} from "@user/adapters/dtos/userCredential.dto";
import {UserCredentialEntity} from "@user/domain/entities/userCredential.entity";
import {Transaction} from "sequelize";
import {UpdateResultType} from "@coreShared/types/crudResult.type";
import {NotFoundError, ValidationError} from "@coreShared/errors/domain.error";
import {EntitiesMessage} from "@coreShared/messages/entities.message";
import {IUserCredentialTypeService} from "@user/domain/services/interface/IUserCredentialType.service";
import {UserCredentialTypeEnum} from "@user/domain/enums/userCredentialType.enum";

@injectable()
export class UserCredentialService extends ServiceBase<UserCredentialDtoBaseType, UserCredentialEntity> implements IUserCredentialService {
    //#region CONSTRUCTOR
    constructor(
        @inject("IUserCredentialRepository") protected readonly repo: IUserCredentialRepository,
        @inject("IUserCredentialTypeService") private readonly userCredentialTypeService: IUserCredentialTypeService,
        @inject('IStatusService') protected readonly statusService: IStatusService,
    ) {
        super(repo, UserCredentialEntity, statusService);
    }

    //#endregion

    @LogError()
    public async create(data: CreateUserCredentialRequestDTO, transaction: Transaction): Promise<UserCredentialEntity> {
        let userCredentialTypeId: number = 0;

        if (data.password) {
            userCredentialTypeId = (await this.userCredentialTypeService.getExactByDescription(UserCredentialTypeEnum.PASSWORD)).id!;
        }

        const createUserCredentialEntityDTO: CreateUserCredentialEntityDTO = {
            ...data,
            userCredentialTypeId,
            statusId: 0,
        }

        return super.create(createUserCredentialEntityDTO, transaction);
    }

    @LogError()
    public async update(newData: UserCredentialDtoBaseType["UpdateDTO"], transaction: Transaction): Promise<UpdateResultType<UserCredentialEntity>> {
        if (newData.newPassword) {
            if (!newData.password) {
                throw new ValidationError(EntitiesMessage.error.validation.oldPasswordRequired);
            }
            const {password, userTypeId} = await this.updatePassword(newData.id, newData.password, newData.newPassword);
            newData.password = password;
            newData.userCredentialTypeId = userTypeId;
        }

        return super.update(newData, transaction);
    }

    @LogError()
    public async isPasswordValid(userCredentialId: number, password: string): Promise<boolean> {
        const userCredential: UserCredentialEntity = await this.getById(userCredentialId);
        const storagePassword: string | undefined = userCredential.password;

        if(!storagePassword) {
            throw new NotFoundError(EntitiesMessage.error.retrieval.noPasswordRegister);
        }

        return await UserCredentialEntity.verifyPassword(storagePassword, password);
    }

    //#region HELPERS
    @LogError()
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

    @LogError()
    protected async createEntity(data: UserCredentialDtoBaseType["CreateDTO"], statusId: number): Promise<UserCredentialEntity> {
        return UserCredentialEntity.create({
            ...data,
            statusId
        });
    }

    @LogError()
    protected async uniquenessValidatorEntity(): Promise<void> {
        return;
    }

    @LogError()
    protected filterTransform(input: UserCredentialDtoBaseType['FilterDTO']): UserCredentialDtoBaseType['FilterDTO'] {
        return input;
    }

    @LogError()
    protected async validateForeignKeys(data: Partial<UserCredentialDtoBaseType["DTO"]>): Promise<void> {
        await Promise.all([
            this.validateExistence("userCredentialTypeId", data.userCredentialTypeId, this.userCredentialTypeService),
            this.validateStatusExistence(data.statusId)
        ]);
    }

    //#endregion
}