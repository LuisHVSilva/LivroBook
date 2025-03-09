import "reflect-metadata"
import {Request, Response} from "express";
import {inject, injectable} from "tsyringe";
import {StatusCodes} from "http-status-codes";
import {CreateStatusOutput, ICreateStatusUseCase} from "../../application/ports/ICreateStatusUseCase";
import {CreateStatusResponseDTO} from "../dtos/CreateStatusDTO";
import {Messages} from "@coreShared/constants/messages";
import {UseCaseError} from "@coreShared/errors/UseCaseError";
import {ILogger} from "@coreShared/logs/ILogger";
import {IStatusController} from "@status/adapters/controllers/IStatusController";


@injectable()
export class StatusController implements IStatusController {
    constructor(@inject("ICreateStatusUseCase") private createStatusUseCase: ICreateStatusUseCase,
                @inject("ILogger") private logger: ILogger) {
    }

    async createStatus(req: Request, res: Response): Promise<Response> {
        const method: string = "createStatus";

        try {
            const {description} = req.body;
            const result: CreateStatusOutput = await this.createStatusUseCase.execute({description});

            const message: string = Messages.Status.Success.CREATED_SUCCESS(description)
            const responseDTO: CreateStatusResponseDTO = {
                id: result.id,
                description: result.description,
                message: message
            }

            this.logger.logSuccess(method, StatusCodes.CREATED, message)
            return res.status(StatusCodes.CREATED).json({success: true, data: responseDTO});
        } catch (error) {
            if (error instanceof UseCaseError) {
                this.logger.logError(method, error, StatusCodes.CONFLICT, null);
                return res.status(StatusCodes.CONFLICT).json({success: false, message: error.message});
            }

            if (error instanceof Error) {
                this.logger.logError(method, error, StatusCodes.BAD_REQUEST, null);
                return res.status(StatusCodes.BAD_REQUEST).json({success: false, message: error.message});
            }

            this.logger.logError(method, error as Error, StatusCodes.INTERNAL_SERVER_ERROR, null);
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
                success: false,
                message: Messages.Generic.Error
            });
        }
    }
}
