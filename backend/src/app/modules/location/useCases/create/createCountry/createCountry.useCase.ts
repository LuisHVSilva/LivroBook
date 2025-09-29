import {inject, injectable} from "tsyringe";
import {ICountryService} from "@location/domain/services/interfaces/ICountry.service";
import {LogExecution} from "@coreShared/decorators/LogExecution";
import {Transactional} from "@coreShared/decorators/Transactional";
import {CreateCountryDTO, CreateCountryResponseDTO} from "@location/adapters/dtos/country.dto";
import {Transaction} from "sequelize";
import {ResultType} from "@coreShared/types/result.type";
import {ErrorMessages} from "@coreShared/messages/errorMessages";
import {UseCaseResponseUtil} from "@coreShared/utils/useCaseResponse.util";
import {CountryEntity} from "@location/domain/entities/country.entity";
import {ICreateCountryUseCase} from "@location/useCases/create/createCountry/ICreateCountry.useCase";

@injectable()
export class CreateCountryUseCase implements ICreateCountryUseCase {
    constructor(
        @inject("ICountryService") private readonly service: ICountryService,
    ) {
    }

    @LogExecution()
    @Transactional()
    async execute(input: CreateCountryDTO, transaction?: Transaction): Promise<ResultType<CreateCountryResponseDTO>> {
        if (!transaction) {
            return ResultType.failure(new Error(ErrorMessages.failure.transactionCreation));
        }

        try {
            const result: CountryEntity = await this.service.create(input, transaction);

            return ResultType.success({
                id: result.id!,
                description: result.description,
                statusId: result.statusId,
            });
        } catch (error) {
            return UseCaseResponseUtil.handleResultError(error);
        }
    }
}