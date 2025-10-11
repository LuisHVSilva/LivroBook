import {Router} from "express";
import {asyncHandler} from "@coreShared/middlewares/asyncHandler";
import {validateRequest} from "@coreShared/middlewares/validateRequest";
import {IPhoneController} from "@phone/adapters/controllers/interfaces/IPhone.controller";
import {makePhoneController} from "@phone/adapters/factories/phoneController.factory";
import {CreatePhoneTypeSchema} from "@phone/schemas/post/createPhoneType.schema";
import {UpdatePhoneTypeSchema} from "@phone/schemas/patch/updatePhoneType.schema";
import {DeletePhoneTypesSchema} from "@phone/schemas/delete/deletePhoneType.schema";
import {CreatePhoneCodeSchema} from "@phone/schemas/post/createPhoneCode.schema";
import {UpdatePhoneCodeSchema} from "@phone/schemas/patch/updatePhoneCode.schema";
import {DeletePhoneCodesSchema} from "@phone/schemas/delete/deletePhoneCodes.schema";
import {CreatePhoneSchema} from "@phone/schemas/post/createPhone.schema";
import {UpdatePhoneSchema} from "@phone/schemas/patch/updatePhone.schema";
import {DeletePhoneSchema} from "@phone/schemas/delete/deletePhone.schema";
import {isAdminMiddleware} from "@coreShared/middlewares/isAdmin.middleware";
import {FindPhoneTypesSchema} from "@phone/schemas/get/findPhoneTypes.schema";
import {FindPhoneTypeByIdSchema} from "@phone/schemas/get/findPhoneTypeById.schema";
import {FindPhoneCodesSchema} from "@phone/schemas/get/findPhoneCodes.schema";
import {FindPhoneCodeByIdSchema} from "@phone/schemas/get/findPhoneCodeById.schema";
import {FindPhonesSchema} from "@phone/schemas/get/findPhones.schema";
import {FindPhoneByIdSchema} from "@phone/schemas/get/findPhoneById.schema";

const phoneController: IPhoneController = makePhoneController()
const router = Router();


//#region PHONE TYPE
router.post(
    "/phoneType/create",
    validateRequest(CreatePhoneTypeSchema),
    isAdminMiddleware(),
    asyncHandler((req, res) => phoneController.phoneTypeController.create(req, res))
);

router.get(
    "/phoneType/findById/:id",
    validateRequest(FindPhoneTypeByIdSchema, "params"),
    asyncHandler((req, res) => phoneController.phoneTypeController.findById(req, res))
)

router.get(
    "/phoneType/findAll",
    validateRequest(FindPhoneTypesSchema, 'query'),
    asyncHandler((req, res) => phoneController.phoneTypeController.findAll(req, res))
)

router.patch(
    "/phoneType/update",
    validateRequest(UpdatePhoneTypeSchema),
    isAdminMiddleware(),
    asyncHandler((req, res) => phoneController.phoneTypeController.update(req, res))
)

router.delete(
    "/phoneType/delete",
    validateRequest(DeletePhoneTypesSchema, 'query'),
    isAdminMiddleware(),
    asyncHandler((req, res) => phoneController.phoneTypeController.delete(req, res))
)
//#endregion

//#region PHONE CODE
router.post(
    "/phoneCode/create",
    validateRequest(CreatePhoneCodeSchema),
    isAdminMiddleware(),
    asyncHandler((req, res) => phoneController.phoneCodeController.create(req, res))
)

router.get(
    "/phoneCode/findById/:id",
    validateRequest(FindPhoneCodeByIdSchema, 'params'),
    isAdminMiddleware(),
    asyncHandler((req, res) => phoneController.phoneCodeController.findById(req, res))
)

router.get(
    "/phoneCode/findAll",
    validateRequest(FindPhoneCodesSchema, 'query'),
    // isAdminMiddleware(),
    asyncHandler((req, res) => phoneController.phoneCodeController.findAll(req, res))
)

router.patch(
    "/phoneCode/update",
    validateRequest(UpdatePhoneCodeSchema),
    isAdminMiddleware(),
    asyncHandler((req, res) => phoneController.phoneCodeController.update(req, res))
)

router.delete(
    "/phoneCode/delete",
    validateRequest(DeletePhoneCodesSchema, 'query'),
    asyncHandler((req, res) => phoneController.phoneCodeController.delete(req, res))
)
//#endregion

//#region PHONE
router.post(
    "/create",
    validateRequest(CreatePhoneSchema),
    asyncHandler((req, res) => phoneController.create(req, res))
)

router.get(
    "/findById/:id",
    validateRequest(FindPhoneByIdSchema, 'params'),
    // isAdminMiddleware(),
    asyncHandler((req, res) => phoneController.findById(req, res))
)

router.get(
    "/findAll",
    validateRequest(FindPhonesSchema, 'query'),
    // isAdminMiddleware(),
    asyncHandler((req, res) => phoneController.findAll(req, res))
)

router.patch(
    "/update",
    validateRequest(UpdatePhoneSchema),
    // isAdminMiddleware(),
    asyncHandler((req, res) => phoneController.update(req, res))
)

router.delete(
    "/delete",
    validateRequest(DeletePhoneSchema, 'query'),
    // isAdminMiddleware(),
    asyncHandler((req, res) => phoneController.delete(req, res))
)
//#endregion

export {router as phoneRoute};
