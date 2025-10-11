import {container} from "tsyringe";
import {EntityUniquenessValidator} from "@coreShared/validators/entityUniqueness.validator";
import {IRepositoryBase} from "@coreShared/base/interfaces/IRepositoryBase";
import {ModelStatic} from "sequelize";
import {IUserTypeService} from "@user/domain/services/interface/IUserType.service";
import {UserTypeService} from "@user/domain/services/userType.service";
import {ICreateUserTypeUseCase} from "@user/useCases/create/createUserType/ICreateUserType.useCase";
import {CreateUserTypeUseCase} from "@user/useCases/create/createUserType/createUserType.useCase";
import {UserTypeModel} from "@user/infrastructure/models/userType.model";
import {IUserTypeRepository} from "@user/infrastructure/repositories/interface/IUserType.repository";
import {UserTypeRepository} from "@user/infrastructure/repositories/userType.repository";
import {IUserController} from "@user/adapters/controllers/interfaces/IUser.controller";
import {UserController} from "@user/adapters/controllers/user.controller";
import {IFindUserTypesUseCase} from "@user/useCases/read/findUserTypes/IFindUserTypes.useCase";
import {FindUserTypesUseCase} from "@user/useCases/read/findUserTypes/findUserTypes.useCase";
import {IUpdateUserTypeUseCase} from "@user/useCases/update/updateUserType/IUpdateUserType.useCase";
import {UpdateUserTypeUseCase} from "@user/useCases/update/updateUserType/updateUserType.useCase";
import {IDeleteUserTypeUseCase} from "@user/useCases/delete/deleteUserTypes/IDeleteUserType.useCase";
import {DeleteUserTypeUseCase} from "@user/useCases/delete/deleteUserTypes/deleteUserType.useCase";
import {
    ICreateUserCredentialTypeUseCase
} from "@user/useCases/create/createUserCredentialType/ICreateUserCredentialType.useCase";
import {
    CreateUserCredentialTypeUseCase
} from "@user/useCases/create/createUserCredentialType/createUserCredentialType.useCase";
import {IFindUserCredentialTypesUseCase} from "@user/useCases/read/findUserCredentialTypes/IFindUserCredentialTypes.useCase";
import {FindUserCredentialTypesUseCase} from "@user/useCases/read/findUserCredentialTypes/findUserCredentialTypes.useCase";
import {
    UpdateUserCredentialTypeUseCase
} from "@user/useCases/update/updateUserCredentialType/updateUserCredentialType.useCase";
import {
    IUpdateUserCredentialTypeUseCase
} from "@user/useCases/update/updateUserCredentialType/IUpdateUserCredentialType.useCase";
import {UserCredentialTypeModel} from "@user/infrastructure/models/userCredentialType.model";
import {IUserCredentialTypeRepository} from "@user/infrastructure/repositories/interface/IUserCredentialType.repository";
import {UserCredentialTypeRepository} from "@user/infrastructure/repositories/userCredentialType.repository";
import {IUserCredentialTypeService} from "@user/domain/services/interface/IUserCredentialType.service";
import {UserCredentialTypeService} from "@user/domain/services/userCredentialType.service";
import {UserTypeBaseRepositoryType} from "@user/adapters/dtos/userType.dto";
import {UserCredentialTypeBaseRepositoryType} from "@user/adapters/dtos/userCredentialType.dto";
import {IUserCredentialService} from "@user/domain/services/interface/IUserCredential.service";
import {UserCredentialService} from "@user/domain/services/userCredential.service";
import {UserCredentialRepository} from "@user/infrastructure/repositories/userCredential.repository";
import {UserCredentialModel} from "@user/infrastructure/models/userCredential.model";
import {IUserCredentialRepository} from "@user/infrastructure/repositories/interface/IUserCredential.repository";
import {ICreateUserUseCase} from "@user/useCases/create/createUser/ICreateUser.useCase";
import {CreateUserUseCase} from "@user/useCases/create/createUser/createUser.useCase";
import {UserModel} from "@user/infrastructure/models/user.model";
import {UserRepository} from "@user/infrastructure/repositories/user.repository";
import {IUserRepository} from "@user/infrastructure/repositories/interface/IUser.repository";
import {UserBaseRepositoryType} from "@user/adapters/dtos/user.dto";
import {IUserService} from "@user/domain/services/interface/IUser.service";
import {UserService} from "@user/domain/services/user.service";
import {IFindUsersUseCase} from "@user/useCases/read/findUsers/IFindUsers.useCase";
import {IUpdateUserUseCase} from "@user/useCases/update/updateUser/IUpdateUser.useCase";
import {IDeleteUserUseCase} from "@user/useCases/delete/deleteUser/IDeleteUser.useCase";
import {FindUsersUseCase} from "@user/useCases/read/findUsers/findUsers.useCase";
import {UpdateUserUseCase} from "@user/useCases/update/updateUser/updateUser.useCase";
import {DeleteUserUseCase} from "@user/useCases/delete/deleteUser/deleteUser.useCase";
import {IUserTypeController} from "@user/adapters/controllers/interfaces/IUserType.controller";
import {UserTypeController} from "@user/adapters/controllers/userType.controller";
import {FindUserTypeByIdUseCase} from "@user/useCases/read/findUserTypeById/findUserTypeById.useCase";
import {IFindUserTypeByIdUseCase} from "@user/useCases/read/findUserTypeById/IFindUserTypeById.useCase";
import {
    FindUserCredentialTypeByIdUseCase
} from "@user/useCases/read/findUserCredentialTypeById/findUserCredentialTypeById.useCase";
import {
    IFindUserCredentialTypeByIdUseCase
} from "@user/useCases/read/findUserCredentialTypeById/IFindUserCredentialTypeById.useCase";
import {
    DeleteUserCredentialTypeUseCase
} from "@user/useCases/delete/deleteUserCredentialType/deleteUserCredentialType.useCase";
import {
    IDeleteUserCredentialTypeUseCase
} from "@user/useCases/delete/deleteUserCredentialType/IDeleteUserCredentialType.useCase";
import {IUserCredentialTypeController} from "@user/adapters/controllers/interfaces/IUserCredentialType.controller";
import {UserCredentialTypeController} from "@user/adapters/controllers/userCredentialType.controller";
import {FindUserByIdUseCase} from "@user/useCases/read/findUserById/findUserById.useCase";
import {IFindUserByIdUseCase} from "@user/useCases/read/findUserById/IFindUserById.useCase";

