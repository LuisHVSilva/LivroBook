import {Router} from "express";
import {asyncHandler} from "@coreShared/middlewares/asyncHandler";
import {makeStatusController} from "../factories/controller.factory";
import {validateRequest} from "@coreShared/middlewares/validateRequest";
import {CreateStatusSchema} from "@status/schemas/createStatus.schema";
import {FindStatusesSchema} from "@status/schemas/findStatuses.schema";
import {UpdateStatusSchema} from "@status/schemas/updateStatus.schema";
import {deleteStatusSchema} from "@status/schemas/deleteStatus.schema";

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
 * /api/admin/status/create:
 *   post:
 *     summary: Creating a status
 *     description: Creates a new status in the database, where the status will be INACTIVE by default at creation.
 *     tags:
 *       - Status
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/status/CreateStatusRequest'
 *     responses:
 *       201:
 *         description: Status created successfully.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/status/CreateStatusResponse'
 *       400:
 *         description: Invalid input or malformed request.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       409:
 *         description: Status with the same description already exists.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       500:
 *         description: Internal server error.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
router.post(
    "/create",
    validateRequest(CreateStatusSchema),
    asyncHandler((req, res) => statusController.createStatus(req, res))
);

/**
 * @swagger
 * /api/admin/status/find:
 *   get:
 *     summary: Find statuses
 *     description: Find a list of status based on request parameters. Max entities by page response is 20.
 *     tags:
 *       - Status
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/status/FindStatusesRequest'
 *     responses:
 *       200:
 *         description: Statuses found.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/status/FindStatusesResponse'
 *       400:
 *         description: Invalid input or malformed request.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       500:
 *         description: Internal server error.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
router.get(
    "/findAll",
    validateRequest(FindStatusesSchema, 'query'),
    asyncHandler((req, res) => statusController.findStatuses(req, res))
)

/**
 * @swagger
 * /api/admin/status/update:
 *   patch:
 *     summary: Update status
 *     description: Update status. If update description, the status will be deactivated.
 *     tags:
 *       - Status
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/status/UpdateStatusRequest'
 *     responses:
 *       200:
 *         description: Status updated.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/status/UpdateStatusResponse'
 *       400:
 *         description: Invalid input or malformed request.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       409:
 *         description: Status with the same description already exists.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       500:
 *         description: Internal server error.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
router.patch(
    "/update",
    validateRequest(UpdateStatusSchema),
    asyncHandler((req, res) => statusController.updateStatus(req, res))
)

/**
 * @swagger
 * /api/admin/status/update:
 *   delete:
 *     summary: Delete status
 *     description: Delete status with id.
 *     tags:
 *       - Status
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/status/DeleteStatusRequest'
 *     responses:
 *       200:
 *         description: Status deleted.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/status/DeleteStatusResponse'
 *       400:
 *         description: Invalid input or malformed request.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       500:
 *         description: Internal server error.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
router.delete(
    "/delete",
    validateRequest(deleteStatusSchema, 'query'),
    asyncHandler((req, res) => statusController.deleteStatus(req, res))
)

export {router as statusRoutes};
