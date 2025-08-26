import {Request, Response} from "express";

export interface ILocationController {
    createCountry(req: Request, res: Response): Promise<Response>;

    findCountries(req: Request, res: Response): Promise<Response>;

    updateCountry(req: Request, res: Response): Promise<Response>;

    deleteCountry(req: Request, res: Response): Promise<Response>;

    createState(req: Request, res: Response): Promise<Response>;

    findStates(req: Request, res: Response): Promise<Response>;

    updateState(req: Request, res: Response): Promise<Response>;

    deleteState(req: Request, res: Response): Promise<Response>;

    createCity(req: Request, res: Response): Promise<Response>;

    findCities(req: Request, res: Response): Promise<Response>;

    updateCity(req: Request, res: Response): Promise<Response>;

    deleteCity(req: Request, res: Response): Promise<Response>;
}