import {Request, Response} from "express";

export interface IUserController {
    createUserType(req: Request, res: Response): Promise<Response>;

    findUserTypes(req: Request, res: Response): Promise<Response>;

    updateUserType(req: Request, res: Response): Promise<Response>;

    deleteUserTypes(req: Request, res: Response): Promise<Response>;

    createUserCredentialType(req: Request, res: Response): Promise<Response>;

    findUserCredentialType(req: Request, res: Response): Promise<Response>;

    updateUserCredentialType(req: Request, res: Response): Promise<Response>;

    deleteUserCredentialType(req: Request, res: Response): Promise<Response>;
}