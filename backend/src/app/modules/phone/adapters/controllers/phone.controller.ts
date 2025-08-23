import {inject, injectable} from "tsyringe";
import {Request, Response} from "express";
import {ResultType} from "@coreShared/types/result.type";
import {ApiResponseUtil} from "@coreShared/utils/apiResponse.util";
import {StatusCodes} from "http-status-codes";
import {IPhoneController} from "@phone/adapters/controllers/IPhone.controller";
import {ICreatePhoneTypeUseCase} from "@phone/useCase/createPhoneType/ICreatePhoneType.useCase";
import {
    CreatePhoneTypeDTO, CreatePhoneTypeResponseDTO, FindPhoneTypesDTO,
    FindPhoneTypesResponseDTO, UpdatePhoneTypeDTO
} from "@phone/adapters/dtos/phoneType.dto";
import {EntitiesMessage} from "@coreShared/messages/entities.message";
import {IFindPhoneTypesUseCase} from "@phone/useCase/findPhoneTypes/IFindPhoneTypes.useCase";
import {IUpdatePhoneTypeUseCase} from "@phone/useCase/updatePhoneType/IUpdatePhoneType.useCase";
import {IDeletePhoneTypesUseCase} from "@phone/useCase/deletePhoneTypes/IDeletePhoneTypes.useCase";
import {ICreatePhoneCodeUseCase} from "@phone/useCase/createPhoneCode/ICreatePhoneCode.useCase";
import {
    CreatePhoneCodeDTO, CreatePhoneCodeResponseDTO, FindPhoneCodesDTO,
    FindPhoneCodesResponseDTO, UpdatePhoneCodeDTO
} from "@phone/adapters/dtos/phoneCode.dto";
import {IFindPhoneCodesUseCase} from "@phone/useCase/findPhoneCodeTypes/IFindPhoneCodes.useCase";
import {IUpdatePhoneCodeUseCase} from "@phone/useCase/updatePhoneCode/IUpdatePhoneCode.useCase";
import {IDeletePhoneCodesUseCase} from "@phone/useCase/deletePhoneCode/IDeletePhoneCodes.useCase";
import {ICreatePhoneUseCase} from "@phone/useCase/createPhone/ICreatePhone.useCase";
import {
    CreatePhoneDTO, CreatePhoneResponseDTO, FindPhonesDTO,
    FindPhonesResponseDTO, UpdatePhoneDTO
} from "@phone/adapters/dtos/phone.dto";
import {IFindPhonesUseCase} from "@phone/useCase/findPhones/IFindPhones.useCase";
import {IUpdatePhoneUseCase} from "@phone/useCase/updatePhone/IUpdatePhone.useCase";
import {IDeletePhoneUseCase} from "@phone/useCase/deletePhone/IDeletePhone.useCase";
import {PhoneTypeEntity} from "@phone/domain/entities/phoneType.entity";
import {DeleteRequestDTO, DeleteResponseDTO} from "@coreShared/dtos/operation.dto";
import {PhoneCodeEntity} from "@phone/domain/entities/phoneCode.entity";
import {PhoneEntity} from "@phone/domain/entities/phone.entity";
import {UpdateResultType} from "@coreShared/types/crudResult.type";

@injectable()
export class PhoneController implements IPhoneController {
    constructor(
        @inject("ICreatePhoneTypeUseCase") private readonly createPhoneTypeUseCase: ICreatePhoneTypeUseCase,
        @inject("IFindPhoneTypesUseCase") private readonly findPhoneTypesUseCase: IFindPhoneTypesUseCase,
        @inject("IUpdatePhoneTypeUseCase") private readonly updatePhoneTypeUseCase: IUpdatePhoneTypeUseCase,
        @inject("IDeletePhoneTypesUseCase") private readonly deletePhoneTypesUseCase: IDeletePhoneTypesUseCase,
        @inject("ICreatePhoneCodeUseCase") private readonly createPhoneCodeUseCase: ICreatePhoneCodeUseCase,
        @inject("IFindPhoneCodesUseCase") private readonly findPhoneCodesUseCase: IFindPhoneCodesUseCase,
        @inject("IUpdatePhoneCodeUseCase") private readonly updatePhoneCodeUseCase: IUpdatePhoneCodeUseCase,
        @inject("IDeletePhoneCodesUseCase") private readonly deletePhoneCodesUseCase: IDeletePhoneCodesUseCase,
        @inject("ICreatePhoneUseCase") private readonly createPhoneUseCase: ICreatePhoneUseCase,
        @inject("IFindPhonesUseCase") private readonly findPhonesUseCase: IFindPhonesUseCase,
        @inject("IUpdatePhoneUseCase") private readonly updatePhoneUseCase: IUpdatePhoneUseCase,
        @inject("IDeletePhoneUseCase") private readonly deletePhoneUseCase: IDeletePhoneUseCase,
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
        const result: ResultType<UpdateResultType<PhoneTypeEntity>> = await this.updatePhoneTypeUseCase.execute(input);

        if (result.isSuccess()) {
            return ApiResponseUtil.handleUpdateResult<PhoneTypeEntity>(res, result.unwrap());
        }

        return ApiResponseUtil.handleResultError(res, result.getError());
    }

