import {container} from "tsyringe";
import {CountryMapper} from "@location/infrastructure/mappers/country.mapper";
import {ILocationController} from "@location/adapters/controllers/ILocation.controller";
import {LocationController} from "@location/adapters/controllers/location.controller";
import {CountryRepository} from "@location/infrastructure/repositories/country.repository";
import {StateRepository} from "@location/infrastructure/repositories/state.repository";
import {StateMapper} from "@location/infrastructure/mappers/state.mapper";
import {EntityUniquenessValidator} from "@coreShared/validators/entityUniqueness.validator";
import {StateEntity} from "@location/domain/entities/state.entity";
import {StateModel} from "@location/infrastructure/models/state.model";
import {StateDTO} from "@location/adapters/dtos/state.dto";
import {IBaseRepository} from "@coreShared/interfaces/IBaseRepository";
import {CountryService} from "@location/domain/services/country.service";
import {StateService} from "@location/domain/services/state.service";
import {CityService} from "@location/domain/services/city.service";
import {CountryEntity} from "@location/domain/entities/country.entity";
import {CountryModel} from "@location/infrastructure/models/country.model";
import {CountryDTO} from "@location/adapters/dtos/country.dto";
import {CityEntity} from "@location/domain/entities/city.entity";
import {CityModel} from "@location/infrastructure/models/city.model";
import {CityDTO} from "@location/adapters/dtos/city.dto";
import {CityMapper} from "@location/infrastructure/mappers/city.mapper";
import {ICityRepository} from "@location/infrastructure/repositories/interfaces/ICity.repository";
import {CityRepository} from "@location/infrastructure/repositories/city.repository";
import {ICountryService} from "@location/domain/services/interfaces/ICountry.service";
import {IStateService} from "@location/domain/services/interfaces/IState.service";
import {ICityService} from "@location/domain/services/interfaces/ICity.service";
import {IStateRepository} from "@location/infrastructure/repositories/interfaces/IState.repository";
import {ICountryRepository} from "@location/infrastructure/repositories/interfaces/ICountry.repository";
import {ICreateCountryUseCase} from "@location/useCases/createCountry/ICreateCountry.useCase";
import {CreateCountryUseCase} from "@location/useCases/createCountry/createCountry.useCase";
import {ICreateStateUseCase} from "@location/useCases/createState/ICreateState.useCase";
import {CreateStateUseCase} from "@location/useCases/createState/createState.useCase";
import {ICreateCityUseCase} from "@location/useCases/createCity/ICreateCity.useCase";
import {CreateCityUseCase} from "@location/useCases/createCity/createCity.useCase";
import {IFindCountriesUseCase} from "@location/useCases/findCountries/IFindCountries.useCase";
import {FindCountriesUseCase} from "@location/useCases/findCountries/findCountries.useCase";
import {IFindStatesUseCase} from "@location/useCases/findStates/IFindStates.useCase";
import {FindStatesUseCase} from "@location/useCases/findStates/findStates.useCase";
import {IFindCitiesUseCase} from "@location/useCases/findCities/IFindCities.useCase";
import {FindCitiesUseCase} from "@location/useCases/findCities/findCities.useCase";
import {IUpdateCountryUseCase} from "@location/useCases/updateCountry/IUpdateCountry.UseCase";
import {UpdateCountryUseCase} from "@location/useCases/updateCountry/updateCountry.useCase";
import {IUpdateStateUseCase} from "@location/useCases/updateState/IUpdateState.useCase";
import {UpdateStateUseCase} from "@location/useCases/updateState/updateState.useCase";
import {IUpdateCityUseCase} from "@location/useCases/updateCity/IUpdateCity.useCase";
import {UpdateCityUseCase} from "@location/useCases/updateCity/updateCity.useCase";
import {IDeleteCountryUseCase} from "@location/useCases/deleteCountry/IDeleteCountry.useCase";
import {DeleteCountryUseCase} from "@location/useCases/deleteCountry/deleteCountry.useCase";
import {IDeleteStateUseCase} from "@location/useCases/deleteState/IDeleteState.useCase";
import {DeleteStateUseCase} from "@location/useCases/deleteState/deleteState.useCase";
import {IDeleteCityUseCase} from "@location/useCases/deleteCity/IDeleteCity.useCase";
import {DeleteCityUseCase} from "@location/useCases/deleteCity/deleteCity.useCase";

//#region Domain
container.registerSingleton<ICountryService>("ICountryService", CountryService);
container.registerSingleton<IStateService>("IStateService", StateService);
container.registerSingleton<ICityService>("ICityService", CityService);
//#endregion

//#region UseCases
container.registerSingleton<ICreateCountryUseCase>("ICreateCountryUseCase", CreateCountryUseCase);
container.registerSingleton<IFindCountriesUseCase>("IFindCountriesUseCase", FindCountriesUseCase);
container.registerSingleton<IUpdateCountryUseCase>("IUpdateCountryUseCase", UpdateCountryUseCase);
container.registerSingleton<IDeleteCountryUseCase>("IDeleteCountryUseCase", DeleteCountryUseCase);
container.registerSingleton<ICreateStateUseCase>("ICreateStateUseCase", CreateStateUseCase);
container.registerSingleton<IFindStatesUseCase>("IFindStatesUseCase", FindStatesUseCase);
container.registerSingleton<IUpdateStateUseCase>("IUpdateStateUseCase", UpdateStateUseCase);
container.registerSingleton<IDeleteStateUseCase>("IDeleteStateUseCase", DeleteStateUseCase);
container.registerSingleton<ICreateCityUseCase>("ICreateCityUseCase", CreateCityUseCase);
container.registerSingleton<IFindCitiesUseCase>("IFindCitiesUseCase", FindCitiesUseCase);
container.registerSingleton<IUpdateCityUseCase>("IUpdateCityUseCase", UpdateCityUseCase);
container.registerSingleton<IDeleteCityUseCase>("IDeleteCityUseCase", DeleteCityUseCase);
// #endregion

//#region Mappers
container.registerSingleton<CountryMapper>("CountryMapper", CountryMapper);
container.registerSingleton<StateMapper>("StateMapper", StateMapper);
container.registerSingleton<CityMapper>("CityMapper", CityMapper);
//#endregion

//#region Infrastructure
container.registerSingleton<ICountryRepository>("ICountryRepository", CountryRepository);
container.registerSingleton<IStateRepository>("IStateRepository", StateRepository);
container.registerSingleton<ICityRepository>("ICityRepository", CityRepository);
//#endregion

//#region Adapters
container.registerSingleton<ILocationController>("ILocationController", LocationController);
//#endregion

//#region Validators
container.registerSingleton<EntityUniquenessValidator<CountryEntity, CountryModel, CountryDTO>>("CountryUniquenessValidator", EntityUniquenessValidator);
container.registerSingleton<EntityUniquenessValidator<StateEntity, StateModel, StateDTO>>("StateUniquenessValidator", EntityUniquenessValidator);
container.registerSingleton<EntityUniquenessValidator<CityEntity, CityModel, CityDTO>>("CityUniquenessValidator", EntityUniquenessValidator);

container.registerSingleton<IBaseRepository<any, any, any>>("CountryRepository", CountryRepository);
container.registerSingleton<IBaseRepository<any, any, any>>("StateRepository", StateRepository);
container.registerSingleton<IBaseRepository<any, any, any>>("CityRepository", CityRepository);
//#endregion

export {container};
