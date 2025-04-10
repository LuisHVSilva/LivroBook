import "reflect-metadata"
import {Request, Response} from "express";
import {inject, injectable} from "tsyringe";
import {StatusCodes} from "http-status-codes";
import {ICreateStatusUseCase} from "../../application/createStatus/ICreateStatusUseCase";

import {ControllerError} from "@coreShared/errors/ControllerError";
import {ILogger} from "@coreShared/logs/ILogger";
import {IStatusController} from "@status/adapters/controllers/IStatusController";
import {IGetStatusUseCase} from "@status/application/getStatus/IGetStatusUseCase";
import {Result} from "@coreShared/types/Result";
import {CreateStatusDTO, CreateStatusResponseDTO} from "@status/adapters/dtos/CreateStatusDTO";
import {IUpdateDescriptionUseCase} from "@status/application/updateDescription/IUpdateDescriptionUseCase";
import {GetStatusDTO, GetStatusResponseDTO} from "@status/adapters/dtos/GetStatusDTO";
import {UpdateDescriptionDTO, UpdateDescriptionResponseDTO} from "@status/adapters/dtos/UpdateDescriptionDTO";
import {UpdateActiveDTO, UpdateActiveResponseDTO} from "@status/adapters/dtos/UpdateActiveDTO";
import {IUpdateActiveUseCase} from "@status/application/updateActive/IUpdateActiveUseCase";
import {LoggerMessages} from "@coreShared/messages/loggerMessages";


@injectable()
export class StatusController implements IStatusController {
    private readonly className: string = "StatusController";
    private readonly REQUEST_RECEIVED: string = "Recebendo request - input: ";

    constructor(
        @inject("ILogger") private readonly logger: ILogger,
        @inject("ICreateStatusUseCase") private readonly createStatusUseCase: ICreateStatusUseCase,
        @inject("IGetStatusUseCase") private readonly getStatusUseCase: IGetStatusUseCase,
        @inject("IUpdateDescriptionUseCase") private readonly updateDescriptionUseCase: IUpdateDescriptionUseCase,
        @inject("IUpdateActiveUseCase") private readonly updateActiveUseCase: IUpdateActiveUseCase,
    ) {
    }

    async createStatus(req: Request, res: Response): Promise<Response> {
        const method: string = "createStatus";
        await this.logger.logInfo(this.className, method, LoggerMessages.Info.START_EXECUTION);

        try {
            const input: CreateStatusDTO = req.body;
            await this.logger.logInfo(this.className, method, this.REQUEST_RECEIVED, undefined, JSON.stringify(input));

            const result: CreateStatusResponseDTO = (await this.createStatusUseCase.execute(input)).unwrapOrThrow();

            await  this.logger.logInfo(this.className, method, LoggerMessages.Info.EXECUTION_SUCCESS);

            return res.status(StatusCodes.CREATED).json({success: true, data: result});
        } catch (error) {
            return await ControllerError.handleError(this.logger, this.className, method,
                error, res, StatusCodes.CONFLICT);
        }
    };

    async getStatusById(req: Request, res: Response): Promise<Response> {
        const method = "getStatusById";
        const id: string = req.params.id;
        await this.logger.logInfo(this.className, method, LoggerMessages.Info.START_EXECUTION);

        try {
            const input: GetStatusDTO = {id};
            await this.logger.logInfo(this.className, method, this.REQUEST_RECEIVED, undefined, JSON.stringify(input));

            const result: Result<GetStatusResponseDTO | null> = await this.getStatusUseCase.execute(input);

            if (result.isNone()) {
                return res.status(StatusCodes.NOT_FOUND).json({success: true, data: null});
            }

            await this.logger.logInfo(this.className, method, LoggerMessages.Info.EXECUTION_SUCCESS);

            return res.status(StatusCodes.OK).json({success: true, data: result.unwrapOrThrow()});
        } catch (error) {
            return ControllerError.handleError(this.logger, this.className, method, error, res, StatusCodes.INTERNAL_SERVER_ERROR);
        }
    }

    async updateDescription(req: Request, res: Response): Promise<Response> {
        const method: string = "updateDescription";
        await this.logger.logInfo(this.className, method, LoggerMessages.Info.START_EXECUTION);

        try {
            const input: UpdateDescriptionDTO = {
                id: req.params.id,
                newDescription: req.body.newDescription,
            };

            await this.logger.logInfo(this.className, method, this.REQUEST_RECEIVED, undefined, JSON.stringify(input));

            const result: Result<UpdateDescriptionResponseDTO> = await this.updateDescriptionUseCase.execute(input);

            await this.logger.logInfo(this.className, method, LoggerMessages.Info.EXECUTION_SUCCESS);
            return res.status(StatusCodes.OK).json({success: true, data: result.unwrapOrThrow()});
        } catch (error) {
            return await ControllerError.handleError(this.logger, this.className, method, error, res, StatusCodes.NOT_FOUND);
        }
    };

    async updateActive(req: Request, res: Response): Promise<Response> {
        const method: string = "updateActive";
        await this.logger.logInfo(this.className, method, LoggerMessages.Info.START_EXECUTION);

        try {
            const input: UpdateActiveDTO = {
                id: req.params.id,
                active: req.body.active,
            };

            await this.logger.logInfo(this.className, method, this.REQUEST_RECEIVED, undefined, JSON.stringify(input));

            const result: Result<UpdateActiveResponseDTO> = await this.updateActiveUseCase.execute(input);

            await this.logger.logInfo(this.className, method, LoggerMessages.Info.EXECUTION_SUCCESS);

            return res.status(StatusCodes.OK).json({success: true, data: result.unwrapOrThrow()});
        } catch (error) {
            return await ControllerError.handleError(this.logger, this.className, method, error, res, StatusCodes.BAD_REQUEST);
        }

    }
}
