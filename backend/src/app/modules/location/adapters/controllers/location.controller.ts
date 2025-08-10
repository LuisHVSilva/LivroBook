import {inject, injectable} from "tsyringe";
import {ILocationController} from "@location/adapters/controllers/ILocation.controller";
import {LogExecution} from "@coreShared/decorators/LogExecution";
import {ResultType} from "@coreShared/types/result.type";
import {Request, Response} from "express";
import {ApiResponseUtil} from "@coreShared/utils/apiResponse.util";
import {StatusCodes} from "http-status-codes";
import {ICreateLocationUseCase} from "@location/useCases/createLocation/ICreateLocation.useCase";
import {
    CreateLocationDTO,
    CreateLocationResponseDTO, DeleteLocationDTO, DeleteLocationResponseDTO,
    GetLocationsDTO, UpdateLocationDTO, UpdateLocationResponseDTO
} from "@location/adapters/dtos/location.dto";
import {IFindLocationsUseCase} from "@location/useCases/findLocations/IFindLocations.useCase";
import {IUpdateLocationUseCase} from "@location/useCases/updateLocation/IUpdateLocation.useCase";
import {IDeleteLocationsUseCase} from "@location/useCases/deleteLocations/IDeleteLocations.useCase";

@injectable()
export class LocationController implements ILocationController {
    constructor(
        @inject("ICreateLocationUseCase") private readonly createLocationUseCase: ICreateLocationUseCase,
        @inject("IFindLocationsUseCase") private readonly findLocationsUseCase: IFindLocationsUseCase,
        @inject("IUpdateLocationUseCase") private readonly updateLocationUseCase: IUpdateLocationUseCase,
        @inject("IDeleteLocationsUseCase") private readonly deleteLocationUseCase: IDeleteLocationsUseCase,
    ) {
    }

    @LogExecution()
    async createLocation(req: Request, res: Response): Promise<Response> {
        const input: CreateLocationDTO = req.body;
        const result: ResultType<CreateLocationResponseDTO> = await this.createLocationUseCase.execute(input);

        if (result.isSuccess()) {
            return ApiResponseUtil.success<CreateLocationResponseDTO>(res, result.unwrap(), StatusCodes.CREATED);
        }

        return ApiResponseUtil.handleResultError(res, result.getError());
    }

    @LogExecution()
    async findLocations(req: Request, res: Response): Promise<Response> {
        const input: GetLocationsDTO = req.query as GetLocationsDTO;
        const result = await this.findLocationsUseCase.execute(input);

        if (result.isSuccess()) {
            return ApiResponseUtil.success(res, result.unwrap(), StatusCodes.OK);
        }

        return ApiResponseUtil.handleResultError(res, result.getError());
    }

    @LogExecution()
    async updateLocation(req: Request, res: Response): Promise<Response> {
        const input = req.body as UpdateLocationDTO;
        const result: ResultType<UpdateLocationResponseDTO> = await this.updateLocationUseCase.execute(input);

        if (result.isSuccess()) {
            return ApiResponseUtil.success<UpdateLocationResponseDTO>(res, result.unwrap(), StatusCodes.OK);
        }

        return ApiResponseUtil.handleResultError(res, result.getError());
    }

    @LogExecution()
    async deleteLocation(req: Request, res: Response): Promise<Response> {
        const input = req.query as DeleteLocationDTO;
        const result: ResultType<DeleteLocationResponseDTO> = await this.deleteLocationUseCase.execute(input);

        if (result.isSuccess()) {
            return ApiResponseUtil.success<DeleteLocationResponseDTO>(res, result.unwrap(), StatusCodes.OK);
        }

        return ApiResponseUtil.handleResultError(res, result.getError());
    }

}