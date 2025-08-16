import {Request, Response} from "express";

export interface IPhoneController {
    createPhoneType(req: Request, res: Response): Promise<Response>;
    findPhoneTypes(req: Request, res: Response): Promise<Response>;
    updatePhoneType(req: Request, res: Response): Promise<Response>;
    deletePhoneTypes(req: Request, res: Response): Promise<Response>;

    createPhoneCode(req: Request, res: Response): Promise<Response>;
    findPhoneCodes(req: Request, res: Response): Promise<Response>;
    updatePhoneCode(req: Request, res: Response): Promise<Response>;
    deletePhoneCodes(req: Request, res: Response): Promise<Response>;

    createPhone(req: Request, res: Response): Promise<Response>;
}