import {inject, injectable} from "tsyringe";
import {IUpdateLocationUseCase} from "@location/useCases/updateLocation/IUpdateLocation.useCase";
import {LogExecution} from "@coreShared/decorators/LogExecution";
import {Transaction} from "sequelize";
import {UpdateLocationDTO, UpdateLocationResponseDTO} from "@location/adapters/dtos/location.dto";
import {ResultType} from "@coreShared/types/result.type";
import {Transactional} from "@coreShared/decorators/Transactional";
import {UseCaseResponseUtil} from "@coreShared/utils/useCaseResponse.util";
import {CountryEntity} from "@location/domain/entities/country.entity";
import {ConflictError, NotFoundError} from "@coreShared/errors/domain.error";
import {EntitiesMessage} from "@coreShared/messages/entities.message";
import {StateEntity} from "@location/domain/entities/state.entity";
import {CityEntity} from "@location/domain/entities/city.entity";
import {CountryDTO} from "@location/adapters/dtos/country.dto";
import {UpdateResultType} from "@coreShared/types/crudResult.type";
import {CityDTO} from "@location/adapters/dtos/city.dto";
import {StateDTO} from "@location/adapters/dtos/state.dto";
import {IStateService} from "@location/domain/services/interfaces/IState.service";
import {ICountryService} from "@location/domain/services/interfaces/ICountry.service";
import {ICityService} from "@location/domain/services/interfaces/ICity.service";

@injectable()
export class UpdateLocationUseCase implements IUpdateLocationUseCase {
    private readonly COUNTRY: string = 'COUNTRY';

    constructor(
        @inject("ICountryService") private readonly countryService: ICountryService,
        @inject("IStateService") private readonly stateService: IStateService,
        @inject("ICityService") private readonly cityService: ICityService,
    ) {

    }

    @LogExecution()
    @Transactional()
    async execute(input: UpdateLocationDTO, transaction?: Transaction): Promise<ResultType<UpdateLocationResponseDTO>> {
        try {
            const {current, update} = input;
            const currentCountry = await this.countryService.getById(current.countryId);
            const currentState = await this.stateService.get({id: current.stateId, countryId: current.countryId});
            const currentCity = await this.cityService.get({id: current.cityId, stateId: current.stateId});

            if (!currentCountry || !currentState || !currentCity) {
                return ResultType.failure(new NotFoundError(EntitiesMessage.error.retrieval.notFoundGeneric));
            }

            const [updatedCountry, updatedState, updatedCity] = await Promise.all([
                this.updateCountry(currentCountry, update.country, transaction),
                this.updateState(currentState, update.state, transaction),
                this.updateCity(currentCity, update.city, transaction),
            ]);

            const anyUpdated: boolean = updatedCountry.updated || updatedState.updated || updatedCity.updated;

            if (!anyUpdated) {
                return ResultType.failure(new ConflictError(EntitiesMessage.error.conflict.duplicateValueGeneric));
            }

            const response: UpdateLocationResponseDTO = this.mapResult(updatedCountry, updatedState, updatedCity);


            return ResultType.success(response);

        } catch (error) {
            return UseCaseResponseUtil.handleResultError(error);
        }
    }

    private async updateCountry(currentCountry: CountryEntity, newData?: CountryDTO, transaction?: Transaction): Promise<UpdateResultType<CountryEntity>> {
        if (!newData) {
            return {entity: currentCountry, updated: false};
        }

        return await this.countryService.updateProperties(currentCountry, newData, transaction!);
    }

    private async updateState(currentState: StateEntity, newData?: StateDTO, transaction?: Transaction): Promise<UpdateResultType<StateEntity>> {
        if (!newData) {
            return {entity: currentState, updated: false};
        }

        return await this.stateService.updateProperties(currentState, newData, transaction!);
    }

    private async updateCity(currentCity: CityEntity, newData?: CityDTO, transaction?: Transaction): Promise<UpdateResultType<CityEntity>> {
        if (!newData) {
            return {entity: currentCity, updated: false};
        }

        return await this.cityService.updateProperties(currentCity, newData, transaction!);
    }

    private mapResult(updatedCountry: UpdateResultType<CountryEntity>, updatedState: UpdateResultType<StateEntity>, updatedCity: UpdateResultType<CityEntity>): UpdateLocationResponseDTO {
        const response: Partial<UpdateLocationResponseDTO> = {};

        if (updatedCountry.updated) {
            response.country = updatedCountry.entity;
        }
        if (updatedState.updated) {
            response.state = updatedState.entity;
        }
        if (updatedCity.updated) {
            response.city = updatedCity.entity;
        }

        return response as UpdateLocationResponseDTO;
    }
}