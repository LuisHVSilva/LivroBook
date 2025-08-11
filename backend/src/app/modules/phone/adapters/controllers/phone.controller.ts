import {inject, injectable} from "tsyringe";
import {Request, Response} from "express";
import {ResultType} from "@coreShared/types/result.type";
import {ApiResponseUtil} from "@coreShared/utils/apiResponse.util";
import {StatusCodes} from "http-status-codes";
import {IPhoneController} from "@phone/adapters/controllers/IPhone.controller";
import {ICreatePhoneTypeUseCase} from "@phone/useCase/createPhoneType/ICreatePhoneTypeUseCase";
import {CreatePhoneTypeDTO, CreatePhoneTypeResponseDTO} from "@phone/adapters/dtos/phoneType.dto";

@injectable()
export class PhoneController implements IPhoneController {
    constructor(
        @inject("ICreatePhoneTypeUseCase") private readonly createPhoneTypeUseCase: ICreatePhoneTypeUseCase,
    ) {
    }

    async createPhoneType(req: Request, res: Response): Promise<Response> {
        const input: CreatePhoneTypeDTO = req.body;
        const result: ResultType<CreatePhoneTypeResponseDTO> = await this.createPhoneTypeUseCase.execute(input);

        if (result.isSuccess()) {
            return ApiResponseUtil.success<CreatePhoneTypeResponseDTO>(res, result.unwrap(), StatusCodes.CREATED);
        }

        return ApiResponseUtil.handleResultError(res, result.getError());
    }

}