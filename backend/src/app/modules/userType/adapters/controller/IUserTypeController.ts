import {Request, Response} from "express";

export interface IUserTypeController {
    create(req: Request, res: Response): Promise<Response>;
}