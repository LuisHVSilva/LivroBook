import {Request, Response} from "express";

export interface ILocationController {
    /**
     * Register a new location.
     *
     * @param req - Request object containing new location data.
     * @param res - Response object used to return the creation result.
     * @returns A Promise that resolves when the operation completes.
     */
    createLocation(req: Request, res: Response): Promise<Response>;

    /**
     * Retrieve all countries with pagination and filtering options.
     *
     * @param req - Request object containing pagination and filter parameters.
     * @param res - Response object used to return the list of countries.
     * @returns A Promise that resolves when the operation completes.
     */
    findLocations(req: Request, res: Response): Promise<Response>;

    /**
     * Update an existing location.
     *
     * @param req - Request object containing data to update location.
     * @param res - Response object used to return the updated result.
     * @returns A Promise that resolves when the operation completes.
     */
    updateLocation(req: Request, res: Response): Promise<Response>;

    /**
     * Delete a country, location and/or city by its ID.
     *
     * @param req - Request object containing the country ID.
     * @param res - Response object used to return the deletion result.
     * @returns A Promise that resolves when the operation completes.
     */
    deleteLocation(req: Request, res: Response): Promise<Response>;
}