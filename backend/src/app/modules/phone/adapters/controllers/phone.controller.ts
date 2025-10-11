import {IPhoneController} from "@phone/adapters/controllers/interfaces/IPhone.controller";
import {inject, injectable} from "tsyringe";
import {IPhoneCodeController} from "@phone/adapters/controllers/interfaces/IPhoneCode.controller";
import {IPhoneTypeController} from "@phone/adapters/controllers/interfaces/IPhoneType.controller";
import {ICreatePhoneUseCase} from "@phone/useCase/create/createPhone/ICreatePhone.useCase";
import {IFindPhoneByIdUseCase} from "@phone/useCase/read/findPhoneById/IFindPhoneById.useCase";
import {IFindPhonesUseCase} from "@phone/useCase/read/findPhones/IFindPhones.useCase";
import {IUpdatePhoneUseCase} from "@phone/useCase/upadte/updatePhone/IUpdatePhone.useCase";
import {IDeletePhoneUseCase} from "@phone/useCase/delete/deletePhone/IDeletePhone.useCase";
import {ControllerBase} from "@coreShared/base/controller.base";
import {PhoneAbstractControllerBaseType} from "@phone/adapters/dtos/phone.dto";


@injectable()
export class PhoneController extends ControllerBase<PhoneAbstractControllerBaseType> implements IPhoneController {
    constructor(
        @inject("IPhoneCodeController")
        public readonly phoneCodeController: IPhoneCodeController,
        @inject("IPhoneTypeController")
        public readonly phoneTypeController: IPhoneTypeController,
        @inject("ICreatePhoneUseCase")
        protected readonly createPhoneUseCase: ICreatePhoneUseCase,
        @inject("IFindPhoneByIdUseCase")
        protected readonly findPhoneByIdUseCase: IFindPhoneByIdUseCase,
        @inject("IFindPhonesUseCase")
        protected readonly findPhonesUseCase: IFindPhonesUseCase,
        @inject("IUpdatePhoneUseCase")
        protected readonly updatePhoneUseCase: IUpdatePhoneUseCase,
        @inject("IDeletePhoneUseCase")
        protected readonly deletePhoneUseCase: IDeletePhoneUseCase,
    ) {
        super(
            createPhoneUseCase,
            findPhoneByIdUseCase,
            findPhonesUseCase,
            updatePhoneUseCase,
            deletePhoneUseCase
        )
    }
}