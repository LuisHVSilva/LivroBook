import {container} from "tsyringe";
import {ILocationController} from "@location/adapters/controllers/interfaces/ILocation.controller";
import {LocationController} from "@location/adapters/controllers/location.controller";
import {CountryRepository} from "@location/infrastructure/repositories/country.repository";
import {StateRepository} from "@location/infrastructure/repositories/state.repository";
import {EntityUniquenessValidator} from "@coreShared/validators/entityUniqueness.validator";
import {IRepositoryBase} from "@coreShared/base/interfaces/IRepositoryBase";
import {CountryService} from "@location/domain/services/country.service";
import {StateService} from "@location/domain/services/state.service";
import {CityService} from "@location/domain/services/city.service";
import {ICityRepository} from "@location/infrastructure/repositories/interfaces/ICity.repository";
import {CityRepository} from "@location/infrastructure/repositories/city.repository";
import {ICountryService} from "@location/domain/services/interfaces/ICountry.service";
import {IStateService} from "@location/domain/services/interfaces/IState.service";
import {ICityService} from "@location/domain/services/interfaces/ICity.service";
import {IStateRepository} from "@location/infrastructure/repositories/interfaces/IState.repository";
import {ICountryRepository} from "@location/infrastructure/repositories/interfaces/ICountry.repository";
import {ICreateCountryUseCase} from "@location/useCases/create/createCountry/ICreateCountry.useCase";
import {CreateCountryUseCase} from "@location/useCases/create/createCountry/createCountry.useCase";
import {ICreateStateUseCase} from "@location/useCases/create/createState/ICreateState.useCase";
import {CreateStateUseCase} from "@location/useCases/create/createState/createState.useCase";
import {ICreateCityUseCase} from "@location/useCases/create/createCity/ICreateCity.useCase";
import {CreateCityUseCase} from "@location/useCases/create/createCity/createCity.useCase";
import {IFindCountriesUseCase} from "@location/useCases/read/findCountries/IFindCountries.useCase";
import {FindCountriesUseCase} from "@location/useCases/read/findCountries/findCountries.useCase";
import {IFindStatesUseCase} from "@location/useCases/read/findStates/IFindStates.useCase";
import {FindStatesUseCase} from "@location/useCases/read/findStates/findStates.useCase";
import {IFindCitiesUseCase} from "@location/useCases/read/findCities/IFindCities.useCase";
import {FindCitiesUseCase} from "@location/useCases/read/findCities/findCities.useCase";
import {IUpdateCountryUseCase} from "@location/useCases/update/updateCountry/IUpdateCountry.UseCase";
import {UpdateCountryUseCase} from "@location/useCases/update/updateCountry/updateCountry.useCase";
import {IUpdateStateUseCase} from "@location/useCases/update/updateState/IUpdateState.useCase";
import {UpdateStateUseCase} from "@location/useCases/update/updateState/updateState.useCase";
import {IUpdateCityUseCase} from "@location/useCases/update/updateCity/IUpdateCity.useCase";
import {UpdateCityUseCase} from "@location/useCases/update/updateCity/updateCity.useCase";
import {IDeleteCountryUseCase} from "@location/useCases/delete/deleteCountry/IDeleteCountry.useCase";
import {DeleteCountryUseCase} from "@location/useCases/delete/deleteCountry/deleteCountry.useCase";
import {IDeleteStateUseCase} from "@location/useCases/delete/deleteState/IDeleteState.useCase";
import {DeleteStateUseCase} from "@location/useCases/delete/deleteState/deleteState.useCase";
import {IDeleteCityUseCase} from "@location/useCases/delete/deleteCity/IDeleteCity.useCase";
import {DeleteCityUseCase} from "@location/useCases/delete/deleteCity/deleteCity.useCase";
import {CountryModel} from "@location/infrastructure/models/country.model";
import {ModelStatic} from "sequelize";
import {StateModel} from "@location/infrastructure/models/state.model";
import {CityModel} from "@location/infrastructure/models/city.model";
import {CountryBaseRepositoryType} from "@location/adapters/dtos/country.dto";
import {StateBaseRepositoryType} from "@location/adapters/dtos/state.dto";
import {CityBaseRepositoryType} from "@location/adapters/dtos/city.dto";
import {IFindCountryByIdUseCase} from "@location/useCases/read/findCountryById/IFindCountryById.useCase";
import {FindCountryByIdUseCase} from "@location/useCases/read/findCountryById/findCountryById.useCase";
import {ICountryController} from "@location/adapters/controllers/interfaces/ICountry.controller";
import {CountryController} from "@location/adapters/controllers/country.controller";
import {FindStateByIdUseCase} from "@location/useCases/read/findStateById/findStateById.useCase";
import {IFindStateByIdUseCase} from "@location/useCases/read/findStateById/IFindStateById.useCase";
import {StateController} from "@location/adapters/controllers/state.controller";
import {IStateController} from "@location/adapters/controllers/interfaces/IState.controller";
import {FindCityByIdUseCase} from "@location/useCases/read/findCityById/findCityById.useCase";
import {IFindCityByIdUseCase} from "@location/useCases/read/findCityById/IFindCityById.useCase";
import {CityController} from "@location/adapters/controllers/city.controller";
import {ICityController} from "@location/adapters/controllers/interfaces/ICity.controller";

