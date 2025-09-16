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

    createUserCredential(req: Request, res: Response): Promise<Response>;

    updateUserCredential(req: Request, res: Response): Promise<Response>;

    deleteUserCredential(req: Request, res: Response): Promise<Response>;

    createUser(req: Request, res: Response): Promise<Response>;

    findUsers(req: Request, res: Response): Promise<Response>;

    updateUser(req: Request, res: Response): Promise<Response>;

    deleteUser(req: Request, res: Response): Promise<Response>;
}