import {inject, injectable} from "tsyringe";
import {Request, Response} from "express";
import {ResultType} from "@coreShared/types/result.type";
import {ApiResponseUtil} from "@coreShared/utils/apiResponse.util";
import {StatusCodes} from "http-status-codes";
import {IPhoneController} from "@phone/adapters/controllers/IPhone.controller";
import {ICreatePhoneTypeUseCase} from "@phone/useCase/createPhoneType/ICreatePhoneType.useCase";
import {
    CreatePhoneTypeDTO,
    CreatePhoneTypeResponseDTO, DeletePhoneTypesDTO, DeletePhoneTypesResponseDTO,
    FindPhoneTypesDTO,
    FindPhoneTypesResponseDTO, UpdatePhoneTypeDTO, UpdatePhoneTypeResponseDTO
} from "@phone/adapters/dtos/phoneType.dto";
import {EntitiesMessage} from "@coreShared/messages/entities.message";
import {IFindPhoneTypesUseCase} from "@phone/useCase/findPhoneTypes/IFindPhoneTypes.useCase";
import {IUpdatePhoneTypeUseCase} from "@phone/useCase/updatePhoneType/IUpdatePhoneType.useCase";
import {IDeletePhoneTypesUseCase} from "@phone/useCase/deletePhoneTypes/IDeletePhoneTypes.useCase";

@injectable()
export class PhoneController implements IPhoneController {
    constructor(
        @inject("ICreatePhoneTypeUseCase") private readonly createPhoneTypeUseCase: ICreatePhoneTypeUseCase,
        @inject("IFindPhoneTypesUseCase") private readonly findPhoneTypesUseCase: IFindPhoneTypesUseCase,
        @inject("IUpdatePhoneTypeUseCase") private readonly updatePhoneTypeUseCase: IUpdatePhoneTypeUseCase,
        @inject("IDeletePhoneTypesUseCase") private readonly deletePhoneTypesUseCase: IDeletePhoneTypesUseCase,
    ) {
    }

    //#region PHONE TYPE
    async createPhoneType(req: Request, res: Response): Promise<Response> {
        const input: CreatePhoneTypeDTO = req.body;
        const result: ResultType<CreatePhoneTypeResponseDTO> = await this.createPhoneTypeUseCase.execute(input);

        if (result.isSuccess()) {
            return ApiResponseUtil.success<CreatePhoneTypeResponseDTO>(res, result.unwrap(), StatusCodes.CREATED);
        }

        return ApiResponseUtil.handleResultError(res, result.getError());
    }

    async findPhoneTypes(req: Request, res: Response): Promise<Response> {
        const input: FindPhoneTypesDTO = req.query as FindPhoneTypesDTO;
        const result: ResultType<FindPhoneTypesResponseDTO> = await this.findPhoneTypesUseCase.execute(input);

        if (result.isSuccess()) {
            return ApiResponseUtil.success<FindPhoneTypesResponseDTO>(res, result.unwrap(), StatusCodes.OK);
        }

        if (result.isNone()) {
            return ApiResponseUtil.notFound(res, EntitiesMessage.error.retrieval.notFoundGeneric);
        }

        return ApiResponseUtil.handleResultError(res, result.getError());
    }

    async updatePhoneType(req: Request, res: Response): Promise<Response> {
        const input = req.body as UpdatePhoneTypeDTO;
        const result: ResultType<UpdatePhoneTypeResponseDTO> = await this.updatePhoneTypeUseCase.execute(input);

        if (result.isSuccess()) {
            return ApiResponseUtil.success<UpdatePhoneTypeResponseDTO>(res, result.unwrap(), StatusCodes.OK);
        }

        if (result.isNone()) {
            return ApiResponseUtil.notFound(res, EntitiesMessage.error.retrieval.notFoundGeneric);
        }

        return ApiResponseUtil.handleResultError(res, result.getError());
    }

    async deletePhoneTypes(req: Request, res: Response): Promise<Response> {
        const input = req.query as DeletePhoneTypesDTO;
        const result: ResultType<DeletePhoneTypesResponseDTO> = await this.deletePhoneTypesUseCase.execute(input);

        if (result.isSuccess()) {
            return ApiResponseUtil.success<DeletePhoneTypesResponseDTO>(res, result.unwrap(), StatusCodes.OK);
        }

        return ApiResponseUtil.handleResultError(res, result.getError());
    }
    //#endregion
}