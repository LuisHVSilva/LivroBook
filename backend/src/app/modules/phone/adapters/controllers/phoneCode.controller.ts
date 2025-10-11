import {inject, injectable} from "tsyringe";
import {ControllerBase} from "@coreShared/base/controller.base";
import {PhoneCodeAbstractControllerBaseType} from "@phone/adapters/dtos/phoneCode.dto";
import {IPhoneCodeController} from "@phone/adapters/controllers/interfaces/IPhoneCode.controller";
import {ICreatePhoneCodeUseCase} from "@phone/useCase/create/createPhoneCode/ICreatePhoneCode.useCase";
import {IFindPhoneCodeByIdUseCase} from "@phone/useCase/read/findPhoneCodeById/IFindPhoneCodeById.useCase";
import {IUpdatePhoneCodeUseCase} from "@phone/useCase/upadte/updatePhoneCode/IUpdatePhoneCode.useCase";
import {IDeletePhoneCodeUseCase} from "@phone/useCase/delete/deletePhoneCode/IDeletePhoneCode.useCase";
import {IFindPhoneCodesUseCase} from "@phone/useCase/read/findPhoneCodes/IFindPhoneCodes.useCase";

@injectable()
export class PhoneCodeController extends ControllerBase<PhoneCodeAbstractControllerBaseType> implements IPhoneCodeController {
    constructor(
        @inject("ICreatePhoneCodeUseCase") protected readonly createPhoneCodeUseCase: ICreatePhoneCodeUseCase,
        @inject("IFindPhoneCodeByIdUseCase") protected readonly findPhoneCodeByIdUseCase: IFindPhoneCodeByIdUseCase,
        @inject("IFindPhoneCodesUseCase") protected readonly findPhoneCodesUseCase: IFindPhoneCodesUseCase,
        @inject("IUpdatePhoneCodeUseCase") protected readonly updatePhoneCodeUseCase: IUpdatePhoneCodeUseCase,
        @inject("IDeletePhoneCodeUseCase") protected readonly deletePhoneCodeUseCase: IDeletePhoneCodeUseCase,
    ) {
        super(
            createPhoneCodeUseCase,
            findPhoneCodeByIdUseCase,
            findPhoneCodesUseCase,
            updatePhoneCodeUseCase,
            deletePhoneCodeUseCase
        )
    }
}