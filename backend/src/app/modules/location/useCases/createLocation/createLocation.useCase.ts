import {inject, injectable} from "tsyringe";
import {ICreateLocationUseCase} from "@location/useCases/createLocation/ICreateLocation.useCase";
import {LogExecution} from "@coreShared/decorators/LogExecution";
import {Transactional} from "@coreShared/decorators/Transactional";
import {CreateLocationDTO, CreateLocationResponseDTO} from "@location/adapters/dtos/location.dto";
import {Transaction} from "sequelize";
import {ResultType} from "@coreShared/types/result.type";
import {ConflictError} from "@coreShared/errors/domain.error";
import {CreateResultType} from "@coreShared/types/crudResult.type";
import {CountryEntity} from "@location/domain/entities/country.entity";
import {StateEntity} from "@location/domain/entities/state.entity";
import {StateCreateDTO} from "@location/adapters/dtos/state.dto";
import {CityCreateDTO} from "@location/adapters/dtos/city.dto";
import {UseCaseResponseUtil} from "@coreShared/utils/useCaseResponse.util";
import {CityEntity} from "@location/domain/entities/city.entity";
import {EntitiesMessage} from "@coreShared/messages/entities.message";
import {IStateService} from "@location/domain/services/interfaces/IState.service";
import {ICountryService} from "@location/domain/services/interfaces/ICountry.service";
import {ICityService} from "@location/domain/services/interfaces/ICity.service";
import {ErrorMessages} from "@coreShared/messages/errorMessages";


@injectable()
export class CreateLocationUseCase implements ICreateLocationUseCase {
    constructor(
        @inject("ICountryService") private readonly countryService: ICountryService,
        @inject("IStateService") private readonly stateService: IStateService,
        @inject("ICityService") private readonly cityService: ICityService,
    ) {
    }

    @LogExecution()
    @Transactional()
    async execute(input: CreateLocationDTO, transaction?: Transaction): Promise<ResultType<CreateLocationResponseDTO>> {
        if (!transaction) {
            return ResultType.failure(new Error(ErrorMessages.failure.transactionCreation));
        }

        try {
            const countryResult: CreateResultType<CountryEntity> = await this.createCountry(input.country, transaction)
            const stateResult: CreateResultType<StateEntity> = await this.createState(input.state, countryResult.entity.id!, transaction);
            const cityResult: CreateResultType<CityEntity> = await this.createCity(input.city, stateResult.entity.id!, transaction)

            if (!countryResult.created && !stateResult.created && !cityResult.created) {
                return ResultType.failure(new ConflictError(EntitiesMessage.error.conflict.duplicateValueGeneric));
            }

            return ResultType.success({
                country: countryResult.entity.description,
                state: stateResult.entity.description,
                city: cityResult.entity.description
            });
        } catch (error) {
            return UseCaseResponseUtil.handleResultError(error);
        }
    }

    private async createCountry(description: string, transaction: Transaction): Promise<CreateResultType<CountryEntity>> {
        return await this.countryService.createOrGetCountry(description, transaction);
    }

    private async createState(description: string, countryId: number, transaction: Transaction): Promise<CreateResultType<StateEntity>> {
        const stateData: StateCreateDTO = {
            description,
            countryId
        }
        return await this.stateService.createOrGetState(stateData, transaction);
    }

    private async createCity(description: string, stateId: number, transaction: Transaction): Promise<CreateResultType<CityEntity>> {
        const cityData: CityCreateDTO = {
            description,
            stateId
        }
        return await this.cityService.createOrGetCity(cityData, transaction!);
    }
}