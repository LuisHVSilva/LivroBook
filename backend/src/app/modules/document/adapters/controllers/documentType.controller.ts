import {inject, injectable} from "tsyringe";
import {IDocumentTypeController} from "@document/adapters/controllers/IDocumentType.controller";
import {ICreateDocumentTypeUseCase} from "@document/useCases/createDocumentType/ICreateDocumentType.useCase";
import {Request, Response} from "express";
import {ResultType} from "@coreShared/types/result.type";
import {ApiResponseUtil} from "@coreShared/utils/apiResponse.util";
import {StatusCodes} from "http-status-codes";
import {
    CreateDocumentTypeDTO,
    CreateDocumentTypeResponseDTO, DeleteDocumentTypesDTO, DeleteDocumentTypesResponseDTO,
    FindDocumentTypesDTO, FindDocumentTypesResponseDTO, UpdateDocumentTypeDTO, UpdateDocumentTypeResponseDTO
} from "@document/adapters/dto/documentType.dto";
import {IFindDocumentTypesUseCase} from "@document/useCases/findDocumentTypes/IFindDocumentTypes.useCase";
import {EntitiesMessage} from "@coreShared/messages/entities.message";
import {UpdateDocumentTypeUseCase} from "@document/useCases/updateDocumentType/updateDocumentType.useCase";
import {IDeleteDocumentTypesUseCase} from "@document/useCases/deleteDocumentTypes/IDeleteDocumentTypes.useCase";

@injectable()
export class DocumentTypeController implements IDocumentTypeController {
    constructor(
        @inject("ICreateDocumentTypeUseCase") private readonly createDocumentTypeUseCase: ICreateDocumentTypeUseCase,
        @inject("IFindDocumentTypesUseCase") private readonly findDocumentTypesUseCase: IFindDocumentTypesUseCase,
        @inject("IUpdateDocumentTypeUseCase") private readonly updateDocumentTypeUseCase: UpdateDocumentTypeUseCase,
        @inject("IDeleteDocumentTypesUseCase") private readonly deleteDocumentTypesUseCase: IDeleteDocumentTypesUseCase,
    ) {
    }

    async createDocumentType(req: Request, res: Response): Promise<Response> {
        const input: CreateDocumentTypeDTO = req.body;
        const result: ResultType<CreateDocumentTypeResponseDTO> = await this.createDocumentTypeUseCase.execute(input);

        if (result.isSuccess()) {
            return ApiResponseUtil.success<CreateDocumentTypeResponseDTO>(res, result.unwrap(), StatusCodes.CREATED);
        }

        return ApiResponseUtil.handleResultError(res, result.getError());
    }

    async findDocumentTypes(req: Request, res: Response): Promise<Response> {
        const input: FindDocumentTypesDTO = req.query as FindDocumentTypesDTO;
        const result: ResultType<FindDocumentTypesResponseDTO> = await this.findDocumentTypesUseCase.execute(input);

        if (result.isSuccess()) {
            return ApiResponseUtil.success<FindDocumentTypesResponseDTO>(res, result.unwrap(), StatusCodes.OK);
        }

        if (result.isNone()) {
            return ApiResponseUtil.notFound(res, EntitiesMessage.error.retrieval.notFoundGeneric);
        }

        return ApiResponseUtil.handleResultError(res, result.getError());
    }

    async updateDocumentType(req: Request, res: Response): Promise<Response> {
        const input = req.body as UpdateDocumentTypeDTO;
        const result: ResultType<UpdateDocumentTypeResponseDTO> = await this.updateDocumentTypeUseCase.execute(input);
        if (result.isSuccess()) {
            return ApiResponseUtil.success<UpdateDocumentTypeResponseDTO>(res, result.unwrap(), StatusCodes.OK);
        }

        if (result.isNone()) {
            return ApiResponseUtil.notFound(res, EntitiesMessage.error.retrieval.notFoundGeneric);
        }

        return ApiResponseUtil.handleResultError(res, result.getError());
    }

    async deleteDocumentTypes(req: Request, res: Response): Promise<Response> {
        const input = req.query as DeleteDocumentTypesDTO;
        const result: ResultType<DeleteDocumentTypesResponseDTO> = await this.deleteDocumentTypesUseCase.execute(input);

        if (result.isSuccess()) {
            return ApiResponseUtil.success<DeleteDocumentTypesResponseDTO>(res, result.unwrap(), StatusCodes.OK);
        }

        return ApiResponseUtil.handleResultError(res, result.getError());
    }
}