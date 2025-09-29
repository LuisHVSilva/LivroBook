import {Request, Response} from "express";

export interface IMetadataController {
    getModelAttributes(req: Request, res: Response): Promise<Response>;

    getAllEntitiesNames(req: Request, res: Response): Promise<Response>;
}