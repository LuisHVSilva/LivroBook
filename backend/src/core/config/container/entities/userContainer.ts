import {container} from "tsyringe";
import {EntityUniquenessValidator} from "@coreShared/validators/entityUniqueness.validator";
import {IRepositoryBase} from "@coreShared/base/interfaces/IRepositoryBase";
import {ModelStatic} from "sequelize";
import {IUserTypeService} from "@user/domain/services/interface/IUserType.service";
import {UserTypeService} from "@user/domain/services/userType.service";
import {ICreateUserTypeUseCase} from "@user/useCases/createUserType/ICreateUserType.useCase";
import {CreateUserTypeUseCase} from "@user/useCases/createUserType/createUserType.useCase";
import {UserTypeModel} from "@user/infrastructure/models/userType.model";
import {
    IUserTypeRepository,
    UserTypeBaseRepositoryType
} from "@user/infrastructure/repositories/interface/IUserType.repository";
import {UserTypeRepository} from "@user/infrastructure/repositories/userType.repository";
import {IUserController} from "@user/adapters/controllers/IUser.controller";
import {UserController} from "@user/adapters/controllers/user.controller";
import {IFindUserTypesUseCase} from "@user/useCases/findUserTypes/IFindUserTypes.useCase";
import {FindUserTypesUseCase} from "@user/useCases/findUserTypes/findUserTypes.useCase";
import {IUpdateUserTypeUseCase} from "@user/useCases/updateUserType/IUpdateUserType.useCase";
import {UpdateUserTypeUseCase} from "@user/useCases/updateUserType/updateUserType.useCase";
import {IDeleteUserTypeUseCase} from "@user/useCases/deleteUserTypes/IDeleteUserType.useCase";
import {DeleteUserTypeUseCase} from "@user/useCases/deleteUserTypes/deleteUserType.useCase";
import {
    ICreateUserCredentialTypeUseCase
} from "@user/useCases/createUserCredentialType/ICreateUserCredentialType.useCase";
import {
    CreateUserCredentialTypeUseCase
} from "@user/useCases/createUserCredentialType/createUserCredentialType.useCase";
import {IFindUserCredentialTypesUseCase} from "@user/useCases/findUserCredentialTypes/IFindUserCredentialTypes.useCase";
import {FindUserCredentialTypesUseCase} from "@user/useCases/findUserCredentialTypes/findUserCredentialTypes.useCase";
import {
    UpdateUserCredentialTypeUseCase
} from "@user/useCases/updateUserCredentialType/updateUserCredentialType.useCase";
import {
    IUpdateUserCredentialTypeUseCase
} from "@user/useCases/updateUserCredentialType/IUpdateUserCredentialType.useCase";
import {
    IDeleteUserCredentialTypesUseCase
} from "@user/useCases/deleteUserCredentialTypes/IDeleteUserCredentialTypes.useCase";
import {
    DeleteUserCredentialTypesUseCase
} from "@user/useCases/deleteUserCredentialTypes/deleteUserCredentialTypes.useCase";
import {UserCredentialTypeModel} from "@user/infrastructure/models/userCredentialType.model";
import {
    IUserCredentialTypeRepository, UserCredentialTypeBaseRepositoryType
} from "@user/infrastructure/repositories/interface/IUserCredentialType.repository";
import {UserCredentialTypeRepository} from "@user/infrastructure/repositories/userCredentialType.repository";
import {IUserCredentialTypeService} from "@user/domain/services/interface/IUserCredentialType.service";
import {UserCredentialTypeService} from "@user/domain/services/userCredentialType.service";

//#region Services
container.registerSingleton<IUserTypeService>("IUserTypeService", UserTypeService);
container.registerSingleton<IUserCredentialTypeService>("IUserCredentialTypeService", UserCredentialTypeService);
//#endregion

//#region UseCases
container.registerSingleton<ICreateUserTypeUseCase>("ICreateUserTypeUseCase", CreateUserTypeUseCase);
container.registerSingleton<IFindUserTypesUseCase>("IFindUserTypesUseCase", FindUserTypesUseCase);
container.registerSingleton<IUpdateUserTypeUseCase>("IUpdateUserTypeUseCase", UpdateUserTypeUseCase);
container.registerSingleton<IDeleteUserTypeUseCase>("IDeleteUserTypeUseCase", DeleteUserTypeUseCase);

container.registerSingleton<ICreateUserCredentialTypeUseCase>("ICreateUserCredentialTypeUseCase", CreateUserCredentialTypeUseCase);
container.registerSingleton<IFindUserCredentialTypesUseCase>("IFindUserCredentialTypesUseCase", FindUserCredentialTypesUseCase);
container.registerSingleton<IUpdateUserCredentialTypeUseCase>("IUpdateUserCredentialTypeUseCase", UpdateUserCredentialTypeUseCase);
container.registerSingleton<IDeleteUserCredentialTypesUseCase>("IDeleteUserCredentialTypesUseCase", DeleteUserCredentialTypesUseCase);
// #endregion

//#region Infrastructure
container.register<ModelStatic<UserTypeModel>>("UserTypeModel", {useValue: UserTypeModel});
container.registerSingleton<IUserTypeRepository>("IUserTypeRepository", UserTypeRepository);

container.register<ModelStatic<UserCredentialTypeModel>>("UserCredentialTypeModel", {useValue: UserCredentialTypeModel});
container.registerSingleton<IUserCredentialTypeRepository>("IUserCredentialTypeRepository", UserCredentialTypeRepository);
//#endregion

//#region Adapters
container.registerSingleton<IUserController>("IUserController", UserController);
//#endregion

//#region Validators
container.registerSingleton<EntityUniquenessValidator<UserTypeBaseRepositoryType>>("UserTypeUniquenessValidator", EntityUniquenessValidator);
container.registerSingleton<IRepositoryBase<UserTypeBaseRepositoryType>>("UserTypeRepository", UserTypeRepository);

container.registerSingleton<EntityUniquenessValidator<UserCredentialTypeBaseRepositoryType>>("UserCredentialTypeUniquenessValidator", EntityUniquenessValidator);
container.registerSingleton<IRepositoryBase<UserCredentialTypeBaseRepositoryType>>("UserCredentialTypeRepository", UserCredentialTypeRepository);
//#endregion

export {container};
