import {inject, injectable} from "tsyringe";
import {FindByIdRequestDTO} from "@coreShared/dtos/operation.dto";
import {ResultType} from "@coreShared/types/result.type";
import {StringUtil} from "@coreShared/utils/string.util";
import {UseCaseResponseError} from "@coreShared/errors/useCaseResponse.error";
import {IFindStateByIdUseCase} from "@location/useCases/read/findStateById/IFindStateById.useCase";
import {FindByIdStateResponseDTO} from "@location/adapters/dtos/state.dto";
import {IStateService} from "@location/domain/services/interfaces/IState.service";
import {StateEntity} from "@location/domain/entities/state.entity";
import {LogError} from "@coreShared/decorators/LogError";

@injectable()
export class FindStateByIdUseCase implements IFindStateByIdUseCase {
    constructor(
        @inject("IStateService") private readonly service: IStateService,
    ) {
    }

    @LogError()
    async execute(input: FindByIdRequestDTO): Promise<ResultType<FindByIdStateResponseDTO>> {
        try {
            const id: number = StringUtil.strToNumber(input.id);
            const entity: StateEntity = await this.service.getById(id);

            return ResultType.success(entity);
        } catch (error) {
            return UseCaseResponseError.handleResultError(error);
        }
    }
}