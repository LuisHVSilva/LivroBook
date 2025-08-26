import {inject, injectable} from "tsyringe";
import {ICreateStateUseCase} from "@location/useCases/createState/ICreateState.useCase";
import {IStateService} from "@location/domain/services/interfaces/IState.service";
import {LogExecution} from "@coreShared/decorators/LogExecution";
import {Transactional} from "@coreShared/decorators/Transactional";
import {Transaction} from "sequelize";
import {ResultType} from "@coreShared/types/result.type";
import {ErrorMessages} from "@coreShared/messages/errorMessages";
import {UseCaseResponseUtil} from "@coreShared/utils/useCaseResponse.util";
import {CreateStateDTO, CreateStateResponseDTO} from "@location/adapters/dtos/state.dto";
import {StateEntity} from "@location/domain/entities/state.entity";

@injectable()
export class CreateStateUseCase implements ICreateStateUseCase {
    constructor(
        @inject("IStateService") private service: IStateService,
    ) {
    }

    @LogExecution()
    @Transactional()
    async execute(input: CreateStateDTO, transaction?: Transaction): Promise<ResultType<CreateStateResponseDTO>> {
        if (!transaction) {
            return ResultType.failure(new Error(ErrorMessages.failure.transactionCreation));
        }

        try {
            const result: StateEntity = await this.service.create(input, transaction);

            return ResultType.success({
                id: result.id!,
                description: result.description,
                countryId: result.countryId,
                statusId: result.statusId,
            });
        } catch (error) {
            return UseCaseResponseUtil.handleResultError(error);
        }
    }
}