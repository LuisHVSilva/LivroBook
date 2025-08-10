import {Request, Response} from "express";

export interface IDocumentTypeController {
    createDocumentType(req: Request, res: Response): Promise<Response>;
    findDocumentTypes(req: Request, res: Response): Promise<Response>;
    updateDocumentType(req: Request, res: Response): Promise<Response>;
    deleteDocumentTypes(req: Request, res: Response): Promise<Response>;
}