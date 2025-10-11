import {inject, injectable} from "tsyringe";
import {ControllerBase} from "@coreShared/base/controller.base";
import {UserCredentialTypeAbstractControllerBaseType} from "@user/adapters/dtos/userCredentialType.dto";
import {IUserCredentialTypeController} from "@user/adapters/controllers/interfaces/IUserCredentialType.controller";
import {
    ICreateUserCredentialTypeUseCase
} from "@user/useCases/create/createUserCredentialType/ICreateUserCredentialType.useCase";
import {
    IFindUserCredentialTypeByIdUseCase
} from "@user/useCases/read/findUserCredentialTypeById/IFindUserCredentialTypeById.useCase";
import {
    IFindUserCredentialTypesUseCase
} from "@user/useCases/read/findUserCredentialTypes/IFindUserCredentialTypes.useCase";
import {
    IUpdateUserCredentialTypeUseCase
} from "@user/useCases/update/updateUserCredentialType/IUpdateUserCredentialType.useCase";
import {
    IDeleteUserCredentialTypeUseCase
} from "@user/useCases/delete/deleteUserCredentialType/IDeleteUserCredentialType.useCase";


@injectable()
export class UserCredentialTypeController extends ControllerBase<UserCredentialTypeAbstractControllerBaseType> implements IUserCredentialTypeController {
    constructor(
        @inject("ICreateUserCredentialTypeUseCase")
        protected readonly createUserCredentialTypeUseCase: ICreateUserCredentialTypeUseCase,
        @inject("IFindUserCredentialTypeByIdUseCase")
        protected readonly findUserCredentialTypeByIdUseCase: IFindUserCredentialTypeByIdUseCase,
        @inject("IFindUserCredentialTypesUseCase")
        protected readonly findUserCredentialTypesUseCase: IFindUserCredentialTypesUseCase,
        @inject("IUpdateUserCredentialTypeUseCase")
        protected readonly updateUserCredentialTypeUseCase: IUpdateUserCredentialTypeUseCase,
        @inject("IDeleteUserCredentialTypeUseCase")
        protected readonly deleteUserCredentialTypeUseCase: IDeleteUserCredentialTypeUseCase,
    ) {
        super(
            createUserCredentialTypeUseCase,
            findUserCredentialTypeByIdUseCase,
            findUserCredentialTypesUseCase,
            updateUserCredentialTypeUseCase,
            deleteUserCredentialTypeUseCase
        )
    }
}