    async deletePhoneTypes(req: Request, res: Response): Promise<Response> {
        const input = req.query as DeleteRequestDTO;
        const result: ResultType<DeleteResponseDTO> = await this.deletePhoneTypesUseCase.execute(input);

        if (result.isSuccess()) {
            return ApiResponseUtil.handleDeleteResult(res, result.unwrap().report);
        }

        return ApiResponseUtil.handleResultError(res, result.getError());
    }

    //#endregion

    //#region PHONE CODE
    async createPhoneCode(req: Request, res: Response): Promise<Response> {
        const input: CreatePhoneCodeDTO = req.body;
        const result: ResultType<CreatePhoneCodeResponseDTO> = await this.createPhoneCodeUseCase.execute(input);

        if (result.isSuccess()) {
            return ApiResponseUtil.success<CreatePhoneCodeResponseDTO>(res, result.unwrap(), StatusCodes.CREATED);
        }

        return ApiResponseUtil.handleResultError(res, result.getError());
    }

    async findPhoneCodes(req: Request, res: Response): Promise<Response> {
        const input: FindPhoneCodesDTO = req.query as FindPhoneCodesDTO;
        const result: ResultType<FindPhoneCodesResponseDTO> = await this.findPhoneCodesUseCase.execute(input);

        if (result.isSuccess()) {
            return ApiResponseUtil.success<FindPhoneCodesResponseDTO>(res, result.unwrap(), StatusCodes.OK);
        }

        if (result.isNone()) {
            return ApiResponseUtil.notFound(res, EntitiesMessage.error.retrieval.notFoundGeneric);
        }

        return ApiResponseUtil.handleResultError(res, result.getError());
    }

    async updatePhoneCode(req: Request, res: Response): Promise<Response> {
        const input = req.body as UpdatePhoneCodeDTO;
        const result: ResultType<UpdateResultType<PhoneCodeEntity>> = await this.updatePhoneCodeUseCase.execute(input);

        if (result.isSuccess()) {
            return ApiResponseUtil.handleUpdateResult<PhoneCodeEntity>(res, result.unwrap());
        }

        return ApiResponseUtil.handleResultError(res, result.getError());
    }

    async deletePhoneCodes(req: Request, res: Response): Promise<Response> {
        const input = req.query as DeleteRequestDTO;
        const result: ResultType<DeleteResponseDTO> = await this.deletePhoneCodesUseCase.execute(input);

        if (result.isSuccess()) {
            return ApiResponseUtil.handleDeleteResult(res, result.unwrap().report);
        }

        return ApiResponseUtil.handleResultError(res, result.getError());
    }

    //#endregion

    //#region PHONE
    async createPhone(req: Request, res: Response): Promise<Response> {
        const input: CreatePhoneDTO = req.body;
        const result: ResultType<CreatePhoneResponseDTO> = await this.createPhoneUseCase.execute(input);

        if (result.isSuccess()) {
            return ApiResponseUtil.success<CreatePhoneResponseDTO>(res, result.unwrap(), StatusCodes.CREATED);
        }

        return ApiResponseUtil.handleResultError(res, result.getError());
    }

    async findPhones(req: Request, res: Response): Promise<Response> {
        const input: FindPhonesDTO = req.query as FindPhonesDTO;
        const result: ResultType<FindPhonesResponseDTO> = await this.findPhonesUseCase.execute(input);

        if (result.isSuccess()) {
            return ApiResponseUtil.success<FindPhonesResponseDTO>(res, result.unwrap(), StatusCodes.OK);
        }

        if (result.isNone()) {
            return ApiResponseUtil.notFound(res, EntitiesMessage.error.retrieval.notFoundGeneric);
        }

        return ApiResponseUtil.handleResultError(res, result.getError());
    }

    async updatePhone(req: Request, res: Response): Promise<Response> {
        const input = req.body as UpdatePhoneDTO;
        const result: ResultType<UpdateResultType<PhoneEntity>> = await this.updatePhoneUseCase.execute(input);

        if (result.isSuccess()) {
            return ApiResponseUtil.handleUpdateResult<PhoneEntity>(res, result.unwrap());
        }

        return ApiResponseUtil.handleResultError(res, result.getError());
    }

    async deletePhone(req: Request, res: Response): Promise<Response> {
        const input = req.query as DeleteRequestDTO;
        const result: ResultType<DeleteResponseDTO> = await this.deletePhoneUseCase.execute(input);

        if (result.isSuccess()) {
            return ApiResponseUtil.handleDeleteResult(res, result.unwrap().report);
        }

        return ApiResponseUtil.handleResultError(res, result.getError());
    }

    //#endregion
}