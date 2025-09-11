import {inject, injectable} from "tsyringe";
import {ILocationController} from "@location/adapters/controllers/ILocation.controller";
import {ICreateCountryUseCase} from "@location/useCases/createCountry/ICreateCountry.useCase";
import {ICreateCityUseCase} from "@location/useCases/createCity/ICreateCity.useCase";
import {ICreateStateUseCase} from "@location/useCases/createState/ICreateState.useCase";
import {LogExecution} from "@coreShared/decorators/LogExecution";
import {Request, Response} from "express";
import {ResultType} from "@coreShared/types/result.type";
import {ApiResponseUtil} from "@coreShared/utils/apiResponse.util";
import {StatusCodes} from "http-status-codes";
import {
    CreateCountryDTO,
    CreateCountryResponseDTO,
    FindCountriesRawDTO,
    FindCountriesResponseDTO, UpdateCountryDTO, UpdateCountryResponseDTO
} from "@location/adapters/dtos/country.dto";
import {
    CreateCityDTO,
    CreateCityResponseDTO,
    FindCitiesRawDTO,
    FindCitiesResponseDTO, UpdateCityDTO, UpdateCityResponseDTO
} from "@location/adapters/dtos/city.dto";
import {
    CreateStateDTO,
    CreateStateResponseDTO,
    FindStatesRawDTO,
    FindStatesResponseDTO, UpdateStateDTO, UpdateStateResponseDTO
} from "@location/adapters/dtos/state.dto";
import {IFindCitiesUseCase} from "@location/useCases/findCities/IFindCities.useCase";
import {IFindStatesUseCase} from "@location/useCases/findStates/IFindStates.useCase";
import {IFindCountriesUseCase} from "@location/useCases/findCountries/IFindCountries.useCase";
import {IUpdateCityUseCase} from "@location/useCases/updateCity/IUpdateCity.useCase";
import {IUpdateCountryUseCase} from "@location/useCases/updateCountry/IUpdateCountry.UseCase";
import {IUpdateStateUseCase} from "@location/useCases/updateState/IUpdateState.useCase";
import {UpdateResultType} from "@coreShared/types/crudResult.type";
import {CityEntity} from "@location/domain/entities/city.entity";
import {IDeleteStateUseCase} from "@location/useCases/deleteState/IDeleteState.useCase";
import {IDeleteCountryUseCase} from "@location/useCases/deleteCountry/IDeleteCountry.useCase";
import {IDeleteCityUseCase} from "@location/useCases/deleteCity/IDeleteCity.useCase";
import {DeleteRequestDTO, DeleteResponseDTO} from "@coreShared/dtos/operation.dto";

@injectable()
export class LocationController implements ILocationController {
    constructor(
        @inject("ICreateCountryUseCase") private readonly createCountryUseCase: ICreateCountryUseCase,
        @inject("ICreateStateUseCase") private readonly createStateUseCase: ICreateStateUseCase,
        @inject("ICreateCityUseCase") private readonly createCityUseCase: ICreateCityUseCase,
        @inject("IFindCountriesUseCase") private readonly findCountriesUseCase: IFindCountriesUseCase,
        @inject("IFindStatesUseCase") private readonly findStatesUseCase: IFindStatesUseCase,
        @inject("IFindCitiesUseCase") private readonly findCitiesUseCase: IFindCitiesUseCase,
        @inject("IUpdateCountryUseCase") private readonly updateCountryUseCase: IUpdateCountryUseCase,
        @inject("IUpdateStateUseCase") private readonly updateStateUseCase: IUpdateStateUseCase,
        @inject("IUpdateCityUseCase") private readonly updateCityUseCase: IUpdateCityUseCase,
        @inject("IDeleteCountryUseCase") private readonly deleteCountryUseCase: IDeleteCountryUseCase,
        @inject("IDeleteStateUseCase") private readonly deleteStateUseCase: IDeleteStateUseCase,
        @inject("IDeleteCityUseCase") private readonly deleteCityUseCase: IDeleteCityUseCase,
    ) {
    }

    //#region COUNTRY
    @LogExecution()
    async createCountry(req: Request, res: Response): Promise<Response> {
        const input: CreateCountryDTO = req.body;
        const result: ResultType<CreateCountryResponseDTO> = await this.createCountryUseCase.execute(input);

        if (result.isSuccess()) {
            return ApiResponseUtil.success<CreateCountryResponseDTO>(res, result.unwrap(), StatusCodes.CREATED);
        }

        return ApiResponseUtil.handleResultError(res, result.getError());
    }

    @LogExecution()
    async findCountries(req: Request, res: Response): Promise<Response> {
        const input: FindCountriesRawDTO = req.query as FindCountriesRawDTO;
        const result: ResultType<FindCountriesResponseDTO> = await this.findCountriesUseCase.execute(input);
        if (result.isSuccess()) {
            return ApiResponseUtil.success<FindCountriesResponseDTO>(res, result.unwrap(), StatusCodes.OK);
        }

        return ApiResponseUtil.handleResultError(res, result.getError());
    }

