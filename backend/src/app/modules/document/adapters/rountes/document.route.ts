import {Router} from "express";
import {asyncHandler} from "@coreShared/middlewares/asyncHandler";
import {validateRequest} from "@coreShared/middlewares/validateRequest";
import {makeDocumentTypeController} from "@document/adapters/factories/documentTypeController.factory";
import {CreateDocumentTypeSchema} from "@document/schemas/createDocumentType.schema";
import {FindDocumentTypesSchema} from "@document/schemas/findDocumentTypes.schema";
import {UpdateDocumentTypeSchema} from "@document/schemas/updateDocumentType.schema";
import {deleteDocumentTypesSchema} from "@document/schemas/deleteDocumentTypes.schema";
import {isAbelToAccessMiddleware} from "@coreShared/middlewares/isAbleToAccess.middleware";

const documentTypeController = makeDocumentTypeController()
const router = Router();

router.post(
    "/documentType/create",
    isAbelToAccessMiddleware(),
    validateRequest(CreateDocumentTypeSchema),
    asyncHandler((req, res) => documentTypeController.createDocumentType(req, res))
);

router.get(
    "/documentType/findAll",
    isAbelToAccessMiddleware(),
    validateRequest(FindDocumentTypesSchema, 'query'),
    asyncHandler((req, res) => documentTypeController.findDocumentTypes(req, res))
)

router.patch(
    "/documentType/update",
    isAbelToAccessMiddleware(),
    validateRequest(UpdateDocumentTypeSchema),
    asyncHandler((req, res) => documentTypeController.updateDocumentType(req, res))
)

router.delete(
    "/documentType/delete",
    isAbelToAccessMiddleware(),
    validateRequest(deleteDocumentTypesSchema, 'query'),
    asyncHandler((req, res) => documentTypeController.deleteDocumentTypes(req, res))
)
export {router as document};
