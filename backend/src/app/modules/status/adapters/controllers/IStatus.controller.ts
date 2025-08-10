import { Request, Response } from "express";

export interface IStatusController {
    /**
     * Register a new status.
     *
     * @param req - Request object containing new status data.
     * @param res - Response object used to return the creation result.
     * @returns A Promise that resolves when the operation completes.
     */
    createStatus(req: Request, res: Response): Promise<Response>;

    /**
     * Retrieve all statuses with pagination and filtering options.
     *
     * @param req - Request object containing pagination and filter parameters.
     * @param res - Response object used to return the list of statuses.
     * @returns A Promise that resolves when the operation completes.
     */
    findStatuses(req: Request, res: Response): Promise<Response>;

    /**
     * Update an existing status by its ID.
     *
     * @param req - Request object containing the status ID.
     * @param res - Response object used to return the status data.
     * @returns A Promise that resolves when the operation completes.
     */
    updateStatus(req: Request, res: Response): Promise<Response>;

    /**
     * Delete a status by its ID.
     *
     * @param req - Request object containing the status ID.
     * @param res - Response object used to return the deletion result.
     * @returns A Promise that resolves when the operation completes.
     */
    deleteStatus(req: Request, res: Response): Promise<Response>;
}
