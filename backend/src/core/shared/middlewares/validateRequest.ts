import { Request, Response, NextFunction } from "express";
import { ZodType } from "zod";
import { StatusCodes } from "http-status-codes";

export function validateRequest(schema: ZodType , type: 'body' | 'query' | 'params' = 'body') {
    return (req: Request, res: Response, next: NextFunction): void => {
        const result = schema.safeParse(req[type]);
        if (!result.success) {
            res.status(StatusCodes.BAD_REQUEST).json({
                success: false,
                message: 'Erro de validação nos campos enviados.',
                errors: result.error.message
            });
            return;
        }

        if( type != 'query'){
            req[type] = result.data;
        }

        next();
    };
}
