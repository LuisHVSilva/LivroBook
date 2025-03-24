import "reflect-metadata"
import {Request, Response} from "express";
import {inject, injectable} from "tsyringe";
import {StatusCodes} from "http-status-codes";
import {ICreateStatusUseCase} from "../../application/ports/ICreateStatusUseCase";

import {Messages} from "@coreShared/constants/messages";
import {ControllerError} from "@coreShared/errors/ControllerError";
import {ILogger} from "@coreShared/logs/ILogger";
import {IStatusController} from "@status/adapters/controllers/IStatusController";
import {IGetStatusUseCase} from "@status/application/ports/IGetStatusUseCase";
import {Result} from "@coreShared/types/Result";
import {CreateStatusDTO, CreateStatusResponseDTO} from "@status/adapters/dtos/CreateStatusDTO";
import {IUpdateDescriptionUseCase} from "@status/application/ports/IUpdateDescriptionUseCase";
import {GetStatusDTO, GetStatusResponseDTO} from "@status/adapters/dtos/GetStatusDTO";
import {UpdateDescriptionDTO, UpdateDescriptionResponseDTO} from "@status/adapters/dtos/UpdateDescriptionDTO";
import {UpdateActiveDTO, UpdateActiveResponseDTO} from "@status/adapters/dtos/UpdateActiveDTO";
import {IUpdateActiveUseCase} from "@status/application/ports/IUpdateActiveUseCase";


@injectable()
export class StatusController implements IStatusController {
    private readonly className: string = "StatusController";

    constructor(
        @inject("ILogger") private logger: ILogger,
        @inject("ICreateStatusUseCase") private createStatusUseCase: ICreateStatusUseCase,
        @inject("IGetStatusUseCase") private getStatusUseCase: IGetStatusUseCase,
        @inject("IUpdateDescriptionUseCase") private updateDescriptionUseCase: IUpdateDescriptionUseCase,
        @inject("IUpdateActiveUseCase") private updateActiveUseCase: IUpdateActiveUseCase,
    ) {
    }

    async createStatus(req: Request, res: Response): Promise<Response> {
        const method: string = "createStatus";

        try {
            this.logger.logInfo(this.className, method, Messages.Logger.Info.START_EXECUTION);

            const inputStatus: CreateStatusDTO = req.body;
            this.logger.logInfo(this.className, method, `Recebendo request - description: ${inputStatus.description}`);

            const result: Result<CreateStatusResponseDTO> = await this.createStatusUseCase.execute(inputStatus);

            this.logger.logInfo(this.className, method, `Status criado com sucesso - id: ${result.getValue().id}`);

            return res.status(StatusCodes.CREATED).json({success: true, data: result.getValue()});
        } catch (error) {
            return await ControllerError.handleError(this.logger, this.className, method,
                error, res, StatusCodes.CONFLICT);
        }
    };

    async getStatusById(req: Request, res: Response): Promise<Response> {
        const method: string = "getStatusById";

        try {
            this.logger.logInfo(this.className, method, Messages.Logger.Info.START_EXECUTION);

            const inputId: GetStatusDTO = {
                id: req.params.id,
            };

            this.logger.logInfo(this.className, method, `Recebendo request - id: ${inputId.id}`);
            const result: Result<GetStatusResponseDTO> = await this.getStatusUseCase.execute(inputId);

            if (result.isFailure()) {
                this.logger.logWarn(this.className, method, Messages.Status.Error.NOT_FOUND, undefined, `ID: ${inputId.id}`);
                return res.status(StatusCodes.NOT_FOUND).json({success: true, data: null});
            }

            return res.status(StatusCodes.OK).json({success: true, data: result.getValue()});
        } catch (error) {
            return await ControllerError.handleError(this.logger, this.className, method,
                error, res, StatusCodes.NOT_FOUND);
        }
    };

    async updateDescription(req: Request, res: Response): Promise<Response> {
        const method: string = "updateDescription";
        try {
            this.logger.logInfo(this.className, method, Messages.Logger.Info.START_EXECUTION);

            const inputData: UpdateDescriptionDTO = {
                id: req.params.id,
                newDescription: req.body.newDescription,
            };

            this.logger.logInfo(
                this.className,
                method,
                `Recebendo request - id: ${inputData.id} - description: ${inputData.newDescription}`
            );

            const result: Result<UpdateDescriptionResponseDTO> = await this.updateDescriptionUseCase.execute(inputData);

            return res.status(StatusCodes.OK).json({success: true, data: result.getValue()});
        } catch (error) {
            return await ControllerError.handleError(this.logger, this.className, method, error, res, StatusCodes.NOT_FOUND);
        }
    };

    async updateActive(req: Request, res: Response): Promise<Response> {
        const method: string = "updateActive";

        try {
            this.logger.logInfo(this.className, method, Messages.Logger.Info.START_EXECUTION);

            const inputData: UpdateActiveDTO = {
                id: req.params.id,
                active: req.body.active,
            };

            this.logger.logInfo(
                this.className,
                method,
                `Recebendo request - id: ${inputData.id} - active: ${inputData.active}`
            );

            const result: Result<UpdateActiveResponseDTO> = await this.updateActiveUseCase.execute(inputData);

            return res.status(StatusCodes.OK).json({success: true, data: result.getValue()});
        } catch (error) {
            return await ControllerError.handleError(this.logger, this.className, method, error, res, StatusCodes.BAD_REQUEST);
        }

    }
}
