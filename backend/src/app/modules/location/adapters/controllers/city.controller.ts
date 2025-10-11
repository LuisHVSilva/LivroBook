import {inject, injectable} from "tsyringe";
import {ControllerBase} from "@coreShared/base/controller.base";
import {ICreateCityUseCase} from "@location/useCases/create/createCity/ICreateCity.useCase";
import {IDeleteCityUseCase} from "@location/useCases/delete/deleteCity/IDeleteCity.useCase";
import {IFindCityByIdUseCase} from "@location/useCases/read/findCityById/IFindCityById.useCase";
import {CityAbstractControllerBaseType} from "@location/adapters/dtos/city.dto";
import {ICityController} from "@location/adapters/controllers/interfaces/ICity.controller";
import {IUpdateCityUseCase} from "@location/useCases/update/updateCity/IUpdateCity.useCase";
import {IFindCitiesUseCase} from "@location/useCases/read/findCities/IFindCities.useCase";

@injectable()
export class CityController extends ControllerBase<CityAbstractControllerBaseType> implements ICityController {
    constructor(
        @inject("ICreateCityUseCase") protected readonly createCityUseCase: ICreateCityUseCase,
        @inject("IFindCityByIdUseCase") protected readonly findCityByIdUseCase: IFindCityByIdUseCase,
        @inject("IFindCitiesUseCase") protected readonly findCitiesUseCase: IFindCitiesUseCase,
        @inject("IUpdateCityUseCase") protected readonly updateCityUseCase: IUpdateCityUseCase,
        @inject("IDeleteCityUseCase") protected readonly deleteCityUseCase: IDeleteCityUseCase,
    ) {
        super(
            createCityUseCase,
            findCityByIdUseCase,
            findCitiesUseCase,
            updateCityUseCase,
            deleteCityUseCase
        )
    }
}