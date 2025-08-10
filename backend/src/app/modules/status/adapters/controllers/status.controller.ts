import "reflect-metadata"
import {Request, Response} from "express";
import {inject, injectable} from "tsyringe";
import {StatusCodes} from "http-status-codes";
import {ICreateStatusUseCase} from "@status/useCases/createStatus/ICreateStatus.useCase";
import {IStatusController} from "@status/adapters/controllers/IStatus.controller";
import {LogExecution} from "@coreShared/decorators/LogExecution";
import {ApiResponseUtil} from "@coreShared/utils/apiResponse.util";
import {ResultType} from "@coreShared/types/result.type";
import {IFindStatusesUseCase} from "@status/useCases/findStatus/IFindStatuses.useCase";
import {IUpdateStatusUseCase} from "@status/useCases/updateStatus/IUpdateStatus.useCase";
import {IDeleteStatusUseCase} from "@status/useCases/deleteStatus/IDeleteStatus.useCase";
import {
    CreateStatusDTO,
    CreateStatusResponseDTO, DeleteStatusDTO, DeleteStatusResponseDTO,
    FindStatusesDTO,
    FindStatusesResponseDTO, UpdateStatusDTO, UpdateStatusResponseDTO
} from "@status/adapters/dtos/status.dto";
import {EntitiesMessage} from "@coreShared/messages/entities.message";

@injectable()
export class StatusController implements IStatusController {
    constructor(
        @inject("ICreateStatusUseCase") private readonly createStatusUseCase: ICreateStatusUseCase,
        @inject("IFindStatusesUseCase") private readonly findStatusesUseCase: IFindStatusesUseCase,
        @inject("IUpdateStatusUseCase") private readonly updateStatusUseCase: IUpdateStatusUseCase,
        @inject("IDeleteStatusUseCase") private readonly deleteStatusUseCase: IDeleteStatusUseCase
    ) {
    }

    @LogExecution()
    async createStatus(req: Request, res: Response): Promise<Response> {
        const input: CreateStatusDTO = req.body;
        const result: ResultType<CreateStatusResponseDTO> = await this.createStatusUseCase.execute(input);

        if (result.isSuccess()) {
            return ApiResponseUtil.success<CreateStatusResponseDTO>(res, result.unwrap(), StatusCodes.CREATED);
        }

        return ApiResponseUtil.handleResultError(res, result.getError());
    }

    @LogExecution()
    async findStatuses(req: Request, res: Response): Promise<Response> {
        const input: FindStatusesDTO = req.query as FindStatusesDTO;
        const result: ResultType<FindStatusesResponseDTO> = await this.findStatusesUseCase.execute(input);
        if (result.isSuccess()) {
            return ApiResponseUtil.success<FindStatusesResponseDTO>(res, result.unwrap(), StatusCodes.OK);
        }
        if (result.isNone()) {
            return ApiResponseUtil.notFound(res, EntitiesMessage.error.retrieval.notFoundGeneric);
        }

        return ApiResponseUtil.handleResultError(res, result.getError());
    }

    @LogExecution()
    async updateStatus(req: Request, res: Response): Promise<Response> {
        const input = req.body as UpdateStatusDTO;
        const result: ResultType<UpdateStatusResponseDTO> = await this.updateStatusUseCase.execute(input);
        if (result.isSuccess()) {
            return ApiResponseUtil.success<UpdateStatusResponseDTO>(res, result.unwrap(), StatusCodes.OK);
        }

        if (result.isNone()) {
            return ApiResponseUtil.notFound(res, EntitiesMessage.error.retrieval.notFoundById(input.id.toString()));
        }

        return ApiResponseUtil.handleResultError(res, result.getError());
    }

    @LogExecution()
    async deleteStatus(req: Request, res: Response): Promise<Response> {
        const input: DeleteStatusDTO = req.query as DeleteStatusDTO;
        const result: ResultType<DeleteStatusResponseDTO> = await this.deleteStatusUseCase.execute(input);

        if (result.isSuccess()) {
            return ApiResponseUtil.success<DeleteStatusResponseDTO>(res, result.unwrap(), StatusCodes.OK);
        }

        if (result.isNone()) {
            return ApiResponseUtil.notFound(res, EntitiesMessage.error.retrieval.notFoundById(input.id.toString()));
        }

        return ApiResponseUtil.handleResultError(res, result.getError());
    }
}

