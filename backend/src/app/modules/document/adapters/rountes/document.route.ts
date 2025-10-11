import {Router} from "express";
import {asyncHandler} from "@coreShared/middlewares/asyncHandler";
import {validateRequest} from "@coreShared/middlewares/validateRequest";
import {makeDocumentController} from "@document/adapters/factories/documentController.factory";
import {CreateDocumentTypeSchema} from "@document/schemas/post/createDocumentType.schema";
import {FindDocumentTypesSchema} from "@document/schemas/get/findDocumentTypes.schema";
import {UpdateDocumentTypeSchema} from "@document/schemas/patch/updateDocumentType.schema";
import {deleteDocumentTypesSchema} from "@document/schemas/delete/deleteDocumentTypes.schema";
import {isAdminMiddleware} from "@coreShared/middlewares/isAdmin.middleware";
import {FindDocumentTypeByIdSchema} from "@document/schemas/get/findDocumentTypeById.schema";

const documentController = makeDocumentController()
const router = Router();

router.post(
    "/documentType/create",
    validateRequest(CreateDocumentTypeSchema),
    isAdminMiddleware(),
    asyncHandler((req, res) => documentController.documentTypeController.create(req, res))
);

router.get(
    "/documentType/findById/:id",
    validateRequest(FindDocumentTypeByIdSchema, 'params'),
    isAdminMiddleware(),
    asyncHandler((req, res) => documentController.documentTypeController.findById(req, res))
)

router.get(
    "/documentType/findAll",
    validateRequest(FindDocumentTypesSchema, 'query'),
    // isAdminMiddleware(),
    asyncHandler((req, res) => documentController.documentTypeController.findAll(req, res))
)

router.patch(
    "/documentType/update",
    validateRequest(UpdateDocumentTypeSchema),
    isAdminMiddleware(),
    asyncHandler((req, res) => documentController.documentTypeController.update(req, res))
)

router.delete(
    "/documentType/delete",
    validateRequest(deleteDocumentTypesSchema, 'query'),
    isAdminMiddleware(),
    asyncHandler((req, res) => documentController.documentTypeController.delete(req, res))
)
export {router as document};
