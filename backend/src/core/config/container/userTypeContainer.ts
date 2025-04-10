import {container} from "tsyringe";
import {IUserTypeDomainService} from "@userType/domain/service/IUserTypeDomainService";
import {UserTypeDomainService} from "@userType/domain/service/userTypeDomainService";
import {IUserTypeRepository} from "@userType/infrastructure/repository/IUserTypeRepository";
import {UserTypeRepository} from "@userType/infrastructure/repository/UserTypeRepository";
import {ICreateUserTypeUseCase} from "@userType/application/createUserType/ICreateUserTypeUseCase";
import {CreateUserTypeUseCase} from "@userType/application/createUserType/createUserTypeUseCase";
import {IUserTypeController} from "@userType/adapters/controller/IUserTypeController";
import {UserTypeController} from "@userType/adapters/controller/userTypeController";

container.registerSingleton<IUserTypeDomainService>('IUserTypeDomainService', UserTypeDomainService);
container.registerSingleton<IUserTypeRepository>("IUserTypeRepository", UserTypeRepository);
container.registerSingleton<ICreateUserTypeUseCase>("ICreateUserTypeUseCase", CreateUserTypeUseCase);
container.registerSingleton<IUserTypeController>("IUserTypeController", UserTypeController);

export {container};
