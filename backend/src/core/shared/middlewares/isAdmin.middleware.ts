import {NextFunction, Request, Response} from "express";
import {container} from "tsyringe";
import jwt, {Secret} from "jsonwebtoken";
import {IUserTypeService} from "@user/domain/services/interface/IUserType.service";
import {UserTypeEntity} from "@user/domain/entities/userType.entity";
import {StatusCodes} from "http-status-codes";
import {DecodedTokenPayloadDTO} from "@modules/auth/adapters/dtos/auth.dto";

const secretJwtKey: Secret = process.env.SECRET_JWT_KEY || "super-senha";

export function isAdminMiddleware(canUpdateOwnData: boolean = false) {
    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            const authHeader = req.headers["authorization"];
            if (!authHeader) {
                return res.status(StatusCodes.UNAUTHORIZED).json({message: "Token não informado"});
            }

            const token = authHeader.split(" ")[1];
            if (!token) {
                return res.status(StatusCodes.UNAUTHORIZED).json({message: "Token inválido"});
            }

            const decoded = jwt.verify(token, secretJwtKey) as DecodedTokenPayloadDTO;
            const userTypeService: IUserTypeService = container.resolve<IUserTypeService>("IUserTypeService");
            const adminUserType: UserTypeEntity | null = await userTypeService.getAdminUserType();

            if (!adminUserType) {
                return res.status(StatusCodes.NOT_FOUND).json({message: "Tipo de usuário 'adm' não encontrado no sistema"});
            }

            const targetUserId = Number(req.params.userId);

            if (canUpdateOwnData) {
                const isSelf = decoded.userId === targetUserId;
                const isAdmin = decoded.userType === adminUserType.description;

                if (!isSelf && !isAdmin) {
                    return res.status(StatusCodes.FORBIDDEN).json({message: "Sem permissão para atualizar este usuário"});
                }

                return next();
            }

            if (decoded.userType !== adminUserType.description) {
                return res.status(StatusCodes.FORBIDDEN).json({message: "Acesso negado. Apenas administradores."});
            }

            next();
        } catch (err: any) {
            return res.status(StatusCodes.UNAUTHORIZED).json({message: err.message || "Token inválido ou expirado"});
        }
    };
}
