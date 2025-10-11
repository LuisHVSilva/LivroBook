import {inject, injectable} from "tsyringe";
import {IUserController} from "@user/adapters/controllers/interfaces/IUser.controller";
import {IUserTypeController} from "@user/adapters/controllers/interfaces/IUserType.controller";
import {IUserCredentialTypeController} from "@user/adapters/controllers/interfaces/IUserCredentialType.controller";
import {ICreateUserUseCase} from "@user/useCases/create/createUser/ICreateUser.useCase";
import {IFindUserByIdUseCase} from "@user/useCases/read/findUserById/IFindUserById.useCase";
import {IFindUsersUseCase} from "@user/useCases/read/findUsers/IFindUsers.useCase";
import {IUpdateUserUseCase} from "@user/useCases/update/updateUser/IUpdateUser.useCase";
import {IDeleteUserUseCase} from "@user/useCases/delete/deleteUser/IDeleteUser.useCase";
import {ControllerBase} from "@coreShared/base/controller.base";
import {UserAbstractControllerBaseType} from "@user/adapters/dtos/user.dto";

@injectable()
export class UserController extends ControllerBase<UserAbstractControllerBaseType> implements IUserController {
    //#region CONSTRUCTOR
    constructor(
        @inject("IUserTypeController")
        public readonly userTypeController: IUserTypeController,
        @inject("IUserCredentialTypeController")
        public readonly userCredentialTypeController: IUserCredentialTypeController,
          @inject("ICreateUserUseCase")
        protected readonly createUserUseCase: ICreateUserUseCase,
        @inject("IFindUserByIdUseCase")
        protected readonly findUserByIdUseCase: IFindUserByIdUseCase,
        @inject("IFindUsersUseCase")
        protected readonly findUsersUseCase: IFindUsersUseCase,
        @inject("IUpdateUserUseCase")
        protected readonly updateUserUseCase: IUpdateUserUseCase,
        @inject("IDeleteUserUseCase")
        protected readonly deleteUserUseCase: IDeleteUserUseCase,
    ) {
        super(
            createUserUseCase,
            findUserByIdUseCase,
            findUsersUseCase,
            updateUserUseCase,
            deleteUserUseCase
        )
    }

}