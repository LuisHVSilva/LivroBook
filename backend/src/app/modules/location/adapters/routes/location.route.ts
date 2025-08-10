import {Router} from "express";
import {asyncHandler} from "@coreShared/middlewares/asyncHandler";
import {validateRequest} from "@coreShared/middlewares/validateRequest";
import {makeLocationController} from "@location/adapters/factories/controller.factory";
import {CreateLocationSchema} from "@location/schemas/createLocation.schema";

const locationController = makeLocationController()
const router = Router();

/**
 * @swagger
 * tags:
 *   name: Location
 *   description: Status management in the system. Status can represent different states of an order or workflow.
 */


router.post(
    "/create",
    validateRequest(CreateLocationSchema),
    asyncHandler((req, res) => locationController.createLocation(req, res))
);

router.get(
    "/find",
    asyncHandler((req, res) => locationController.findLocations(req, res))
);

router.patch(
    "/update",
    // validateRequest(UpdateLocationSchema),
    asyncHandler((req, res) => locationController.updateLocation(req, res))
)

router.delete(
    "/delete",
    asyncHandler((req, res) => locationController.deleteLocation(req, res))
)
export {router as locationRouter};
