import {inject, injectable} from "tsyringe";
import {ICreateCityUseCase} from "@location/useCases/create/createCity/ICreateCity.useCase";
import {ICityService} from "@location/domain/services/interfaces/ICity.service";
import {LogExecution} from "@coreShared/decorators/LogExecution";
import {Transactional} from "@coreShared/decorators/Transactional";
import {Transaction} from "sequelize";
import {ResultType} from "@coreShared/types/result.type";
import {ErrorMessages} from "@coreShared/messages/errorMessages";
import {UseCaseResponseUtil} from "@coreShared/utils/useCaseResponse.util";
import {CreateCityDTO, CreateCityResponseDTO} from "@location/adapters/dtos/city.dto";
import {CityEntity} from "@location/domain/entities/city.entity";

@injectable()
export class CreateCityUseCase implements ICreateCityUseCase {
    constructor(
        @inject("ICityService") private service: ICityService,
    ) {
    }

    @LogExecution()
    @Transactional()
    async execute(input: CreateCityDTO, transaction?: Transaction): Promise<ResultType<CreateCityResponseDTO>> {
        if (!transaction) {
            return ResultType.failure(new Error(ErrorMessages.failure.transactionCreation));
        }

        try {
            const result: CityEntity = await this.service.create(input, transaction);

            return ResultType.success({
                id: result.id!,
                description: result.description,
                stateId: result.stateId,
                statusId: result.statusId,
            });
        } catch (error) {
            return UseCaseResponseUtil.handleResultError(error);
        }
    }
}