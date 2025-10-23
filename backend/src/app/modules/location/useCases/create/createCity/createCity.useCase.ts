import {inject, injectable} from "tsyringe";
import {ICreateCityUseCase} from "@location/useCases/create/createCity/ICreateCity.useCase";
import {ICityService} from "@location/domain/services/interfaces/ICity.service";
import {Transactional} from "@coreShared/decorators/Transactional";
import {Transaction} from "sequelize";
import {ResultType} from "@coreShared/types/result.type";
import {ErrorMessages} from "@coreShared/messages/errorMessages";
import {UseCaseResponseError} from "@coreShared/errors/useCaseResponse.error";
import {CreateCityDTO, CreateCityResponseDTO} from "@location/adapters/dtos/city.dto";
import {CityEntity} from "@location/domain/entities/city.entity";
import {LogError} from "@coreShared/decorators/LogError";

@injectable()
export class CreateCityUseCase implements ICreateCityUseCase {
    constructor(
        @inject("ICityService")
        private service: ICityService,
    ) {
    }

    @LogError()
    @Transactional()
    async execute(input: CreateCityDTO, transaction?: Transaction): Promise<ResultType<CreateCityResponseDTO>> {
        if (!transaction) {
            return ResultType.failure(new Error(ErrorMessages.failure.transactionCreation));
        }

        try {
            const result: CityEntity = await this.service.create(input, transaction);
            return ResultType.success(result);
        } catch (error) {
            return UseCaseResponseError.handleResultError(error);
        }
    }
}