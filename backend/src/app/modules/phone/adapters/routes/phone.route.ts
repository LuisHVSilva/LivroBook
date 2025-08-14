import {Router} from "express";
import {asyncHandler} from "@coreShared/middlewares/asyncHandler";
import {validateRequest} from "@coreShared/middlewares/validateRequest";
import {IPhoneController} from "@phone/adapters/controllers/IPhone.controller";
import {makePhoneController} from "@phone/adapters/factories/phoneController.factory";
import {CreatePhoneTypeSchema} from "@phone/schemas/createPhoneType.schema";
import {UpdatePhoneTypeSchema} from "@phone/schemas/updatePhoneType.schema";
import {DeletePhoneTypesSchema} from "@phone/schemas/deletePhoneType.schema";

const phoneController: IPhoneController = makePhoneController()
const router = Router();

router.post(
    "/phoneType/create",
    validateRequest(CreatePhoneTypeSchema),
    asyncHandler((req, res) => phoneController.createPhoneType(req, res))
);

router.get(
    "/phoneType/findAll",
    asyncHandler((req, res) => phoneController.findPhoneTypes(req, res))
)

router.patch(
    "/phoneType/update",
    validateRequest(UpdatePhoneTypeSchema),
    asyncHandler((req, res) => phoneController.updatePhoneType(req, res))
)

router.delete(
    "/phoneType/delete",
    validateRequest(DeletePhoneTypesSchema, 'query'),
    asyncHandler((req, res) => phoneController.deletePhoneTypes(req, res))
)

export {router as phoneRoute};
