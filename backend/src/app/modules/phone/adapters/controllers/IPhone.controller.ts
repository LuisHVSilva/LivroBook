import {Request, Response} from "express";

export interface IPhoneController {
    createPhoneType(req: Request, res: Response): Promise<Response>;
    findPhoneTypes(req: Request, res: Response): Promise<Response>;
    updatePhoneType(req: Request, res: Response): Promise<Response>;
    deletePhoneTypes(req: Request, res: Response): Promise<Response>;
}