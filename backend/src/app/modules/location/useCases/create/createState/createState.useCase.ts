import {inject, injectable} from "tsyringe";
import {ICreateStateUseCase} from "@location/useCases/create/createState/ICreateState.useCase";
import {IStateService} from "@location/domain/services/interfaces/IState.service";
import {Transactional} from "@coreShared/decorators/Transactional";
import {Transaction} from "sequelize";
import {ResultType} from "@coreShared/types/result.type";
import {ErrorMessages} from "@coreShared/messages/errorMessages";
import {UseCaseResponseUtil} from "@coreShared/utils/useCaseResponse.util";
import {CreateStateDTO, CreateStateResponseDTO} from "@location/adapters/dtos/state.dto";
import {StateEntity} from "@location/domain/entities/state.entity";
import {LogError} from "@coreShared/decorators/LogError";

@injectable()
export class CreateStateUseCase implements ICreateStateUseCase {
    constructor(
        @inject("IStateService")
        private service: IStateService,
    ) {
    }

    @LogError()
    @Transactional()
    async execute(input: CreateStateDTO, transaction?: Transaction): Promise<ResultType<CreateStateResponseDTO>> {
        if (!transaction) {
            return ResultType.failure(new Error(ErrorMessages.failure.transactionCreation));
        }

        try {
            const result: StateEntity = await this.service.create(input, transaction);

            return ResultType.success(result);
        } catch (error) {
            return UseCaseResponseUtil.handleResultError(error);
        }
    }
}