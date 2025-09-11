import {inject, injectable} from "tsyringe";
import {Request, Response} from "express";
import {ResultType} from "@coreShared/types/result.type";
import {ApiResponseUtil} from "@coreShared/utils/apiResponse.util";
import {StatusCodes} from "http-status-codes";
import {IUserController} from "@user/adapters/controllers/IUser.controller";
import {ICreateUserTypeUseCase} from "@user/useCases/createUserType/ICreateUserType.useCase";
import {
    CreateUserTypeDTO,
    CreateUserTypeResponseDTO,
    FindUserTypesRawDTO,
    FindUserTypesResponseDTO, UpdateUserTypeDTO, UpdateUserTypeResponseDTO
} from "@user/adapters/dtos/userType.dto";
import {IFindUserTypesUseCase} from "@user/useCases/findUserTypes/IFindUserTypes.useCase";
import {EntitiesMessage} from "@coreShared/messages/entities.message";
import {IUpdateUserTypeUseCase} from "@user/useCases/updateUserType/IUpdateUserType.useCase";
import {UpdateResultType} from "@coreShared/types/crudResult.type";
import {IDeleteUserTypeUseCase} from "@user/useCases/deleteUserTypes/IDeleteUserType.useCase";
import {DeleteRequestDTO, DeleteResponseDTO} from "@coreShared/dtos/operation.dto";
import {
    ICreateUserCredentialTypeUseCase
} from "@user/useCases/createUserCredentialType/ICreateUserCredentialType.useCase";
import {IFindUserCredentialTypesUseCase} from "@user/useCases/findUserCredentialTypes/IFindUserCredentialTypes.useCase";
import {
    IUpdateUserCredentialTypeUseCase
} from "@user/useCases/updateUserCredentialType/IUpdateUserCredentialType.useCase";
import {
    IDeleteUserCredentialTypesUseCase
} from "@user/useCases/deleteUserCredentialTypes/IDeleteUserCredentialTypes.useCase";
import {
    CreateUserCredentialTypeDTO,
    CreateUserCredentialTypeResponseDTO, FindUserCredentialTypesRawDTO, FindUserCredentialTypesResponseDTO,
    UpdateUserCredentialTypeDTO, UpdateUserCredentialTypeResponseDTO
} from "@user/adapters/dtos/userCredentialType.dto";

@injectable()
export class UserController implements IUserController {
    //#region CONSTRUCTOR
    constructor(
        @inject("ICreateUserTypeUseCase") private readonly createUserTypeUseCase: ICreateUserTypeUseCase,
        @inject("IFindUserTypesUseCase") private readonly findUserTypesUseCase: IFindUserTypesUseCase,
        @inject("IUpdateUserTypeUseCase") private readonly updateUserTypeUseCase: IUpdateUserTypeUseCase,
        @inject("IDeleteUserTypeUseCase") private readonly deleteUserTypeUseCase: IDeleteUserTypeUseCase,
        @inject("ICreateUserCredentialTypeUseCase") private readonly createUserCredentialTypeUseCase: ICreateUserCredentialTypeUseCase,
        @inject("IFindUserCredentialTypesUseCase") private readonly findUserCredentialTypesUseCase: IFindUserCredentialTypesUseCase,
        @inject("IUpdateUserCredentialTypeUseCase") private readonly updateUserCredentialTypeUseCase: IUpdateUserCredentialTypeUseCase,
        @inject("IDeleteUserCredentialTypesUseCase") private readonly deleteUserCredentialTypesUseCase: IDeleteUserCredentialTypesUseCase,
    ) {
    }

    //#endergion

    //#region USER TYPE
    async createUserType(req: Request, res: Response): Promise<Response> {
        const input: CreateUserTypeDTO = req.body;
        const result: ResultType<CreateUserTypeResponseDTO> = await this.createUserTypeUseCase.execute(input);

        if (result.isSuccess()) {
            return ApiResponseUtil.success<CreateUserTypeResponseDTO>(res, result.unwrap(), StatusCodes.CREATED);
        }

        return ApiResponseUtil.handleResultError(res, result.getError());
    }

