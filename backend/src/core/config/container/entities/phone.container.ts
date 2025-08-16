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
import {IPhoneCodeService} from "@phone/domain/service/interfaces/IPhoneCode.service";
import {PhoneCodeService} from "@phone/domain/service/phoneCode.service";
import {ICreatePhoneCodeUseCase} from "@phone/useCase/createPhoneCode/ICreatePhoneCode.useCase";
import {CreatePhoneCodeUseCase} from "@phone/useCase/createPhoneCode/createPhoneCode.useCase";
import {PhoneCodeMapper} from "@phone/infrastructure/mappers/phoneCode.mapper";
import {IPhoneCodeRepository} from "@phone/infrastructure/repositories/interface/IPhoneCode.repository";
import {PhoneCodeRepository} from "@phone/infrastructure/repositories/phoneCode.repository";
import {IFindPhoneCodesUseCase} from "@phone/useCase/findPhoneCodeTypes/IFindPhoneCodes.useCase";
import {FindPhoneCodesUseCase} from "@phone/useCase/findPhoneCodeTypes/findPhoneCodes.useCase";
import {IUpdatePhoneCodeUseCase} from "@phone/useCase/updatePhoneCode/IUpdatePhoneCode.useCase";
import {UpdatePhoneCodeUseCase} from "@phone/useCase/updatePhoneCode/updatePhoneCode.useCase";
import {IDeletePhoneCodesUseCase} from "@phone/useCase/deletePhoneCode/IDeletePhoneCodes.useCase";
import {DeletePhoneCodesUseCase} from "@phone/useCase/deletePhoneCode/deletePhoneCodes.useCase";
import {PhoneService} from "@phone/domain/service/phone.service";
import {IPhoneService} from "@phone/domain/service/interfaces/IPhone.service";
import {PhoneMapper} from "@phone/infrastructure/mappers/phone.mapper";
import {IPhoneRepository} from "@phone/infrastructure/repositories/interface/IPhone.repository";
import {PhoneRepository} from "@phone/infrastructure/repositories/phone.repository";
import {PhoneDTO} from "@phone/adapters/dtos/phone.dto";
import {PhoneEntity} from "@phone/domain/entities/phone.entity";
import {PhoneModel} from "@phone/infrastructure/models/phone.model";
import {ICreatePhoneUseCase} from "@phone/useCase/createPhone/ICreatePhone.useCase";
import {CreatePhoneUseCase} from "@phone/useCase/createPhone/createPhone.useCase";

//#region Services
container.registerSingleton<IPhoneTypeService>("IPhoneTypeService", PhoneTypeService);
container.registerSingleton<IPhoneCodeService>("IPhoneCodeService", PhoneCodeService);
container.registerSingleton<IPhoneService>("IPhoneService", PhoneService);
//#endregion

//#region UseCases
container.registerSingleton<ICreatePhoneTypeUseCase>("ICreatePhoneTypeUseCase", CreatePhoneTypeUseCase);
container.registerSingleton<IFindPhoneTypesUseCase>("IFindPhoneTypesUseCase", FindPhoneTypesUseCase);
container.registerSingleton<IUpdatePhoneTypeUseCase>("IUpdatePhoneTypeUseCase", UpdatePhoneTypeUseCase);
container.registerSingleton<IDeletePhoneTypesUseCase>("IDeletePhoneTypesUseCase", DeletePhoneTypesUseCase);

container.registerSingleton<ICreatePhoneCodeUseCase>("ICreatePhoneCodeUseCase", CreatePhoneCodeUseCase);
container.registerSingleton<IFindPhoneCodesUseCase>("IFindPhoneCodesUseCase", FindPhoneCodesUseCase);
container.registerSingleton<IUpdatePhoneCodeUseCase>("IUpdatePhoneCodeUseCase", UpdatePhoneCodeUseCase);
container.registerSingleton<IDeletePhoneCodesUseCase>("IDeletePhoneCodesUseCase", DeletePhoneCodesUseCase);

container.registerSingleton<ICreatePhoneUseCase>("ICreatePhoneUseCase", CreatePhoneUseCase);
// #endregion

//#region Infrastructure
container.registerSingleton<PhoneTypeMapper>("PhoneTypeMapper", PhoneTypeMapper);
container.registerSingleton<IPhoneTypeRepository>("IPhoneTypeRepository", PhoneTypeRepository);
container.registerSingleton<PhoneCodeMapper>("PhoneCodeMapper", PhoneCodeMapper);
container.registerSingleton<IPhoneCodeRepository>("IPhoneCodeRepository", PhoneCodeRepository);
container.registerSingleton<PhoneMapper>("PhoneMapper", PhoneMapper);
container.registerSingleton<IPhoneRepository>("IPhoneRepository", PhoneRepository);
//#endregion

//#region Adapters
container.registerSingleton<IPhoneController>("IPhoneController", PhoneController);
//#endregion

//#region Validators
container.registerSingleton<EntityUniquenessValidator<PhoneTypeEntity, PhoneTypeModel, PhoneTypeDTO>>("PhoneTypeUniquenessValidator", EntityUniquenessValidator);
container.registerSingleton<IBaseRepository<any, any, any>>("PhoneTypeRepository", PhoneTypeRepository);
container.registerSingleton<EntityUniquenessValidator<PhoneEntity, PhoneModel, PhoneDTO>>("PhoneUniquenessValidator", EntityUniquenessValidator);
container.registerSingleton<IBaseRepository<any, any, any>>("PhoneRepository", PhoneRepository);
//#endregion

export {container};