//#region Services
container.registerSingleton<IUserTypeService>("IUserTypeService", UserTypeService);
container.registerSingleton<IUserCredentialTypeService>("IUserCredentialTypeService", UserCredentialTypeService);
container.registerSingleton<IUserCredentialService>("IUserCredentialService", UserCredentialService);
container.registerSingleton<IUserService>("IUserService", UserService);
//#endregion

//#region UseCases
container.registerSingleton<ICreateUserTypeUseCase>("ICreateUserTypeUseCase", CreateUserTypeUseCase);
container.registerSingleton<IFindUserTypeByIdUseCase>("IFindUserTypeByIdUseCase", FindUserTypeByIdUseCase);
container.registerSingleton<IFindUserTypesUseCase>("IFindUserTypesUseCase", FindUserTypesUseCase);
container.registerSingleton<IUpdateUserTypeUseCase>("IUpdateUserTypeUseCase", UpdateUserTypeUseCase);
container.registerSingleton<IDeleteUserTypeUseCase>("IDeleteUserTypeUseCase", DeleteUserTypeUseCase);

container.registerSingleton<ICreateUserCredentialTypeUseCase>("ICreateUserCredentialTypeUseCase", CreateUserCredentialTypeUseCase);
container.registerSingleton<IFindUserCredentialTypeByIdUseCase>("IFindUserCredentialTypeByIdUseCase", FindUserCredentialTypeByIdUseCase);
container.registerSingleton<IFindUserCredentialTypesUseCase>("IFindUserCredentialTypesUseCase", FindUserCredentialTypesUseCase);
container.registerSingleton<IUpdateUserCredentialTypeUseCase>("IUpdateUserCredentialTypeUseCase", UpdateUserCredentialTypeUseCase);
container.registerSingleton<IDeleteUserCredentialTypeUseCase>("IDeleteUserCredentialTypeUseCase", DeleteUserCredentialTypeUseCase);

container.registerSingleton<ICreateUserUseCase>("ICreateUserUseCase", CreateUserUseCase);
container.registerSingleton<IFindUserByIdUseCase>("IFindUserByIdUseCase", FindUserByIdUseCase);
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
container.registerSingleton<IUserTypeController>("IUserTypeController", UserTypeController);
container.registerSingleton<IUserCredentialTypeController>("IUserCredentialTypeController", UserCredentialTypeController);
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
