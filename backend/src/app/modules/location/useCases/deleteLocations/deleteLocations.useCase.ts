import {inject, injectable} from "tsyringe";
import {IDeleteLocationsUseCase} from "@location/useCases/deleteLocations/IDeleteLocations.useCase";
import {LogExecution} from "@coreShared/decorators/LogExecution";
import {Transactional} from "@coreShared/decorators/Transactional";
import {DeleteLocationDTO, DeleteLocationResponseDTO} from "@location/adapters/dtos/location.dto";
import {Transaction} from "sequelize";
import {ResultType} from "@coreShared/types/result.type";
import {UseCaseResponseUtil} from "@coreShared/utils/useCaseResponse.util";
import {EntitiesMessage} from "@coreShared/messages/entities.message";
import {DomainError} from "@coreShared/errors/domain.error";
import {StringUtil} from "@coreShared/utils/string.util";
import {CountryEntity} from "@location/domain/entities/country.entity";
import {StateEntity} from "@location/domain/entities/state.entity";
import {CityEntity} from "@location/domain/entities/city.entity";
import {IStateService} from "@location/domain/services/interfaces/IState.service";
import {ICityService} from "@location/domain/services/interfaces/ICity.service";
import {ICountryService} from "@location/domain/services/interfaces/ICountry.service";
import {ErrorMessages} from "@coreShared/messages/errorMessages";


@injectable()
export class DeleteLocationsUseCase implements IDeleteLocationsUseCase {
    constructor(
        @inject("ICountryService") private readonly countryService: ICountryService,
        @inject("IStateService") private readonly stateService: IStateService,
        @inject("ICityService") private readonly cityService: ICityService,
    ) {
    }

    @LogExecution()
    @Transactional()
    async execute(input: DeleteLocationDTO, transaction?: Transaction): Promise<ResultType<DeleteLocationResponseDTO>> {
        if (!transaction) return ResultType.failure(new Error(ErrorMessages.failure.transactionCreation));
        if (Object.keys(input).length === 0) return ResultType.failure(new DomainError(EntitiesMessage.error.validation.idRequired));

        const messages: string[] = [];
        try {
            messages.push(await
                this.deleteEntities(
                    CountryEntity.ENTITY_NAME,
                    this.countryService.deleteCountry.bind(this.countryService),
                    transaction,
                    input.countriesId
                )
            );

            messages.push(await this.deleteEntities(
                    StateEntity.ENTITY_NAME,
                    this.stateService.deleteState.bind(this.stateService),
                    transaction,
                    input.statesId
                )
            );

            messages.push(await this.deleteEntities(
                    CityEntity.ENTITY_NAME,
                    this.cityService.deleteCity.bind(this.cityService),
                    transaction,
                    input.citiesId
                )
            );

            return ResultType.success({message: messages.join(' ')});
        } catch (error) {
            return UseCaseResponseUtil.handleResultError(error);
        }
    }

    private async deleteEntities(
        entityName: string,
        deleteFn: (id: number, transaction: Transaction) => Promise<void>,
        transaction: Transaction,
        inputIds?: string
    ): Promise<string> {
        const ids = StringUtil.parseCsvFilter(inputIds, Number);

        if (!inputIds || !ids) return '';

        for (const id of ids) {
            await deleteFn(id, transaction);
        }

        return EntitiesMessage.success.delete(entityName);
    }
}