    @LogExecution()
    async updateCountry(req: Request, res: Response): Promise<Response> {
        const input = req.body as UpdateCountryDTO;
        const result: ResultType<UpdateResultType<UpdateCountryResponseDTO>> = await this.updateCountryUseCase.execute(input);
        if (!result.isSuccess()) {
            return ApiResponseUtil.handleResultError(res, result.getError());
        }

        return ApiResponseUtil.handleUpdateResult<UpdateCountryResponseDTO>(res, result.unwrap());
    }

    @LogExecution()
    async deleteCountry(req: Request, res: Response): Promise<Response> {
        const input: DeleteRequestDTO = req.query as DeleteRequestDTO;
        const result: ResultType<DeleteResponseDTO> = await this.deleteCountryUseCase.execute(input);

        if (!result.isSuccess()) {
            return ApiResponseUtil.handleResultError(res, result.getError());
        }

        return ApiResponseUtil.handleDeleteResult(res, result.unwrap().report);
    }
    //#endregion

    //#region STATE
    @LogExecution()
    async createState(req: Request, res: Response): Promise<Response> {
        const input: CreateStateDTO = req.body;
        const result: ResultType<CreateStateResponseDTO> = await this.createStateUseCase.execute(input);

        if (result.isSuccess()) {
            return ApiResponseUtil.success<CreateStateResponseDTO>(res, result.unwrap(), StatusCodes.CREATED);
        }

        return ApiResponseUtil.handleResultError(res, result.getError());
    }

    @LogExecution()
    async findStates(req: Request, res: Response): Promise<Response> {
        const input: FindStatesRawDTO = req.query as FindStatesRawDTO;
        const result: ResultType<FindStatesResponseDTO> = await this.findStatesUseCase.execute(input);
        if (result.isSuccess()) {
            return ApiResponseUtil.success<FindStatesResponseDTO>(res, result.unwrap(), StatusCodes.OK);
        }

        return ApiResponseUtil.handleResultError(res, result.getError());
    }

    @LogExecution()
    async updateState(req: Request, res: Response): Promise<Response> {
        const input = req.body as UpdateStateDTO;
        const result: ResultType<UpdateResultType<UpdateStateResponseDTO>> = await this.updateStateUseCase.execute(input);
        if (!result.isSuccess()) {
            return ApiResponseUtil.handleResultError(res, result.getError());
        }

        return ApiResponseUtil.handleUpdateResult<UpdateStateResponseDTO>(res, result.unwrap());
    }

    @LogExecution()
    async deleteState(req: Request, res: Response): Promise<Response> {
        const input: DeleteRequestDTO = req.query as DeleteRequestDTO;
        const result: ResultType<DeleteResponseDTO> = await this.deleteStateUseCase.execute(input);

        if (!result.isSuccess()) {
            return ApiResponseUtil.handleResultError(res, result.getError());
        }

        return ApiResponseUtil.handleDeleteResult(res, result.unwrap().report);
    }
    //#endregion

    //#region CITY
    @LogExecution()
    async createCity(req: Request, res: Response): Promise<Response> {
        const input: CreateCityDTO = req.body;
        const result: ResultType<CreateCityResponseDTO> = await this.createCityUseCase.execute(input);

        if (result.isSuccess()) {
            return ApiResponseUtil.success<CreateCityResponseDTO>(res, result.unwrap(), StatusCodes.CREATED);
        }

        return ApiResponseUtil.handleResultError(res, result.getError());
    }

    @LogExecution()
    async findCities(req: Request, res: Response): Promise<Response> {
        const input: FindCitiesRawDTO = req.query as FindCitiesRawDTO;
        const result: ResultType<FindCitiesResponseDTO> = await this.findCitiesUseCase.execute(input);
        if (result.isSuccess()) {
            return ApiResponseUtil.success<FindCitiesResponseDTO>(res, result.unwrap(), StatusCodes.OK);
        }

        return ApiResponseUtil.handleResultError(res, result.getError());
    }

    @LogExecution()
    async updateCity(req: Request, res: Response): Promise<Response> {
        const input = req.body as UpdateCityDTO;
        const result: ResultType<UpdateResultType<UpdateCityResponseDTO>> = await this.updateCityUseCase.execute(input);
        if (!result.isSuccess()) {
            return ApiResponseUtil.handleResultError(res, result.getError());
        }

        return ApiResponseUtil.handleUpdateResult<CityEntity>(res, result.unwrap());
    }

    @LogExecution()
    async deleteCity(req: Request, res: Response): Promise<Response> {
        const input: DeleteRequestDTO = req.query as DeleteRequestDTO;
        const result: ResultType<DeleteResponseDTO> = await this.deleteCityUseCase.execute(input);

        if (!result.isSuccess()) {
            return ApiResponseUtil.handleResultError(res, result.getError());
        }

        return ApiResponseUtil.handleDeleteResult(res, result.unwrap().report);
    }

    //#endregion
}