import {inject, injectable} from "tsyringe";
import {ControllerBase} from "@coreShared/base/controller.base";
import {StateAbstractControllerBaseType} from "@location/adapters/dtos/state.dto";
import {ICreateStateUseCase} from "@location/useCases/create/createState/ICreateState.useCase";
import {IFindStatesUseCase} from "@location/useCases/read/findStates/IFindStates.useCase";
import {IFindStateByIdUseCase} from "@location/useCases/read/findStateById/IFindStateById.useCase";
import {IUpdateStateUseCase} from "@location/useCases/update/updateState/IUpdateState.useCase";
import {IDeleteStateUseCase} from "@location/useCases/delete/deleteState/IDeleteState.useCase";
import {IStateController} from "@location/adapters/controllers/interfaces/IState.controller";

@injectable()
export class StateController extends ControllerBase<StateAbstractControllerBaseType> implements IStateController {
    constructor(
        @inject("ICreateStateUseCase") protected readonly createStateUseCase: ICreateStateUseCase,
        @inject("IFindStateByIdUseCase") protected readonly findStateByIdUseCase: IFindStateByIdUseCase,
        @inject("IFindStatesUseCase") protected readonly findCountriesUseCase: IFindStatesUseCase,
        @inject("IUpdateStateUseCase") protected readonly updateStateUseCase: IUpdateStateUseCase,
        @inject("IDeleteStateUseCase") protected readonly deleteStateUseCase: IDeleteStateUseCase,
    ) {
        super(
            createStateUseCase,
            findStateByIdUseCase,
            findCountriesUseCase,
            updateStateUseCase,
            deleteStateUseCase
        )
    }
}