import {container} from "tsyringe";
import {EntityUniquenessValidator} from "@coreShared/validators/entityUniqueness.validator";
import {IBaseRepository} from "@coreShared/interfaces/IBaseRepository";
import {IPhoneTypeService} from "@phone/domain/service/interfaces/IPhoneType.service";
import {PhoneTypeService} from "@phone/domain/service/phoneType.service";
import {ICreatePhoneTypeUseCase} from "@phone/useCase/createPhoneType/ICreatePhoneType.useCase";
import {CreatePhoneTypeUseCase} from "@phone/useCase/createPhoneType/createPhoneType.useCase";
import {PhoneTypeMapper} from "@phone/infrastructure/mappers/phoneType.mapper";
import {IPhoneTypeRepository} from "@phone/infrastructure/repositories/interface/IPhoneType.repository";
import {PhoneTypeRepository} from "@phone/infrastructure/repositories/phoneType.repository";
import {IPhoneController} from "@phone/adapters/controllers/IPhone.controller";
import {PhoneController} from "@phone/adapters/controllers/phone.controller";
import {PhoneTypeEntity} from "@phone/domain/entities/phoneType.entity";
import {PhoneTypeModel} from "@phone/infrastructure/models/phoneType.model";
import {PhoneTypeDTO} from "@phone/adapters/dtos/phoneType.dto";
import {IFindPhoneTypesUseCase} from "@phone/useCase/findPhoneTypes/IFindPhoneTypes.useCase";
import {FindPhoneTypesUseCase} from "@phone/useCase/findPhoneTypes/findPhoneTypes.useCase";
import {IUpdatePhoneTypeUseCase} from "@phone/useCase/updatePhoneType/IUpdatePhoneType.useCase";
import {UpdatePhoneTypeUseCase} from "@phone/useCase/updatePhoneType/updatePhoneType.useCase";
import {IDeletePhoneTypesUseCase} from "@phone/useCase/deletePhoneTypes/IDeletePhoneTypes.useCase";
import {DeletePhoneTypesUseCase} from "@phone/useCase/deletePhoneTypes/deletePhoneTypes.useCase";

//#region Services
container.registerSingleton<IPhoneTypeService>("IPhoneTypeService", PhoneTypeService);
//#endregion

//#region UseCases
container.registerSingleton<ICreatePhoneTypeUseCase>("ICreatePhoneTypeUseCase", CreatePhoneTypeUseCase);
container.registerSingleton<IFindPhoneTypesUseCase>("IFindPhoneTypesUseCase", FindPhoneTypesUseCase);
container.registerSingleton<IUpdatePhoneTypeUseCase>("IUpdatePhoneTypeUseCase", UpdatePhoneTypeUseCase);
container.registerSingleton<IDeletePhoneTypesUseCase>("IDeletePhoneTypesUseCase", DeletePhoneTypesUseCase);
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