    async findUserTypes(req: Request, res: Response): Promise<Response> {
        const input: FindUserTypesRawDTO = req.query;
        const result: ResultType<FindUserTypesResponseDTO> = await this.findUserTypesUseCase.execute(input);

        if (result.isSuccess()) {
            return ApiResponseUtil.success<FindUserTypesResponseDTO>(res, result.unwrap(), StatusCodes.OK);
        }

        if (result.isNone()) {
            return ApiResponseUtil.notFound(res, EntitiesMessage.error.retrieval.notFoundGeneric);
        }

        return ApiResponseUtil.handleResultError(res, result.getError());
    }

    async updateUserType(req: Request, res: Response): Promise<Response> {
        const input = req.body as UpdateUserTypeDTO;
        const result: ResultType<UpdateResultType<UpdateUserTypeResponseDTO>> = await this.updateUserTypeUseCase.execute(input);
        if (!result.isSuccess()) {
            return ApiResponseUtil.handleResultError(res, result.getError());
        }

        return ApiResponseUtil.handleUpdateResult<UpdateUserTypeResponseDTO>(res, result.unwrap());
    }

    async deleteUserTypes(req: Request, res: Response): Promise<Response> {
        const input: DeleteRequestDTO = req.query as DeleteRequestDTO;
        const result: ResultType<DeleteResponseDTO> = await this.deleteUserTypeUseCase.execute(input);

        if (!result.isSuccess()) {
            return ApiResponseUtil.handleResultError(res, result.getError());
        }

        return ApiResponseUtil.handleDeleteResult(res, result.unwrap().report);
    }

    //#endregion

    //#region USER CREDENTIAL TYPE
    async createUserCredentialType(req: Request, res: Response): Promise<Response> {
        const input: CreateUserCredentialTypeDTO = req.body;
        const result: ResultType<CreateUserCredentialTypeResponseDTO> = await this.createUserCredentialTypeUseCase.execute(input);

        if (result.isSuccess()) {
            return ApiResponseUtil.success<CreateUserCredentialTypeResponseDTO>(res, result.unwrap(), StatusCodes.CREATED);
        }

        return ApiResponseUtil.handleResultError(res, result.getError());
    }

    async findUserCredentialType(req: Request, res: Response): Promise<Response> {
        const input: FindUserCredentialTypesRawDTO = req.query as FindUserCredentialTypesRawDTO;
        const result: ResultType<FindUserCredentialTypesResponseDTO> = await this.findUserCredentialTypesUseCase.execute(input);

        if (result.isSuccess()) {
            return ApiResponseUtil.success<FindUserCredentialTypesResponseDTO>(res, result.unwrap(), StatusCodes.OK);
        }

        if (result.isNone()) {
            return ApiResponseUtil.notFound(res, EntitiesMessage.error.retrieval.notFoundGeneric);
        }

        return ApiResponseUtil.handleResultError(res, result.getError());
    }

    async updateUserCredentialType(req: Request, res: Response): Promise<Response> {
        const input = req.body as UpdateUserCredentialTypeDTO;
        const result: ResultType<UpdateResultType<UpdateUserCredentialTypeResponseDTO>> = await this.updateUserCredentialTypeUseCase.execute(input);
        if (!result.isSuccess()) {
            return ApiResponseUtil.handleResultError(res, result.getError());
        }

        return ApiResponseUtil.handleUpdateResult<UpdateUserCredentialTypeResponseDTO>(res, result.unwrap());
    }

    async deleteUserCredentialType(req: Request, res: Response): Promise<Response> {
        const input: DeleteRequestDTO = req.query as DeleteRequestDTO;
        const result: ResultType<DeleteResponseDTO> = await this.deleteUserCredentialTypesUseCase.execute(input);

        if (!result.isSuccess()) {
            return ApiResponseUtil.handleResultError(res, result.getError());
        }

        return ApiResponseUtil.handleDeleteResult(res, result.unwrap().report);
    }

    //#endregion


}