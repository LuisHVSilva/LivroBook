import { Router } from "express";
import {statusRoutes} from "@status/adapters/statusRoute";
import {userTypeRouter} from "@userType/adapters/userTypeRouter";


const router: Router = Router();

// ADMIN URLS
router.use('/admin', statusRoutes);
router.use('/admin', userTypeRouter);
export { router };

