import {inject, injectable} from "tsyringe";
import {Transactional} from "@coreShared/decorators/Transactional";
import {Transaction} from "sequelize";
import {ResultType} from "@coreShared/types/result.type";
import {UseCaseResponseUtil} from "@coreShared/utils/useCaseResponse.util";
import {UpdateResultType} from "@coreShared/types/crudResult.type";
import {ErrorMessages} from "@coreShared/messages/errorMessages";
import {IUpdateCityUseCase} from "@location/useCases/update/updateCity/IUpdateCity.useCase";
import {ICityService} from "@location/domain/services/interfaces/ICity.service";
import {UpdateCityDTO, UpdateCityResponseDTO} from "@location/adapters/dtos/city.dto";
import {LogError} from "@coreShared/decorators/LogError";

@injectable()
export class UpdateCityUseCase implements IUpdateCityUseCase {
    constructor(
        @inject("ICityService") private readonly service: ICityService
    ) {
    }

    @LogError()
    @Transactional()
    async execute(input: UpdateCityDTO, transaction?: Transaction): Promise<ResultType<UpdateResultType<UpdateCityResponseDTO>>> {
        if (!transaction) {
            return ResultType.failure(new Error(ErrorMessages.failure.transactionCreation));
        }

        try {
            const updatedEntity: UpdateResultType<UpdateCityResponseDTO> = await this.service.update(input, transaction);

            return ResultType.success(updatedEntity);
        } catch (error) {
            return UseCaseResponseUtil.handleResultError(error);
        }
    }
}