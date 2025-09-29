import {Router} from "express";
import {asyncHandler} from "@coreShared/middlewares/asyncHandler";
import {IMetadataController} from "@modules/metadata/adapters/controller/IMetadata.controller";
import {makeMetadataController} from "@modules/metadata/adapters/factories/metadataController.factory";
import {GetModelAttributesSchema} from "@modules/metadata/schemas/getModelAttributes.schema";
import {validateRequest} from "@coreShared/middlewares/validateRequest";

const metadataController: IMetadataController = makeMetadataController()
const router = Router();

router.get(
    "/getAttribute/:entityName",
    validateRequest(GetModelAttributesSchema, 'params'),
    asyncHandler((req, res) => metadataController.getModelAttributes(req, res))
);

router.get(
    "/getAllEntitiesNames",
    asyncHandler((req, res) => metadataController.getAllEntitiesNames(req, res))
);

export {router as metadataRouter};
