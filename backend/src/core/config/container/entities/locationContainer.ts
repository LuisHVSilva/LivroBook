import {container} from "tsyringe";
import {CountryMapper} from "@location/infrastructure/mappers/country.mapper";
import {ICountryRepository} from "@location/infrastructure/repositories/interfaces/ICountry.repository";
import {ILocationController} from "@location/adapters/controllers/ILocation.controller";
import {LocationController} from "@location/adapters/controllers/location.controller";
import {CountryRepository} from "@location/infrastructure/repositories/country.repository";
import {IStateRepository} from "@location/infrastructure/repositories/interfaces/IState.repository";
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
import {ICreateLocationUseCase} from "@location/useCases/createLocation/ICreateLocation.useCase";
import {CreateLocationUseCase} from "@location/useCases/createLocation/createLocation.useCase";
import {CountryEntity} from "@location/domain/entities/country.entity";
import {CountryModel} from "@location/infrastructure/models/country.model";
import {CountryDTO} from "@location/adapters/dtos/country.dto";
import {CityEntity} from "@location/domain/entities/city.entity";
import {CityModel} from "@location/infrastructure/models/city.model";
import {CityDTO} from "@location/adapters/dtos/city.dto";
import {CityMapper} from "@location/infrastructure/mappers/city.mapper";
import {ICityRepository} from "@location/infrastructure/repositories/interfaces/ICity.repository";
import {CityRepository} from "@location/infrastructure/repositories/city.repository";
import {IFindLocationsUseCase} from "@location/useCases/findLocations/IFindLocations.useCase";
import {FindLocationsUseCase} from "@location/useCases/findLocations/findLocations.useCase";
import {IUpdateLocationUseCase} from "@location/useCases/updateLocation/IUpdateLocation.useCase";
import {UpdateLocationUseCase} from "@location/useCases/updateLocation/updateLocation.useCase";
import {IDeleteLocationsUseCase} from "@location/useCases/deleteLocations/IDeleteLocations.useCase";
import {DeleteLocationsUseCase} from "@location/useCases/deleteLocations/deleteLocations.useCase";
import {ICountryService} from "@location/domain/services/interfaces/ICountry.service";
import {IStateService} from "@location/domain/services/interfaces/IState.service";
import {ICityService} from "@location/domain/services/interfaces/ICity.service";

//#region Domain
container.registerSingleton<ICountryService>("ICountryService", CountryService);
container.registerSingleton<IStateService>("IStateService", StateService);
container.registerSingleton<ICityService>("ICityService", CityService);
//#endregion

//#region UseCases
container.registerSingleton<ICreateLocationUseCase>("ICreateLocationUseCase", CreateLocationUseCase);
container.registerSingleton<IFindLocationsUseCase>("IFindLocationsUseCase", FindLocationsUseCase);
container.registerSingleton<IUpdateLocationUseCase>("IUpdateLocationUseCase", UpdateLocationUseCase);
container.registerSingleton<IDeleteLocationsUseCase>("IDeleteLocationsUseCase", DeleteLocationsUseCase);
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
