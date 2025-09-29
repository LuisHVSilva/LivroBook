import {inject, injectable} from "tsyringe";
import {LogExecution} from "@coreShared/decorators/LogExecution";
import {Request, Response} from "express";
import {ResultType} from "@coreShared/types/result.type";
import {StatusCodes} from "http-status-codes";
import {ApiResponseUtil} from "@coreShared/utils/apiResponse.util";
import {IMetadataController} from "@modules/metadata/adapters/controller/IMetadata.controller";
import {IGetModelAttributesUseCase} from "@modules/metadata/useCase/getModelAttributes/IGetModelAttributes.useCase";
import {GetAllEntitiesNamesDTO, ModelAttributeRequestDto} from "@modules/metadata/adapters/dtos/metadata.dto";
import {SimplifiedMetadataAttribute} from "@coreShared/types/metadata.type";
import {IGetAllEntitiesNamesUseCase} from "@modules/metadata/useCase/getAllEntitiesNames/IGetAllEntitiesNames.useCase";

@injectable()
export class MetadataController implements IMetadataController {
    constructor(
        @inject("IGetModelAttributesUseCase") private getModelAttributesUseCase: IGetModelAttributesUseCase,
        @inject("IGetAllEntitiesNamesUseCase") private getAllEntitiesNamesUseCase: IGetAllEntitiesNamesUseCase,
    ) {
    }

    @LogExecution()
    async getModelAttributes(req: Request, res: Response): Promise<Response> {
        const input = req.params as ModelAttributeRequestDto;
        const result: ResultType<SimplifiedMetadataAttribute[]> = await this.getModelAttributesUseCase.execute(input);

        if (result.isSuccess()) {
            return ApiResponseUtil.success<SimplifiedMetadataAttribute[]>(res, result.unwrap(), StatusCodes.OK);
        }

        return ApiResponseUtil.handleResultError(res, result.getError());
    }

    @LogExecution()
    async getAllEntitiesNames(req: Request, res: Response): Promise<Response> {
        const result: ResultType<GetAllEntitiesNamesDTO> = await this.getAllEntitiesNamesUseCase.execute(undefined);

        if (result.isSuccess()) {
            return ApiResponseUtil.success<GetAllEntitiesNamesDTO>(res, result.unwrap(), StatusCodes.OK);
        }

        return ApiResponseUtil.handleResultError(res, result.getError());
    }
}