import {ICountryController} from "@location/adapters/controllers/interfaces/ICountry.controller";
import {IStateController} from "@location/adapters/controllers/interfaces/IState.controller";
import {ICityController} from "@location/adapters/controllers/interfaces/ICity.controller";

export interface ILocationController {
    countryController: ICountryController;

    stateController: IStateController;

    cityController: ICityController;
}