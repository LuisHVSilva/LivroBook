import "reflect-metadata"
import {Request, Response} from "express";
import {inject, injectable} from "tsyringe";
import {StatusCodes} from "http-status-codes";
import {ICreateStatusUseCase} from "@status/useCases/create/createStatus/ICreateStatus.useCase";
import {IStatusController} from "@status/adapters/controllers/IStatus.controller";
import {LogExecution} from "@coreShared/decorators/LogExecution";
import {ApiResponseUtil} from "@coreShared/utils/apiResponse.util";
import {ResultType} from "@coreShared/types/result.type";
import {IFindStatusesUseCase} from "@status/useCases/read/findStatus/IFindStatuses.useCase";
import {IUpdateStatusUseCase} from "@status/useCases/update/updateStatus/IUpdateStatus.useCase";
import {IDeleteStatusUseCase} from "@status/useCases/delete/deleteStatus/IDeleteStatus.useCase";
import {
    CreateStatusDTO,
    CreateStatusResponseDTO,
    FindStatusesRawDTO,
    FindStatusesResponseDTO,
    UpdateStatusDTO, UpdateStatusResponseDTO
} from "@status/adapters/dtos/status.dto";
import {DeleteRequestDTO, DeleteResponseDTO} from "@coreShared/dtos/operation.dto";
import {UpdateResultType} from "@coreShared/types/crudResult.type";

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
        const input: FindStatusesRawDTO = req.query as FindStatusesRawDTO;
        const result: ResultType<FindStatusesResponseDTO> = await this.findStatusesUseCase.execute(input);
        if (result.isSuccess()) {
            return ApiResponseUtil.success<FindStatusesResponseDTO>(res, result.unwrap(), StatusCodes.OK);
        }

        return ApiResponseUtil.handleResultError(res, result.getError());
    }

    @LogExecution()
    async updateStatus(req: Request, res: Response): Promise<Response> {
        const input = req.body as UpdateStatusDTO;
        const result: ResultType<UpdateResultType<UpdateStatusResponseDTO>> = await this.updateStatusUseCase.execute(input);

        if (result.isSuccess()) {
            return ApiResponseUtil.handleUpdateResult<UpdateStatusResponseDTO>(res, result.unwrap());
        }

        return ApiResponseUtil.handleResultError(res, result.getError());
    }

    @LogExecution()
    async deleteStatus(req: Request, res: Response): Promise<Response> {
        const input: DeleteRequestDTO = req.query as DeleteRequestDTO;
        const result: ResultType<DeleteResponseDTO> = await this.deleteStatusUseCase.execute(input);

        if (result.isSuccess()) {
            return ApiResponseUtil.handleDeleteResult(res, result.unwrap().report);
        }

        return ApiResponseUtil.handleResultError(res, result.getError());
    }
}

