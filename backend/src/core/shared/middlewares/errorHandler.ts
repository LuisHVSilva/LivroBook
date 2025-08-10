import { Request, Response, NextFunction } from "express";
import {ErrorMessages} from "@coreShared/messages/errorMessages";

export class ErrorHandler {
    public static handleError(err: Error, req: Request, res: Response, next: NextFunction): void {
        console.error('Erro capturado:', err.message);
        console.error(err.stack);

        res.status(500).json({ message: ErrorMessages.Internal.UNEXPECTED_ERROR });
    }
}
