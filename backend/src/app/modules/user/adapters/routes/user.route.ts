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
import {CreateUserCredentialSchema} from "@user/schemas/createUserCredential.schema";
import {UpdateUserCredentialSchema} from "@user/schemas/updateUserCredential.schema";
import {DeleteUserCredentialSchema} from "@user/schemas/deleteUserCredential.schema";
import {CreateUserSchema} from "@user/schemas/createUser.schema";
import {FindUserSchema} from "@user/schemas/findUser.schema";
import {UpdateUserSchema} from "@user/schemas/updateUser.schema";
import {DeleteUserSchema} from "@user/schemas/deleteUser.schema";

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

//#region USER CREDENTIAL
router.post(
    "/userCredential/create",
    validateRequest(CreateUserCredentialSchema),
    asyncHandler((req, res) => userController.createUserCredential(req, res))
);

router.patch(
    "/userCredential/update",
    validateRequest(UpdateUserCredentialSchema),
    asyncHandler((req, res) => userController.updateUserCredential(req, res))
)


router.delete(
    "/userCredential/delete",
    validateRequest(DeleteUserCredentialSchema, 'query'),
    asyncHandler((req, res) => userController.deleteUserCredential(req, res))
)
//#endregion

//#region USER
router.post(
    "/user/create",
    validateRequest(CreateUserSchema),
    asyncHandler((req, res) => userController.createUser(req, res))
);

router.get(
    "/user/findAll",
    validateRequest(FindUserSchema, 'query'),
    asyncHandler((req, res) => userController.findUsers(req, res))
)

router.patch(
    "/user/update",
    validateRequest(UpdateUserSchema),
    asyncHandler((req, res) => userController.updateUser(req, res))
)


router.delete(
    "/user/delete",
    validateRequest(DeleteUserSchema, 'query'),
    asyncHandler((req, res) => userController.deleteUser(req, res))
)
//#endregion
export {router as userRouter};
