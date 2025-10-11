import {inject, injectable} from "tsyringe";
import {ControllerBase} from "@coreShared/base/controller.base";
import {ICountryController} from "@location/adapters/controllers/interfaces/ICountry.controller";
import {CountryAbstractControllerBaseType} from "@location/adapters/dtos/country.dto";
import {ICreateCountryUseCase} from "@location/useCases/create/createCountry/ICreateCountry.useCase";
import {IFindCountriesUseCase} from "@location/useCases/read/findCountries/IFindCountries.useCase";
import {IUpdateCountryUseCase} from "@location/useCases/update/updateCountry/IUpdateCountry.UseCase";
import {IDeleteCountryUseCase} from "@location/useCases/delete/deleteCountry/IDeleteCountry.useCase";
import {IFindCountryByIdUseCase} from "@location/useCases/read/findCountryById/IFindCountryById.useCase";

@injectable()
export class CountryController extends ControllerBase<CountryAbstractControllerBaseType> implements ICountryController {
    constructor(
        @inject("ICreateCountryUseCase") protected readonly createCountryUseCase: ICreateCountryUseCase,
        @inject("IFindCountryByIdUseCase") protected readonly findCountryByIdUseCase: IFindCountryByIdUseCase,
        @inject("IFindCountriesUseCase") protected readonly findCountriesUseCase: IFindCountriesUseCase,
        @inject("IUpdateCountryUseCase") protected readonly updateCountryUseCase: IUpdateCountryUseCase,
        @inject("IDeleteCountryUseCase") protected readonly deleteCountryUseCase: IDeleteCountryUseCase,
    ) {
        super(
            createCountryUseCase,
            findCountryByIdUseCase,
            findCountriesUseCase,
            updateCountryUseCase,
            deleteCountryUseCase
        )
    }
}