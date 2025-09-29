import {container} from "tsyringe";
import {EntityUniquenessValidator} from "@coreShared/validators/entityUniqueness.validator";
import {IRepositoryBase} from "@coreShared/base/interfaces/IRepositoryBase";
import {IPhoneTypeService} from "@phone/domain/service/interfaces/IPhoneType.service";
import {PhoneTypeService} from "@phone/domain/service/phoneType.service";
import {ICreatePhoneTypeUseCase} from "@phone/useCase/create/createPhoneType/ICreatePhoneType.useCase";
import {CreatePhoneTypeUseCase} from "@phone/useCase/create/createPhoneType/createPhoneType.useCase";
import {IPhoneTypeRepository} from "@phone/infrastructure/repositories/interface/IPhoneType.repository";
import {PhoneTypeRepository} from "@phone/infrastructure/repositories/phoneType.repository";
import {IPhoneController} from "@phone/adapters/controllers/IPhone.controller";
import {PhoneController} from "@phone/adapters/controllers/phone.controller";
import {IFindPhoneTypesUseCase} from "@phone/useCase/read/findPhoneTypes/IFindPhoneTypes.useCase";
import {FindPhoneTypesUseCase} from "@phone/useCase/read/findPhoneTypes/findPhoneTypes.useCase";
import {IUpdatePhoneTypeUseCase} from "@phone/useCase/upadte/updatePhoneType/IUpdatePhoneType.useCase";
import {UpdatePhoneTypeUseCase} from "@phone/useCase/upadte/updatePhoneType/updatePhoneType.useCase";
import {IDeletePhoneTypesUseCase} from "@phone/useCase/delete/deletePhoneTypes/IDeletePhoneTypes.useCase";
import {DeletePhoneTypesUseCase} from "@phone/useCase/delete/deletePhoneTypes/deletePhoneTypes.useCase";
import {IPhoneCodeService} from "@phone/domain/service/interfaces/IPhoneCode.service";
import {PhoneCodeService} from "@phone/domain/service/phoneCode.service";
import {ICreatePhoneCodeUseCase} from "@phone/useCase/create/createPhoneCode/ICreatePhoneCode.useCase";
import {CreatePhoneCodeUseCase} from "@phone/useCase/create/createPhoneCode/createPhoneCode.useCase";
import {IPhoneCodeRepository} from "@phone/infrastructure/repositories/interface/IPhoneCode.repository";
import {PhoneCodeRepository} from "@phone/infrastructure/repositories/phoneCode.repository";
import {IFindPhoneCodesUseCase} from "@phone/useCase/read/findPhoneCodeTypes/IFindPhoneCodes.useCase";
import {FindPhoneCodesUseCase} from "@phone/useCase/read/findPhoneCodeTypes/findPhoneCodes.useCase";
import {IUpdatePhoneCodeUseCase} from "@phone/useCase/upadte/updatePhoneCode/IUpdatePhoneCode.useCase";
import {UpdatePhoneCodeUseCase} from "@phone/useCase/upadte/updatePhoneCode/updatePhoneCode.useCase";
import {IDeletePhoneCodesUseCase} from "@phone/useCase/delete/deletePhoneCode/IDeletePhoneCodes.useCase";
import {DeletePhoneCodesUseCase} from "@phone/useCase/delete/deletePhoneCode/deletePhoneCodes.useCase";
import {PhoneService} from "@phone/domain/service/phone.service";
import {IPhoneService} from "@phone/domain/service/interfaces/IPhone.service";
import {IPhoneRepository} from "@phone/infrastructure/repositories/interface/IPhone.repository";
import {PhoneRepository} from "@phone/infrastructure/repositories/phone.repository";
import {ICreatePhoneUseCase} from "@phone/useCase/create/createPhone/ICreatePhone.useCase";
import {CreatePhoneUseCase} from "@phone/useCase/create/createPhone/createPhone.useCase";
import {IFindPhonesUseCase} from "@phone/useCase/read/findPhones/IFindPhones.useCase";
import {FindPhonesUseCase} from "@phone/useCase/read/findPhones/findPhones.useCase";
import {IUpdatePhoneUseCase} from "@phone/useCase/upadte/updatePhone/IUpdatePhone.useCase";
import {UpdatePhoneUseCase} from "@phone/useCase/upadte/updatePhone/updatePhone.useCase";
import {IDeletePhoneUseCase} from "@phone/useCase/delete/deletePhone/IDeletePhone.useCase";
import {DeletePhoneUseCase} from "@phone/useCase/delete/deletePhone/deletePhone.useCase";
import {ModelStatic} from "sequelize";
import {PhoneTypeModel} from "@phone/infrastructure/models/phoneType.model";
import {PhoneCodeModel} from "@phone/infrastructure/models/phoneCode.model";
import {PhoneModel} from "@phone/infrastructure/models/phone.model";
import {PhoneTypeBaseRepositoryType} from "@phone/adapters/dtos/phoneType.dto";
import {PhoneBaseRepositoryType} from "@phone/adapters/dtos/phone.dto";

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
container.registerSingleton<IFindPhonesUseCase>("IFindPhonesUseCase", FindPhonesUseCase);
container.registerSingleton<IUpdatePhoneUseCase>("IUpdatePhoneUseCase", UpdatePhoneUseCase);
container.registerSingleton<IDeletePhoneUseCase>("IDeletePhoneUseCase", DeletePhoneUseCase);
// #endregion

//#region Infrastructure
container.register<ModelStatic<PhoneTypeModel>>("PhoneTypeModel", {useValue: PhoneTypeModel});
container.registerSingleton<IPhoneTypeRepository>("IPhoneTypeRepository", PhoneTypeRepository);
container.register<ModelStatic<PhoneCodeModel>>("PhoneCodeModel", {useValue: PhoneCodeModel});
container.registerSingleton<IPhoneCodeRepository>("IPhoneCodeRepository", PhoneCodeRepository);
container.register<ModelStatic<PhoneModel>>("PhoneModel", {useValue: PhoneModel});
container.registerSingleton<IPhoneRepository>("IPhoneRepository", PhoneRepository);
//#endregion

//#region Adapters
container.registerSingleton<IPhoneController>("IPhoneController", PhoneController);
//#endregion

//#region Validators
container.registerSingleton<EntityUniquenessValidator<PhoneTypeBaseRepositoryType>>("PhoneTypeUniquenessValidator", EntityUniquenessValidator);
container.registerSingleton<IRepositoryBase<PhoneTypeBaseRepositoryType>>("PhoneTypeRepository", PhoneTypeRepository);
container.registerSingleton<EntityUniquenessValidator<PhoneBaseRepositoryType>>("PhoneUniquenessValidator", EntityUniquenessValidator);
container.registerSingleton<IRepositoryBase<PhoneBaseRepositoryType>>("PhoneRepository", PhoneRepository);
//#endregion

export {container};
