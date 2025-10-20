import {Router} from "express";
import {makeLocationController} from "@location/adapters/factories/controller.factory";
import {validateRequest} from "@coreShared/middlewares/validateRequest";
import {asyncHandler} from "@coreShared/middlewares/asyncHandler";
import {DeleteCountrySchema} from "@location/schemas/delete/deleteCountry.schema";
import {DeleteStateSchema} from "@location/schemas/delete/deleteState.schema";
import {DeleteCitySchema} from "@location/schemas/delete/deleteCity.schema";
import {isAdminMiddleware} from "@coreShared/middlewares/isAdmin.middleware";
import {CreateCountrySchema} from "@location/schemas/post/createCountry.schema";
import {FindCountriesSchema} from "@location/schemas/get/findCountries.schema";
import {UpdateCountrySchema} from "@location/schemas/patch/updateCountry.schema";
import {CreateStateSchema} from "@location/schemas/post/createState.schema";
import {FindStatesSchema} from "@location/schemas/get/findStates.schema";
import {UpdateStateSchema} from "@location/schemas/patch/updateState.schema";
import {CreateCitySchema} from "@location/schemas/post/createCity.schema";
import {UpdateCitySchema} from "@location/schemas/patch/updateCity.schema";
import {FindCountryByIdSchema} from "@location/schemas/get/findCountryById.schema";
import {FindStateByIdSchema} from "@location/schemas/get/findStateById.schema";
import {FindCityByIdSchema} from "@location/schemas/get/findCityById.schema";
import {FindCitiesSchema} from "@location/schemas/get/findCities.schema";

const locationController = makeLocationController()
const router = Router();

//#region COUNTRY
router.post(
    "/country/create",
    validateRequest(CreateCountrySchema),
    isAdminMiddleware(),
    asyncHandler((req, res) => locationController.countryController.create(req, res))
);

router.get(
    "/country/findAll",
    validateRequest(FindCountriesSchema, 'query'),
    isAdminMiddleware(),
    asyncHandler((req, res) => locationController.countryController.findAll(req, res))
)

router.get(
    "/country/findById/:id",
    validateRequest(FindCountryByIdSchema, 'params'),
    isAdminMiddleware(),
    asyncHandler((req, res) => locationController.countryController.findById(req, res))
)

router.patch(
    "/country/update",
    validateRequest(UpdateCountrySchema),
    isAdminMiddleware(),
    asyncHandler((req, res) => locationController.countryController.update(req, res))
)

router.delete(
    "/country/delete",
    validateRequest(DeleteCountrySchema, 'query'),
    isAdminMiddleware(),
    asyncHandler((req, res) => locationController.countryController.delete(req, res))
)
//#endregion

//#region STATE
router.post(
    "/state/create",
    validateRequest(CreateStateSchema),
    isAdminMiddleware(),
    asyncHandler((req, res) => locationController.stateController.create(req, res))
);

router.get(
    "/state/findById/:id",
    validateRequest(FindStateByIdSchema, 'params'),
    asyncHandler((req, res) => locationController.stateController.findById(req, res))
)

router.get(
    "/state/findAll",
    validateRequest(FindStatesSchema, 'query'),
    asyncHandler((req, res) => locationController.stateController.findAll(req, res))
)

router.patch(
    "/state/update",
    validateRequest(UpdateStateSchema),
    isAdminMiddleware(),
    asyncHandler((req, res) => locationController.stateController.update(req, res))
)

router.delete(
    "/state/delete",
    validateRequest(DeleteStateSchema, 'query'),
    // isAdminMiddleware(),
    asyncHandler((req, res) => locationController.stateController.delete(req, res))
)
//#endregion

//#region CITY
router.post(
    "/city/create",
    validateRequest(CreateCitySchema),
    isAdminMiddleware(),
    asyncHandler((req, res) => locationController.cityController.create(req, res))
);

router.get(
    "/city/findById/:id",
    validateRequest(FindCityByIdSchema, 'params'),
    asyncHandler((req, res) => locationController.cityController.findById(req, res))
)

router.get(
    "/city/findAll",
    validateRequest(FindCitiesSchema, 'query'),
    asyncHandler((req, res) => locationController.cityController.findAll(req, res))
)

router.patch(
    "/city/update",
    validateRequest(UpdateCitySchema),
    isAdminMiddleware(),
    asyncHandler((req, res) => locationController.cityController.update(req, res))
)

router.delete(
    "/city/delete",
    validateRequest(DeleteCitySchema, 'query'),
    isAdminMiddleware(),
    asyncHandler((req, res) => locationController.cityController.delete(req, res))
)
//#endregion

export {router as locationRouter};
