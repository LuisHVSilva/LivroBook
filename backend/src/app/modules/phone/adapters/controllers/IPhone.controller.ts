import {Request, Response} from "express";

export interface IPhoneController {
    createPhoneType(req: Request, res: Response): Promise<Response>;
}