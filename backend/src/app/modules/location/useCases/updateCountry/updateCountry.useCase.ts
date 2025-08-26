import {inject, injectable} from "tsyringe";
import {LogExecution} from "@coreShared/decorators/LogExecution";
import {Transactional} from "@coreShared/decorators/Transactional";
import {Transaction} from "sequelize";
import {ResultType} from "@coreShared/types/result.type";
import {UseCaseResponseUtil} from "@coreShared/utils/useCaseResponse.util";
import {UpdateResultType} from "@coreShared/types/crudResult.type";
import {ErrorMessages} from "@coreShared/messages/errorMessages";
import {IUpdateCountryUseCase} from "@location/useCases/updateCountry/IUpdateCountry.UseCase";
import {UpdateCountryDTO} from "@location/adapters/dtos/country.dto";
import {CountryEntity} from "@location/domain/entities/country.entity";
import {ICountryService} from "@location/domain/services/interfaces/ICountry.service";

@injectable()
export class UpdateCountryUseCase implements IUpdateCountryUseCase {
    constructor(
        @inject("ICountryService") private readonly service: ICountryService
    ) {
    }

    @LogExecution()
    @Transactional()
    async execute(input: UpdateCountryDTO, transaction?: Transaction): Promise<ResultType<UpdateResultType<CountryEntity>>> {
        if (!transaction) {
            return ResultType.failure(new Error(ErrorMessages.failure.transactionCreation));
        }

        try {
            const updatedEntity: UpdateResultType<CountryEntity> = await this.service.update(input, transaction);

            return ResultType.success(updatedEntity);
        } catch (error) {
            return UseCaseResponseUtil.handleResultError(error);
        }
    }
}