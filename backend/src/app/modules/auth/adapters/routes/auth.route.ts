import {Router} from "express";
import {asyncHandler} from "@coreShared/middlewares/asyncHandler";
import {validateRequest} from "@coreShared/middlewares/validateRequest";
import {makeAuthController} from "@modules/auth/adapters/factories/authController.factory";
import {IAuthController} from "@modules/auth/adapters/controllers/IAuth.controller";
import {LoginSchema} from "@modules/auth/schemas/login.schema";

const authController: IAuthController = makeAuthController()
const router = Router();

router.post(
    "/login",
    validateRequest(LoginSchema),
    asyncHandler((req, res) => authController.login(req, res))
);

export {router as authRouter};
