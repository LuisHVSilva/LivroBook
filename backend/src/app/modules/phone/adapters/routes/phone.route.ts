import {Router} from "express";
import {asyncHandler} from "@coreShared/middlewares/asyncHandler";
import {validateRequest} from "@coreShared/middlewares/validateRequest";
import {IPhoneController} from "@phone/adapters/controllers/IPhone.controller";
import {makePhoneController} from "@phone/adapters/factories/phoneController.factory";
import {CreatePhoneTypeSchema} from "@phone/schemas/createPhoneType.schema";

const phoneController: IPhoneController = makePhoneController()
const router = Router();

router.post(
    "/phoneType/create",
    validateRequest(CreatePhoneTypeSchema),
    asyncHandler((req, res) => phoneController.createPhoneType(req, res))
);

export {router as phoneRoute};
