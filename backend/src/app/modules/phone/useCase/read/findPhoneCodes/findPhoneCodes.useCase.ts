import {inject, injectable} from "tsyringe";
import {IPhoneCodeService} from "@phone/domain/service/interfaces/IPhoneCode.service";
import {
    FindPhoneCodesRawDTO,
    FindPhoneCodesResponseDTO,
    PhoneCodeDTO,
    PhoneCodeFilterDTO
} from "@phone/adapters/dtos/phoneCode.dto";
import {ResultType} from "@coreShared/types/result.type";
import {UseCaseResponseError} from "@coreShared/errors/useCaseResponse.error";
import {StringUtil} from "@coreShared/utils/string.util";
import {FindAllType} from "@coreShared/types/findAll.type";
import {LogError} from "@coreShared/decorators/LogError";
import {IFindPhoneCodesUseCase} from "@phone/useCase/read/findPhoneCodes/IFindPhoneCodes.useCase";

@injectable()
export class FindPhoneCodesUseCase implements IFindPhoneCodesUseCase {
    constructor(
        @inject("IPhoneCodeService") private readonly service: IPhoneCodeService,
    ) {
    }

    @LogError()
    async execute(input: FindPhoneCodesRawDTO): Promise<ResultType<FindPhoneCodesResponseDTO>> {
        try {
            const filter: PhoneCodeFilterDTO = this.mapPhoneCodesFilter(input);
            const page: number = input.page ? StringUtil.strToNumber(input.page) : 1;
            const limit: number = input.limit ? StringUtil.strToNumber(input.limit) : 20;

            const phoneCodes: FindAllType<PhoneCodeDTO> = await this.service.findMany(filter, page, limit);

            return ResultType.success({
                page,
                limit,
                totalPages: Math.ceil(phoneCodes.total / limit),
                data: phoneCodes.entities
            });

        } catch (error) {
            return UseCaseResponseError.handleResultError(error);
        }
    }

    private mapPhoneCodesFilter(input: FindPhoneCodesRawDTO): PhoneCodeFilterDTO {
        return {
            id: StringUtil.parseCsvFilter(input.id?.toString(), Number),
            ddiCode: StringUtil.parseCsvFilter(input.ddiCode?.toString(), Number),
            dddCode: StringUtil.parseCsvFilter(input.dddCode?.toString(), Number),
            state: StringUtil.parseCsvFilter(input.state?.toString(), String),
            status: StringUtil.parseCsvFilter(input.status?.toString(), String)
        }
    }
}