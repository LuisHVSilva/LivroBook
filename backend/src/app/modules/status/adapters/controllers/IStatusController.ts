import {Request, Response} from "express";

export interface IStatusController {
    /**
     * Register a new Status.
     *
     * @param req - Request object containing new status data.
     * @param res - Response object used to return the creation result.
     * @returns A Promise resolving to a Response object with the details of the created status
     * or an appropriate error on failure.
     */
    createStatus(req: Request, res: Response): Promise<Response>;
}