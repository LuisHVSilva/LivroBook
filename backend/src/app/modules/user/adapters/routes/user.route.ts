import {Router} from "express";
import {validateRequest} from "@coreShared/middlewares/validateRequest";
import {asyncHandler} from "@coreShared/middlewares/asyncHandler";
import {makeUserController} from "@user/adapters/factories/userController.factory";
import {CreateUserTypeSchema} from "@user/schemas/post/createUserType.schema";
import {FindUserTypesSchema} from "@user/schemas/get/findUserTypes.schema";
import {UpdateUserTypeSchema} from "@user/schemas/patch/updateUserType.schema";
import {DeleteUserTypesSchema} from "@user/schemas/delete/deleteUserType.schema";
import {CreateUserCredentialTypeSchema} from "@user/schemas/post/createUserCredentialType.schema";
import {FindUserCredentialTypesSchema} from "@user/schemas/get/findUserCredentialTypes.schema";
import {UpdateUserCredentialTypeSchema} from "@user/schemas/patch/updateUserCredentialType.schema";
import {DeleteUserCredentialTypeSchema} from "@user/schemas/delete/deleteUserCredentialType.schema";
import {FindUserSchema} from "@user/schemas/get/findUser.schema";
import {UpdateUserSchema} from "@user/schemas/patch/updateUser.schema";
import {DeleteUserSchema} from "@user/schemas/delete/deleteUser.schema";
import {isAdminMiddleware} from "@coreShared/middlewares/isAdmin.middleware";
import {CreateUserSchema} from "@user/schemas/post/createUser.schema";

const userController = makeUserController()
const router = Router();

//#region USER TYPE
router.post(
    "/userType/create",
    validateRequest(CreateUserTypeSchema),
    asyncHandler((req, res) => userController.userTypeController.create(req, res))
);

router.get(
    "/userType/findById/:id",
    asyncHandler((req, res) => userController.userTypeController.findById(req, res))
);

router.get(
    "/userType/findAll",
    validateRequest(FindUserTypesSchema, 'query'),
    asyncHandler((req, res) => userController.userTypeController.findAll(req, res))
);

router.patch(
    "/userType/update",
    validateRequest(UpdateUserTypeSchema),
    asyncHandler((req, res) => userController.userTypeController.update(req, res))
);

router.delete(
    "/userType/delete",
    validateRequest(DeleteUserTypesSchema, 'query'),
    asyncHandler((req, res) => userController.userTypeController.delete(req, res))
);
//#endregion

//#region USER CREDENTIAL TYPE
router.post(
    "/userCredentialType/create",
    validateRequest(CreateUserCredentialTypeSchema),
    asyncHandler((req, res) => userController.userCredentialTypeController.create(req, res))
);

router.get(
    "/userCredentialType/findById/:id",
    asyncHandler((req, res) => userController.userCredentialTypeController.findById(req, res))
);

router.get(
    "/userCredentialType/findAll",
    validateRequest(FindUserCredentialTypesSchema, 'query'),
    asyncHandler((req, res) => userController.userCredentialTypeController.findAll(req, res))
);

router.patch(
    "/userCredentialType/update",
    validateRequest(UpdateUserCredentialTypeSchema),
    asyncHandler((req, res) => userController.userCredentialTypeController.update(req, res))
);

router.delete(
    "/userCredentialType/delete",
    validateRequest(DeleteUserCredentialTypeSchema, 'query'),
    asyncHandler((req, res) => userController.userCredentialTypeController.delete(req, res))
);
//#endregion

//#region USER
router.post(
    "/create",
    validateRequest(CreateUserSchema),
    asyncHandler((req, res) => userController.create(req, res))
);

router.get(
    "/findById/:id",
    isAdminMiddleware(),
    validateRequest(FindUserSchema, 'query'),
    asyncHandler((req, res) => userController.findById(req, res))
)


router.get(
    "/findAll",
    isAdminMiddleware(),
    validateRequest(FindUserSchema, 'query'),
    asyncHandler((req, res) => userController.findAll(req, res))
)

router.patch(
    "/update",
    isAdminMiddleware(),
    validateRequest(UpdateUserSchema),
    asyncHandler((req, res) => userController.update(req, res))
)


router.delete(
    "/delete",
    isAdminMiddleware(),
    validateRequest(DeleteUserSchema, 'query'),
    asyncHandler((req, res) => userController.delete(req, res))
)
//#endregion
export {router as userRouter};
