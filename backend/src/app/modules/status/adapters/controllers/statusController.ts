import "reflect-metadata"
import {Request, Response} from "express";
import {inject, injectable} from "tsyringe";
import {StatusCodes} from "http-status-codes";
import {CreateStatusOutput, ICreateStatusUseCase} from "../../application/ports/ICreateStatusUseCase";
import {CreateStatusResponseDTO} from "../dtos/CreateStatusDTO";
import {Messages} from "@coreShared/constants/messages";
import {ControllerError} from "@coreShared/errors/ControllerError";
import {ILogger} from "@coreShared/logs/ILogger";
import {IStatusController} from "@status/adapters/controllers/IStatusController";
import {GetStatusOutput, IGetStatusUseCase} from "@status/application/ports/IGetStatusUseCase";
import {GetStatusDTO} from "@status/adapters/dtos/GetStatusDTO";


@injectable()
export class StatusController implements IStatusController {
    private readonly className: string = "StatusController";

    constructor(
        @inject("ILogger") private logger: ILogger,
        @inject("ICreateStatusUseCase") private createStatusUseCase: ICreateStatusUseCase,
        @inject("IGetStatusUseCase") private getStatusUseCase: IGetStatusUseCase,
    ) {
    }

    async createStatus(req: Request, res: Response): Promise<Response> {
        const method: string = "createStatus";

        try {
            this.logger.logInfo(this.className, method, Messages.Logger.Info.START_EXECUTION);

            const {description} = req.body;
            this.logger.logInfo(this.className, method, `Recebendo request - description: ${description}`);

            const result: CreateStatusOutput = await this.createStatusUseCase.execute({description});

            const message: string = Messages.Status.Success.CREATED(description);
            this.logger.logInfo(this.className, method, `Status criado com sucesso - id: ${result.id}`);

            const responseDTO: CreateStatusResponseDTO = {
                id: result.id?.toString(),
                description: result.description,
                message: message
            };

            return res.status(StatusCodes.CREATED).json({success: true, data: responseDTO});
        } catch (error) {
            return await ControllerError.handleError(this.logger, this.className, method,
                error, res, StatusCodes.CONFLICT);
        }
    }


    async getStatusById(req: Request, res: Response): Promise<Response> {
        const method: string = "getStatusById";

        try {
            this.logger.logInfo(this.className, method, Messages.Logger.Info.START_EXECUTION);

            const {id} = req.params;

            const result: GetStatusOutput | null = await this.getStatusUseCase.execute({id});

            if(!result) {
                this.logger.logWarn(this.className, method, Messages.Status.Error.NOT_FOUND, undefined, `ID: ${id}`);
                return res.status(StatusCodes.NOT_FOUND).json({success: true, data: null});
            }

            const message: string = Messages.Status.Success.FOUND(result.description);

            const respondeDTO: GetStatusDTO = {
                id: result.id.toString(),
                description: result.description,
                state: !!result.active,
                message: message
            }

            return res.status(StatusCodes.OK).json({success: true, data: respondeDTO});
        } catch(error) {
            return await ControllerError.handleError(this.logger, this.className, method,
                error, res, StatusCodes.NOT_FOUND);
        }
    };
}
