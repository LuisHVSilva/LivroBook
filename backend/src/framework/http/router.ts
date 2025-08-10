import {Router} from "express";
import {statusRoutes} from "@status/adapters/routes/status.route";
import {locationRouter} from "@location/adapters/routes/location.route";
import {swaggerSpec} from "../../../swagger/swagger.config";
import swaggerUi from 'swagger-ui-express';
import {documentTypeRouter} from "@document/adapters/rountes/documentType.route";


const router: Router = Router();

router.use('/swagger', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

router.use('/admin/status', statusRoutes);
router.use('/admin/location', locationRouter);
router.use('/admin/documentType', documentTypeRouter);

export {router};
