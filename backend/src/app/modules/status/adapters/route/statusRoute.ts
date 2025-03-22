import {Router} from "express";
import {Request, Response} from "express";
import {asyncHandler} from "@coreShared/middlewares/asyncHandler";
import {makeStatusController} from "../factories/controllerFactory";


const statusController = makeStatusController();
const router = Router();

router.post("/status", asyncHandler((req: Request, res: Response): Promise<Response> =>
    statusController.createStatus(req, res)));

router.get("/status/:id", asyncHandler((req: Request, res: Response): Promise<Response> =>
    statusController.getStatusById(req, res)));

router.patch("/status", asyncHandler((req: Request, res: Response): Promise<Response> =>
    statusController.updateDescription(req, res)));

export {router as statusRoutes};
