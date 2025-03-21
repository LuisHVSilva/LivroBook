import {Request, Response} from "express";

export interface IStatusController {
    /**
     * Register a new status.
     *
     * @param req - Request object containing new status data.
     * @param res - Response object used to return the creation result.
     * @returns A Promise resolving to a Response object with the details of the created status
     * or an appropriate error on failure.
     */
    createStatus(req: Request, res: Response): Promise<Response>;

    /**
     * Get a new status.
     *
     * @param req - Request object containing the status id data.
     * @param res - Response object used to return the founded status result.
     * @returns A Promise resolving to a Response object with the details of the status
     * or an appropriate error on failure.
     */
    getStatusById(req: Request, res: Response): Promise<Response>;

    /**
     * Get a new status.
     *
     * @param req - Request object containing new status description data.
     * @param res - Response object used to return the updated result.
     * @returns A Promise resolving to a Response object with the details of the status
     * or an appropriate error on failure.
     */
    updateDescription(req: Request, res: Response): Promise<Response>;
}