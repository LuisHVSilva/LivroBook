import { Request, Response, NextFunction } from "express";
import { ZodType } from "zod";
import { StatusCodes } from "http-status-codes";

export function validateRequest(schema: ZodType , type: 'body' | 'query' | 'params' = 'body') {
    return (req: Request, res: Response, next: NextFunction): void => {
        const result = schema.safeParse(req[type]);

        if (!result.success) {
            const formattedErrors = result.error.issues.map(issue => {
                return issue.message;
            });

            res.status(StatusCodes.BAD_REQUEST).json({
                success: false,
                message: 'Erro de validação nos campos enviados.',
                errors: formattedErrors
            });
            return;
        }

        if( type != 'query'){
            req[type] = result.data;
        }

        next();
    };
}
