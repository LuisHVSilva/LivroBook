import {inject, injectable} from "tsyringe";
import {ControllerBase} from "@coreShared/base/controller.base";
import {IPhoneTypeController} from "@phone/adapters/controllers/interfaces/IPhoneType.controller";
import {ICreatePhoneTypeUseCase} from "@phone/useCase/create/createPhoneType/ICreatePhoneType.useCase";
import {IFindPhoneTypeByIdUseCase} from "@phone/useCase/read/findPhoneTypeById/IFindPhoneTypeById.useCase";
import {IUpdatePhoneTypeUseCase} from "@phone/useCase/upadte/updatePhoneType/IUpdatePhoneType.useCase";
import {IDeletePhoneTypeUseCase} from "@phone/useCase/delete/deletePhoneType/IDeletePhoneType.useCase";
import {IFindPhoneTypesUseCase} from "@phone/useCase/read/findPhoneTypes/IFindPhoneTypes.useCase";
import {PhoneTypeAbstractControllerBaseType} from "@phone/adapters/dtos/phoneType.dto";

@injectable()
export class PhoneTypeController extends ControllerBase<PhoneTypeAbstractControllerBaseType> implements IPhoneTypeController {
    constructor(
        @inject("ICreatePhoneTypeUseCase") protected readonly createPhoneTypeUseCase: ICreatePhoneTypeUseCase,
        @inject("IFindPhoneTypeByIdUseCase") protected readonly findPhoneTypeByIdUseCase: IFindPhoneTypeByIdUseCase,
        @inject("IFindPhoneTypesUseCase") protected readonly findPhoneTypesUseCase: IFindPhoneTypesUseCase,
        @inject("IUpdatePhoneTypeUseCase") protected readonly updatePhoneTypeUseCase: IUpdatePhoneTypeUseCase,
        @inject("IDeletePhoneTypeUseCase") protected readonly deletePhoneTypeUseCase: IDeletePhoneTypeUseCase,
    ) {
        super(
            createPhoneTypeUseCase,
            findPhoneTypeByIdUseCase,
            findPhoneTypesUseCase,
            updatePhoneTypeUseCase,
            deletePhoneTypeUseCase
        )
    }
}