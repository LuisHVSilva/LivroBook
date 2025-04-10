import { Router, Request, Response } from "express";
import { asyncHandler } from "@coreShared/middlewares/asyncHandler";
import {makeUserTypeController} from "@userType/adapters/factories/controllerFactory";
import {IUserTypeController} from "@userType/adapters/controller/IUserTypeController";

const userTypeController: IUserTypeController = makeUserTypeController();
const router: Router = Router();

/**
 * @swagger
 * tags:
 *   name: UserType
 *   description: Management of user types in the system. UserType represents the user types that exist in the system.
 */

router.post("/usertype/register", asyncHandler((req: Request, res: Response): Promise<Response> =>
    userTypeController.create(req, res)));

export{router as userTypeRouter};