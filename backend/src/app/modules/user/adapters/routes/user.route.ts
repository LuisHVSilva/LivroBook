import {Router} from "express";
import {validateRequest} from "@coreShared/middlewares/validateRequest";
import {asyncHandler} from "@coreShared/middlewares/asyncHandler";
import {makeUserController} from "@user/adapters/factories/userController.factory";
import {CreateUserTypeSchema} from "@user/schemas/createUserType.schema";
import {FindUserTypesSchema} from "@user/schemas/findUserTypes.schema";
import {UpdateUserTypeSchema} from "@user/schemas/updateUserType.schema";
import {DeleteUserTypesSchema} from "@user/schemas/deleteUserType.schema";
import {CreateUserCredentialTypeSchema} from "@user/schemas/createUserCredentialType.schema";
import {FindUserCredentialTypesSchema} from "@user/schemas/findUserCredentialTypes.schema";
import {UpdateUserCredentialTypeSchema} from "@user/schemas/updateUserCredentialType.schema";
import {DeleteUserCredentialTypeSchema} from "@user/schemas/deleteUserCredentialType.schema";

const userController = makeUserController()
const router = Router();

//#region USER TYPE
router.post(
    "/userType/create",
    validateRequest(CreateUserTypeSchema),
    asyncHandler((req, res) => userController.createUserType(req, res))
);

router.get(
    "/userType/findAll",
    validateRequest(FindUserTypesSchema, 'query'),
    asyncHandler((req, res) => userController.findUserTypes(req, res))
)

router.patch(
    "/userType/update",
    validateRequest(UpdateUserTypeSchema),
    asyncHandler((req, res) => userController.updateUserType(req, res))
)

router.delete(
    "/userType/delete",
    validateRequest(DeleteUserTypesSchema, 'query'),
    asyncHandler((req, res) => userController.deleteUserTypes(req, res))
)
//#endregion

//#region USER CREDENTIAL TYPE
router.post(
    "/userCredentialType/create",
    validateRequest(CreateUserCredentialTypeSchema),
    asyncHandler((req, res) => userController.createUserCredentialType(req, res))
);

router.get(
    "/userCredentialType/findAll",
    validateRequest(FindUserCredentialTypesSchema, 'query'),
    asyncHandler((req, res) => userController.findUserCredentialType(req, res))
)

router.patch(
    "/userCredentialType/update",
    validateRequest(UpdateUserCredentialTypeSchema),
    asyncHandler((req, res) => userController.updateUserCredentialType(req, res))
)

router.delete(
    "/userCredentialType/delete",
    validateRequest(DeleteUserCredentialTypeSchema, 'query'),
    asyncHandler((req, res) => userController.deleteUserCredentialType(req, res))
)
//#endregion

//#endregion
export {router as userRouter};
