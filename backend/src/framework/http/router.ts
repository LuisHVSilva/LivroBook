import {Router} from "express";
import {swaggerSpec} from "../../../swagger/swagger.config";
import swaggerUi from 'swagger-ui-express';

import {statusRoutes} from "@status/adapters/routes/status.route";
import {locationRouter} from "@location/adapters/routes/location.route";
import {document} from "@document/adapters/rountes/document.route";
import {phoneRoute} from "@phone/adapters/routes/phone.route";
import {userRouter} from "@user/adapters/routes/user.route";
import {authRouter} from "@modules/auth/adapters/routes/auth.route";
import {isAdminMiddleware} from "@coreShared/middlewares/isAdmin.middleware";
import {metadataRouter} from "@modules/metadata/adapters/routes/metadata.route";


const router: Router = Router();

router.use('/swagger', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

router.use('/status', isAdminMiddleware(), statusRoutes);
router.use('/metadata', isAdminMiddleware(), metadataRouter);
router.use('/location', locationRouter);
router.use('/document', document);
router.use('/phone', phoneRoute)
router.use('/user', userRouter)
router.use('/', authRouter);

export {router};
