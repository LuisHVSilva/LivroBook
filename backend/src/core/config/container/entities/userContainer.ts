import {container} from "tsyringe";
import {EntityUniquenessValidator} from "@coreShared/validators/entityUniqueness.validator";
import {IRepositoryBase} from "@coreShared/base/interfaces/IRepositoryBase";
import {ModelStatic} from "sequelize";
import {IUserTypeService} from "@user/domain/services/interface/IUserType.service";
import {UserTypeService} from "@user/domain/services/userType.service";
import {ICreateUserTypeUseCase} from "@user/useCases/createUserType/ICreateUserType.useCase";
import {CreateUserTypeUseCase} from "@user/useCases/createUserType/createUserType.useCase";
import {UserTypeModel} from "@user/infrastructure/models/userType.model";
import {IUserTypeRepository} from "@user/infrastructure/repositories/interface/IUserType.repository";
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
import {IUserCredentialTypeRepository} from "@user/infrastructure/repositories/interface/IUserCredentialType.repository";
import {UserCredentialTypeRepository} from "@user/infrastructure/repositories/userCredentialType.repository";
import {IUserCredentialTypeService} from "@user/domain/services/interface/IUserCredentialType.service";
import {UserCredentialTypeService} from "@user/domain/services/userCredentialType.service";
import {UserTypeBaseRepositoryType} from "@user/adapters/dtos/userType.dto";
import {UserCredentialTypeBaseRepositoryType} from "@user/adapters/dtos/userCredentialType.dto";
import {IUserCredentialService} from "@user/domain/services/interface/IUserCredential.service";
import {UserCredentialService} from "@user/domain/services/userCredential.service";
import {IUpdateUserCredentialUseCase} from "@user/useCases/updateUserCredential/IUpdateUserCredential.useCase";
import {UpdateUserCredentialUseCase} from "@user/useCases/updateUserCredential/updateUserCredential.useCase";
import {UserCredentialRepository} from "@user/infrastructure/repositories/userCredential.repository";
import {UserCredentialModel} from "@user/infrastructure/models/userCredential.model";
import {IUserCredentialRepository} from "@user/infrastructure/repositories/interface/IUserCredential.repository";
import {CreateUserCredentialUseCase} from "@user/useCases/createUserCredential/createUserCredential.useCase";
import {ICreateUserCredentialUseCase} from "@user/useCases/createUserCredential/ICreateUserCredential.useCase";
import {ICreateUserUseCase} from "@user/useCases/createUser/ICreateUser.useCase";
import {CreateUserUseCase} from "@user/useCases/createUser/createUser.useCase";
import {UserModel} from "@user/infrastructure/models/user.model";
import {UserRepository} from "@user/infrastructure/repositories/user.repository";
import {IUserRepository} from "@user/infrastructure/repositories/interface/IUser.repository";
import {UserBaseRepositoryType} from "@user/adapters/dtos/user.dto";
import {IUserService} from "@user/domain/services/interface/IUser.service";
import {UserService} from "@user/domain/services/user.service";
import {DeleteUserCredentialUseCase} from "@user/useCases/deleteUserCredential/deleteUserCredential.useCase";
import {IDeleteUserCredentialUseCase} from "@user/useCases/deleteUserCredential/IDeleteUserCredential.useCase";
import {IFindUsersUseCase} from "@user/useCases/findUsers/IFindUsers.useCase";
import {IUpdateUserUseCase} from "@user/useCases/updateUser/IUpdateUser.useCase";
import {IDeleteUserUseCase} from "@user/useCases/deleteUser/IDeleteUser.useCase";
import {FindUsersUseCase} from "@user/useCases/findUsers/findUsers.useCase";
import {UpdateUserUseCase} from "@user/useCases/updateUser/updateUser.useCase";
import {DeleteUserUseCase} from "@user/useCases/deleteUser/deleteUser.useCase";

//#region Services
container.registerSingleton<IUserTypeService>("IUserTypeService", UserTypeService);
container.registerSingleton<IUserCredentialTypeService>("IUserCredentialTypeService", UserCredentialTypeService);
container.registerSingleton<IUserCredentialService>("IUserCredentialService", UserCredentialService);
container.registerSingleton<IUserService>("IUserService", UserService);
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

container.registerSingleton<ICreateUserCredentialUseCase>("ICreateUserCredentialUseCase", CreateUserCredentialUseCase);
container.registerSingleton<IUpdateUserCredentialUseCase>("IUpdateUserCredentialUseCase", UpdateUserCredentialUseCase);
container.registerSingleton<IDeleteUserCredentialUseCase>("IDeleteUserCredentialUseCase", DeleteUserCredentialUseCase);

container.registerSingleton<ICreateUserUseCase>("ICreateUserUseCase", CreateUserUseCase);
container.registerSingleton<IFindUsersUseCase>("IFindUsersUseCase", FindUsersUseCase);
container.registerSingleton<IUpdateUserUseCase>("IUpdateUserUseCase", UpdateUserUseCase);
container.registerSingleton<IDeleteUserUseCase>("IDeleteUserUseCase", DeleteUserUseCase);
// #endregion

//#region Infrastructure
container.register<ModelStatic<UserTypeModel>>("UserTypeModel", {useValue: UserTypeModel});
container.registerSingleton<IUserTypeRepository>("IUserTypeRepository", UserTypeRepository);

container.register<ModelStatic<UserCredentialTypeModel>>("UserCredentialTypeModel", {useValue: UserCredentialTypeModel});
container.registerSingleton<IUserCredentialTypeRepository>("IUserCredentialTypeRepository", UserCredentialTypeRepository);

container.register<ModelStatic<UserCredentialModel>>("UserCredentialModel", {useValue: UserCredentialModel});
container.registerSingleton<IUserCredentialRepository>("IUserCredentialRepository", UserCredentialRepository);

container.register<ModelStatic<UserModel>>("UserModel", {useValue: UserModel});
container.registerSingleton<IUserRepository>("IUserRepository", UserRepository);
//#endregion

//#region Adapters
container.registerSingleton<IUserController>("IUserController", UserController);
//#endregion

//#region Validators
container.registerSingleton<EntityUniquenessValidator<UserTypeBaseRepositoryType>>("UserTypeUniquenessValidator", EntityUniquenessValidator);
container.registerSingleton<IRepositoryBase<UserTypeBaseRepositoryType>>("UserTypeRepository", UserTypeRepository);

container.registerSingleton<EntityUniquenessValidator<UserCredentialTypeBaseRepositoryType>>("UserCredentialTypeUniquenessValidator", EntityUniquenessValidator);
container.registerSingleton<IRepositoryBase<UserCredentialTypeBaseRepositoryType>>("UserCredentialTypeRepository", UserCredentialTypeRepository);

container.registerSingleton<EntityUniquenessValidator<UserBaseRepositoryType>>("UserUniquenessValidator", EntityUniquenessValidator);
container.registerSingleton<IRepositoryBase<UserBaseRepositoryType>>("UserRepository", UserRepository);
//#endregion

export {container};
