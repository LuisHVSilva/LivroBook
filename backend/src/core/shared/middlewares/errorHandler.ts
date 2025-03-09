import { Request, Response, NextFunction } from "express";
import {Messages} from "@coreShared/constants/messages";

export class ErrorHandler {
    public static handleError(err: Error, req: Request, res: Response, next: NextFunction): void {
        console.error('Erro capturado:', err.message);
        console.error(err.stack);

        res.status(500).json({ message: Messages.ErrorHandler.handleError });
    }
}
