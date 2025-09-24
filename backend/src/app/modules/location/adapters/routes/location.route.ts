import {Router} from "express";
import {makeLocationController} from "@location/adapters/factories/controller.factory";
import {validateRequest} from "@coreShared/middlewares/validateRequest";
import {asyncHandler} from "@coreShared/middlewares/asyncHandler";
import {CreateCountrySchema} from "@location/schemas/createCountry.schema";
import {CreateStateSchema} from "@location/schemas/createState.schema";
import {CreateCitySchema} from "@location/schemas/createCity.schema";
import {FindCountriesSchema} from "@location/schemas/findCountries.schema";
import {FindStatesSchema} from "@location/schemas/findStates.schema";
import {FindCitiesSchema} from "@location/schemas/findCities.schema";
import {UpdateCountrySchema} from "@location/schemas/updateCountry.schema";
import {UpdateStateSchema} from "@location/schemas/updateState.schema";
import {UpdateCitySchema} from "@location/schemas/updateCity.schema";
import {DeleteCountrySchema} from "@location/schemas/deleteCountry.schema";
import {DeleteStateSchema} from "@location/schemas/deleteState.schema";
import {DeleteCitySchema} from "@location/schemas/deleteCity.schema";
import {isAbelToAccessMiddleware} from "@coreShared/middlewares/isAbleToAccess.middleware";

const locationController = makeLocationController()
const router = Router();

//#region COUNTRY
router.post(
    "/country/create",
    validateRequest(CreateCountrySchema),
    isAbelToAccessMiddleware(),
    asyncHandler((req, res) => locationController.createCountry(req, res))
);

router.get(
    "/country/findAll",
    isAbelToAccessMiddleware(),
    validateRequest(FindCountriesSchema, 'query'),
    asyncHandler((req, res) => locationController.findCountries(req, res))
)

router.patch(
    "/country/update",
    validateRequest(UpdateCountrySchema),
    isAbelToAccessMiddleware(),
    asyncHandler((req, res) => locationController.updateCountry(req, res))
)

router.delete(
    "/country/delete",
    validateRequest(DeleteCountrySchema, 'query'),
    isAbelToAccessMiddleware(),
    asyncHandler((req, res) => locationController.deleteCountry(req, res))
)
//#endregion

//#region STATE
router.post(
    "/state/create",
    validateRequest(CreateStateSchema),
    isAbelToAccessMiddleware(),
    asyncHandler((req, res) => locationController.createState(req, res))
);

router.get(
    "/state/findAll",
    validateRequest(FindStatesSchema, 'query'),
    asyncHandler((req, res) => locationController.findStates(req, res))
)

router.patch(
    "/state/update",
    validateRequest(UpdateStateSchema),
    isAbelToAccessMiddleware(),
    asyncHandler((req, res) => locationController.updateState(req, res))
)

router.delete(
    "/state/delete",
    validateRequest(DeleteStateSchema, 'query'),
    isAbelToAccessMiddleware(),
    asyncHandler((req, res) => locationController.deleteState(req, res))
)
//#endregion

//#region CITY
router.post(
    "/city/create",
    validateRequest(CreateCitySchema),
    isAbelToAccessMiddleware(),
    asyncHandler((req, res) => locationController.createCity(req, res))
);

router.get(
    "/city/findAll",
    validateRequest(FindCitiesSchema, 'query'),
    asyncHandler((req, res) => locationController.findCities(req, res))
)

router.patch(
    "/city/update",
    validateRequest(UpdateCitySchema),
    isAbelToAccessMiddleware(),
    asyncHandler((req, res) => locationController.updateCity(req, res))
)

router.delete(
    "/admin/city/delete",
    validateRequest(DeleteCitySchema, 'query'),
    isAbelToAccessMiddleware(),
    asyncHandler((req, res) => locationController.deleteCity(req, res))
)
//#endregion

export {router as locationRouter};