//#region Domain
container.registerSingleton<ICountryService>("ICountryService", CountryService);
container.registerSingleton<IStateService>("IStateService", StateService);
container.registerSingleton<ICityService>("ICityService", CityService);
//#endregion

//#region UseCases
container.registerSingleton<ICreateCountryUseCase>("ICreateCountryUseCase", CreateCountryUseCase);
container.registerSingleton<IFindCountryByIdUseCase>("IFindCountryByIdUseCase", FindCountryByIdUseCase);
container.registerSingleton<IFindCountriesUseCase>("IFindCountriesUseCase", FindCountriesUseCase);
container.registerSingleton<IUpdateCountryUseCase>("IUpdateCountryUseCase", UpdateCountryUseCase);
container.registerSingleton<IDeleteCountryUseCase>("IDeleteCountryUseCase", DeleteCountryUseCase);

container.registerSingleton<ICreateStateUseCase>("ICreateStateUseCase", CreateStateUseCase);
container.registerSingleton<IFindStatesUseCase>("IFindStatesUseCase", FindStatesUseCase);
container.registerSingleton<IFindStateByIdUseCase>("IFindStateByIdUseCase", FindStateByIdUseCase);
container.registerSingleton<IUpdateStateUseCase>("IUpdateStateUseCase", UpdateStateUseCase);
container.registerSingleton<IDeleteStateUseCase>("IDeleteStateUseCase", DeleteStateUseCase);

container.registerSingleton<ICreateCityUseCase>("ICreateCityUseCase", CreateCityUseCase);
container.registerSingleton<IFindCityByIdUseCase>("IFindCityByIdUseCase", FindCityByIdUseCase);
container.registerSingleton<IFindCitiesUseCase>("IFindCitiesUseCase", FindCitiesUseCase);
container.registerSingleton<IUpdateCityUseCase>("IUpdateCityUseCase", UpdateCityUseCase);
container.registerSingleton<IDeleteCityUseCase>("IDeleteCityUseCase", DeleteCityUseCase);
// #endregion

//#region Infrastructure
container.register<ModelStatic<CountryModel>>("CountryModel", {useValue: CountryModel});
container.registerSingleton<ICountryRepository>("ICountryRepository", CountryRepository);
container.register<ModelStatic<StateModel>>("StateModel", {useValue: StateModel});
container.registerSingleton<IStateRepository>("IStateRepository", StateRepository);
container.register<ModelStatic<CityModel>>("CityModel", {useValue: CityModel});
container.registerSingleton<ICityRepository>("ICityRepository", CityRepository);
//#endregion

//#region Adapters
container.registerSingleton<ILocationController>("ILocationController", LocationController);
container.registerSingleton<ICountryController>("ICountryController", CountryController);
container.registerSingleton<IStateController>("IStateController", StateController);
container.registerSingleton<ICityController>("ICityController", CityController);
//#endregion

//#region Validators
container.registerSingleton<EntityUniquenessValidator<CountryBaseRepositoryType>>("CountryUniquenessValidator", EntityUniquenessValidator);
container.registerSingleton<EntityUniquenessValidator<StateBaseRepositoryType>>("StateUniquenessValidator", EntityUniquenessValidator);
container.registerSingleton<EntityUniquenessValidator<CityBaseRepositoryType>>("CityUniquenessValidator", EntityUniquenessValidator);

container.registerSingleton<IRepositoryBase<CountryBaseRepositoryType>>("CountryRepository", CountryRepository);
container.registerSingleton<IRepositoryBase<StateBaseRepositoryType>>("StateRepository", StateRepository);
container.registerSingleton<IRepositoryBase<CityBaseRepositoryType>>("CityRepository", CityRepository);
//#endregion

export {container};
