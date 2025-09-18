import {Router} from "express";
import {swaggerSpec} from "../../../swagger/swagger.config";
import swaggerUi from 'swagger-ui-express';

import {statusRoutes} from "@status/adapters/routes/status.route";
import {locationRouter} from "@location/adapters/routes/location.route";
import {documentTypeRouter} from "@document/adapters/rountes/documentType.route";
import {phoneRoute} from "@phone/adapters/routes/phone.route";
import {userRouter} from "@user/adapters/routes/user.route";
import {authRouter} from "@modules/auth/adapters/routes/auth.route";


const router: Router = Router();

router.use('/swagger', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

router.use('/admin/status', statusRoutes);
router.use('/admin/location', locationRouter);
router.use('/admin/documentType', documentTypeRouter);
router.use('/admin/phone', phoneRoute)
router.use('/admin/user', userRouter)
router.use('/auth', authRouter);

export {router};
