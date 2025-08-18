import {Router} from "express";
import {asyncHandler} from "@coreShared/middlewares/asyncHandler";
import {validateRequest} from "@coreShared/middlewares/validateRequest";
import {IPhoneController} from "@phone/adapters/controllers/IPhone.controller";
import {makePhoneController} from "@phone/adapters/factories/phoneController.factory";
import {CreatePhoneTypeSchema} from "@phone/schemas/createPhoneType.schema";
import {UpdatePhoneTypeSchema} from "@phone/schemas/updatePhoneType.schema";
import {DeletePhoneTypesSchema} from "@phone/schemas/deletePhoneType.schema";
import {CreatePhoneCodeSchema} from "@phone/schemas/createPhoneCode.schema";
import {UpdatePhoneCodeSchema} from "@phone/schemas/updatePhoneCode.schema";
import {DeletePhoneCodesSchema} from "@phone/schemas/deletePhoneCodes.schema";
import {CreatePhoneSchema} from "@phone/schemas/createPhone.schema";
import {UpdatePhoneSchema} from "@phone/schemas/updatePhone.schema";
import {DeletePhoneSchema} from "@phone/schemas/deletePhone.schema";

const phoneController: IPhoneController = makePhoneController()
const router = Router();


//#region PHONE TYPE
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
//#endregion

//#region PHONE CODE
router.post(
    "/phoneCode/create",
    validateRequest(CreatePhoneCodeSchema),
    asyncHandler((req, res) => phoneController.createPhoneCode(req, res))
)

router.get(
    "/phoneCode/findAll",
    asyncHandler((req, res) => phoneController.findPhoneCodes(req, res))
)

router.patch(
    "/phoneCode/update",
    validateRequest(UpdatePhoneCodeSchema),
    asyncHandler((req, res) => phoneController.updatePhoneCode(req, res))
)

router.delete(
    "/phoneCode/delete",
    validateRequest(DeletePhoneCodesSchema, 'query'),
    asyncHandler((req, res) => phoneController.deletePhoneCodes(req, res))
)
//#endregion

//#region PHONE
router.post(
    "/create",
    validateRequest(CreatePhoneSchema),
    asyncHandler((req, res) => phoneController.createPhone(req, res))
)

router.get(
    "/findAll",
    asyncHandler((req, res) => phoneController.findPhones(req, res))
)

router.patch(
    "/update",
    validateRequest(UpdatePhoneSchema),
    asyncHandler((req, res) => phoneController.updatePhone(req, res))
)

router.delete(
    "/delete",
    validateRequest(DeletePhoneSchema, 'query'),
    asyncHandler((req, res) => phoneController.deletePhone(req, res))
)
//#endregion

export {router as phoneRoute};
