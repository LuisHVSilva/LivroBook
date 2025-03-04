import { Router } from "express";
import {statusRoutes} from "../../app/modules/status/adapters/route/statusRoute";


const routes = Router();

// ADMIN URLS
routes.use('admin', statusRoutes);

export { routes };

