import {inject, injectable} from "tsyringe";
import {ControllerBase} from "@coreShared/base/controller.base";
import {UserTypeAbstractControllerBaseType} from "@user/adapters/dtos/userType.dto";
import {IUserTypeController} from "@user/adapters/controllers/interfaces/IUserType.controller";
import {ICreateUserTypeUseCase} from "@user/useCases/create/createUserType/ICreateUserType.useCase";
import {IFindUserTypeByIdUseCase} from "@user/useCases/read/findUserTypeById/IFindUserTypeById.useCase";
import {IFindUserTypesUseCase} from "@user/useCases/read/findUserTypes/IFindUserTypes.useCase";
import {IUpdateUserTypeUseCase} from "@user/useCases/update/updateUserType/IUpdateUserType.useCase";
import {IDeleteUserTypeUseCase} from "@user/useCases/delete/deleteUserTypes/IDeleteUserType.useCase";


@injectable()
export class UserTypeController extends ControllerBase<UserTypeAbstractControllerBaseType> implements IUserTypeController {
    constructor(
        @inject("ICreateUserTypeUseCase")
        protected readonly createUserTypeUseCase: ICreateUserTypeUseCase,
        @inject("IFindUserTypeByIdUseCase")
        protected readonly findUserTypeByIdUseCase: IFindUserTypeByIdUseCase,
        @inject("IFindUserTypesUseCase")
        protected readonly findUserTypesUseCase: IFindUserTypesUseCase,
        @inject("IUpdateUserTypeUseCase")
        protected readonly updateUserTypeUseCase: IUpdateUserTypeUseCase,
        @inject("IDeleteUserTypeUseCase")
        protected readonly deleteUserTypeUseCase: IDeleteUserTypeUseCase,
    ) {
        super(
            createUserTypeUseCase,
            findUserTypeByIdUseCase,
            findUserTypesUseCase,
            updateUserTypeUseCase,
            deleteUserTypeUseCase
        )
    }
}