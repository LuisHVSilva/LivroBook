import {inject, injectable} from "tsyringe";
import {ILocationController} from "@location/adapters/controllers/interfaces/ILocation.controller";
import {ICountryController} from "@location/adapters/controllers/interfaces/ICountry.controller";
import {IStateController} from "@location/adapters/controllers/interfaces/IState.controller";
import {ICityController} from "@location/adapters/controllers/interfaces/ICity.controller";

@injectable()
export class LocationController implements ILocationController {
    constructor(
        @inject("ICountryController")
        public readonly countryController: ICountryController,
        @inject("IStateController")
        public readonly stateController: IStateController,
        @inject("ICityController")
        public readonly cityController: ICityController,
    ) {
    }

    //#region COUNTRY

    //#endregion

    //#region STATE
    //#endregion

    //#region CITY
    //#endregion
}