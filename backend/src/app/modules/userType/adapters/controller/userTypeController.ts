import "reflect-metadata";
import {Request, Response} from "express";
import {IUserTypeController} from "@userType/adapters/controller/IUserTypeController";
import {inject, injectable} from "tsyringe";
import {ILogger} from "@coreShared/logs/ILogger";
import {ICreateUserTypeUseCase} from "@userType/application/createUserType/ICreateUserTypeUseCase";
import {ControllerError} from "@coreShared/errors/ControllerError";
import {StatusCodes} from "http-status-codes";

import {Messages} from "@coreShared/messages/messages";
import {CreateUserTypeInputDTO, CreateUserTypeOutputDTO} from "@userType/adapters/dtos/createUserTypeDTO";
import {Result} from "@coreShared/types/Result";


@injectable()
export class UserTypeController implements IUserTypeController {
    private readonly className: string = "UserTypeController";
    constructor(
        @inject("ILogger") private readonly logger: ILogger,
        @inject("ICreateUserTypeUseCase") private readonly createUserTypeUseCase: ICreateUserTypeUseCase,

    ) {
    }

    public async create(req: Request, res: Response): Promise<Response> {
        const method: string = "create";

        try {
            this.logger.logInfo(this.className, method, Messages.Logger.Info.START_EXECUTION);

            const input: CreateUserTypeInputDTO = req.body;

            this.logger.logInfo(this.className, method, `Recebendo request - input: ${input}`);

            const result: Result<CreateUserTypeOutputDTO> = await this.createUserTypeUseCase.execute(input);

            this.logger.logInfo(this.className, method,
                `Status criado com sucesso - id: ${result.getValue().id} - description: ${result.getValue()}`);

            return res.status(StatusCodes.CREATED).json({success: true, data: result});
        } catch (error) {
            return await ControllerError.handleError(this.logger, this.className, method,
                error, res, StatusCodes.CONFLICT);
        }
    };
}