import {inject, injectable} from "tsyringe";
import {LogExecution} from "@coreShared/decorators/LogExecution";
import {Transactional} from "@coreShared/decorators/Transactional";
import {Transaction} from "sequelize";
import {ResultType} from "@coreShared/types/result.type";
import {UseCaseResponseUtil} from "@coreShared/utils/useCaseResponse.util";
import {UpdateResultType} from "@coreShared/types/crudResult.type";
import {ErrorMessages} from "@coreShared/messages/errorMessages";
import {IUpdateCityUseCase} from "@location/useCases/updateCity/IUpdateCity.useCase";
import {ICityService} from "@location/domain/services/interfaces/ICity.service";
import {UpdateCityDTO} from "@location/adapters/dtos/city.dto";
import {CityEntity} from "@location/domain/entities/city.entity";

@injectable()
export class UpdateCityUseCase implements IUpdateCityUseCase {
    constructor(
        @inject("ICityService") private readonly service: ICityService
    ) {
    }

    @LogExecution()
    @Transactional()
    async execute(input: UpdateCityDTO, transaction?: Transaction): Promise<ResultType<UpdateResultType<CityEntity>>> {
        if (!transaction) {
            return ResultType.failure(new Error(ErrorMessages.failure.transactionCreation));
        }

        try {
            const updatedEntity: UpdateResultType<CityEntity> = await this.service.update(input, transaction);

            return ResultType.success(updatedEntity);
        } catch (error) {
            return UseCaseResponseUtil.handleResultError(error);
        }
    }
}