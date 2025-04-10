import { Router, Request, Response } from "express";
import { asyncHandler } from "@coreShared/middlewares/asyncHandler";
import { makeStatusController } from "./factories/controllerFactory";

const statusController = makeStatusController();
const router = Router();

/**
 * @swagger
 * tags:
 *   name: Status
 *   description: Status management in the system. Status can represent different states of an order or workflow.
 */

/**
 * @swagger
 * /api/admin/status:
 *   post:
 *     summary: Creating a status
 *     description: Creates a new status in the database, where the status, by default, will always be INACTIVE
 *      at the time of its creation
 *     tags: [Status]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/StatusRequests/properties/Create'
 *     responses:
 *       201:
 *         description: Status created successfully.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Status'
 */
router.post("/status", asyncHandler((req: Request, res: Response): Promise<Response> =>
    statusController.createStatus(req, res)));

/**
 * @swagger
 * /api/admin/status/{id}:
 *   get:
 *     summary: Get a status by ID
 *     description: Returns details of a specific status by ID
 *     tags: [Status]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Status ID to be queried
 *     responses:
 *       200:
 *         description: Status Found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Status'
 *       404:
 *         description: Status not found
 */
router.get("/status/:id", asyncHandler((req: Request, res: Response): Promise<Response> =>
    statusController.getStatusById(req, res)));

/**
 * @swagger
 * /api/admin/status/description/{id}:
 *   patch:
 *     summary: Update a status description
 *     description: Updates the description of a status by ID
 *     tags: [Status]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the status to be updated
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/StatusRequests/properties/UpdateDescription'
 *     responses:
 *       200:
 *         description: Description updated successfully
 *       400:
 *         description: Request error
 */
router.patch("/status/description/:id", asyncHandler((req: Request, res: Response): Promise<Response> =>
    statusController.updateDescription(req, res)));

/**
 * @swagger
 * /api/admin/status/active/{id}:
 *   patch:
 *     summary: Update active/inactive status
 *     description: Activate or deactivate a status by ID
 *     tags: [Status]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the status to be updated
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/StatusRequests/properties/UpdateActive'
 *     responses:
 *       200:
 *         description: Status updated successfully
 *       400:
 *         description: Request error
 */
router.patch("/status/active/:id", asyncHandler((req: Request, res: Response): Promise<Response> =>
    statusController.updateActive(req, res)));


export { router as statusRoutes };
