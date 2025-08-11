import {container} from "tsyringe";
import {EntityUniquenessValidator} from "@coreShared/validators/entityUniqueness.validator";
import {IBaseRepository} from "@coreShared/interfaces/IBaseRepository";
import {IPhoneTypeService} from "@phone/domain/service/interfaces/IPhoneType.service";
import {PhoneTypeService} from "@phone/domain/service/phoneType.service";
import {ICreatePhoneTypeUseCase} from "@phone/useCase/createPhoneType/ICreatePhoneTypeUseCase";
import {CreatePhoneTypeUseCase} from "@phone/useCase/createPhoneType/createPhoneTypeUseCase";
import {PhoneTypeMapper} from "@phone/infrastructure/mappers/phoneType.mapper";
import {IPhoneTypeRepository} from "@phone/infrastructure/repositories/interface/IPhoneType.repository";
import {PhoneTypeRepository} from "@phone/infrastructure/repositories/phoneType.repository";
import {IPhoneController} from "@phone/adapters/controllers/IPhone.controller";
import {PhoneController} from "@phone/adapters/controllers/phone.controller";
import {PhoneTypeEntity} from "@phone/domain/entities/phoneType.entity";
import {PhoneTypeModel} from "@phone/infrastructure/models/phoneType.model";
import {PhoneTypeDTO} from "@phone/adapters/dtos/phoneType.dto";

//#region Services
container.registerSingleton<IPhoneTypeService>("IPhoneTypeService", PhoneTypeService);
//#endregion

//#region UseCases
container.registerSingleton<ICreatePhoneTypeUseCase>("ICreatePhoneTypeUseCase", CreatePhoneTypeUseCase);
// #endregion

//#region Infrastructure
container.registerSingleton<PhoneTypeMapper>("PhoneTypeMapper", PhoneTypeMapper);
container.registerSingleton<IPhoneTypeRepository>("IPhoneTypeRepository", PhoneTypeRepository);
//#endregion

//#region Adapters
container.registerSingleton<IPhoneController>("IPhoneController", PhoneController);
//#endregion

//#region Validators
container.registerSingleton<EntityUniquenessValidator<PhoneTypeEntity, PhoneTypeModel, PhoneTypeDTO>>("PhoneTypeUniquenessValidator", EntityUniquenessValidator);
container.registerSingleton<IBaseRepository<any, any, any>>("PhoneTypeRepository", PhoneTypeRepository);
//#endregion

export {container};
