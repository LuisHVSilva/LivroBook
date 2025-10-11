import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import {IControllerBase} from "@coreShared/base/interfaces/IControllerBase";
import {ApiResponseUtil} from "@coreShared/utils/apiResponse.util";
import {IUseCase} from "@coreShared/interfaces/IUseCase";
import {ResultType} from "@coreShared/types/result.type";
import {FindByIdRequestDTO} from "@coreShared/dtos/operation.dto";
import {AbstractControllerBaseType} from "@coreShared/types/controller.type";

export abstract class ControllerBase<T extends AbstractControllerBaseType<any, any, any, any, any, any, any, any>> implements IControllerBase {

    protected constructor(
        protected readonly createUseCase: IUseCase<T["TCreateReq"], T["TCreateRes"]>,
        protected readonly findByIdUseCase: IUseCase<T["TFindByIdReq"], T["TFindByIdRes"]>,
        protected readonly findAllUseCase: IUseCase<T["TFindAllReq"], T["TFindAllRes"]>,
        protected readonly updateUseCase: IUseCase<T["TUpdateReq"], T["TUpdateRes"]>,
        protected readonly deleteUseCase: IUseCase<T["TDeleteReq"], T["TDeleteRes"]>,


    ) {}
    
    async create(req: Request, res: Response): Promise<Response> {
        const input: T["TCreateReq"] = req.body;
        const result: ResultType<T["TCreateRes"]> = await this.createUseCase.execute(input);

        if (result.isSuccess()) {
            return ApiResponseUtil.success(res, result.unwrap(), StatusCodes.CREATED);
        }
        return ApiResponseUtil.handleResultError(res, result.getError());
    }

    async findById(req: Request, res: Response): Promise<Response> {
        const input: FindByIdRequestDTO = req.params as unknown as T["TFindByIdReq"];
        const result: ResultType<T["TFindByIdRes"]> = await this.findByIdUseCase.execute(input);

        if (result.isSuccess()) {
            return ApiResponseUtil.success(res, result.unwrap(), StatusCodes.OK);
        }
        if (result.isNone()) {
            return ApiResponseUtil.notFound(res, "Registro não encontrado");
        }
        return ApiResponseUtil.handleResultError(res, result.getError());
    }

    async findAll(req: Request, res: Response): Promise<Response> {
        const input: T["TFindAllReq"] = req.query as unknown as T["TFindAllReq"];
        const result: ResultType<T["TFindAllRes"]> = await this.findAllUseCase.execute(input);

        if (result.isSuccess()) {
            return ApiResponseUtil.success(res, result.unwrap(), StatusCodes.OK);
        }
        if (result.isNone()) {
            return ApiResponseUtil.notFound(res, "Nenhum registro encontrado");
        }
        return ApiResponseUtil.handleResultError(res, result.getError());
    }

    async update(req: Request, res: Response): Promise<Response> {
        const input: T["TUpdateReq"] = req.body;
        const result: ResultType<T["TUpdateReq"]> = await this.updateUseCase.execute(input);

        if (!result.isSuccess()) {
            return ApiResponseUtil.handleResultError(res, result.getError());
        }
        return ApiResponseUtil.handleUpdateResult<T["TEntity"]>(res, result.unwrap());
    }

    async delete(req: Request, res: Response): Promise<Response> {
        const input: T["TDeleteReq"] = req.query as unknown as T["TDeleteReq"];
        const result: ResultType<T["TDeleteRes"]> = await this.deleteUseCase.execute(input);

        if (!result.isSuccess()) {
            return ApiResponseUtil.handleResultError(res, result.getError());
        }
        return ApiResponseUtil.handleDeleteResult(res, result.unwrap().report);
    }
}
