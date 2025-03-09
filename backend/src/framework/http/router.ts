import { Router } from "express";
import {statusRoutes} from "../../app/modules/status/adapters/route/statusRoute";


const router: Router = Router();

// ADMIN URLS
router.use('/admin', statusRoutes);

export { router };

