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
     * Retrieve a status based on its ID.
     *
     * @param req - Request object containing the status ID.
     * @param res - Response object used to return the found status.
     * @returns A Promise that resolves when the operation completes.
     */
    getStatusById(req: Request, res: Response): Promise<Response>;

    /**
     * Update the description of an existing status.
     *
     * @param req - Request object containing the new status description.
     * @param res - Response object used to return the updated result.
     * @returns A Promise that resolves when the operation completes.
     */
    updateDescription(req: Request, res: Response): Promise<Response>;

    /**
     * Update the active state of an existing status.
     *
     * @param req - Request object containing the new state data.
     * @param res - Response object used to return the updated result.
     * @returns A Promise that resolves when the operation completes.
     */
    updateActive(req: Request, res: Response): Promise<Response>;
}
