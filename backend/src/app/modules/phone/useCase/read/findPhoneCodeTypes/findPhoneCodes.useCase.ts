import {inject, injectable} from "tsyringe";
import {IFindPhoneCodesUseCase} from "@phone/useCase/read/findPhoneCodeTypes/IFindPhoneCodes.useCase";
import {IPhoneCodeService} from "@phone/domain/service/interfaces/IPhoneCode.service";
import {LogExecution} from "@coreShared/decorators/LogExecution";
import {
    FindPhoneCodesRawDTO,
    FindPhoneCodesResponseDTO,
    PhoneCodeDTO,
    PhoneCodeFilterDTO
} from "@phone/adapters/dtos/phoneCode.dto";
import {ResultType} from "@coreShared/types/result.type";
import {UseCaseResponseUtil} from "@coreShared/utils/useCaseResponse.util";
import {StringUtil} from "@coreShared/utils/string.util";
import {FindAllType} from "@coreShared/types/findAll.type";

@injectable()
export class FindPhoneCodesUseCase implements IFindPhoneCodesUseCase {
    constructor(
        @inject("IPhoneCodeService") private readonly service: IPhoneCodeService,
    ) {
    }

    @LogExecution()
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
            return UseCaseResponseUtil.handleResultError(error);
        }
    }

    private mapPhoneCodesFilter(input: FindPhoneCodesRawDTO): PhoneCodeFilterDTO {
        return {
            id: StringUtil.parseCsvFilter(input.id?.toString(), Number),
            ddiCode: StringUtil.parseCsvFilter(input.ddiCode?.toString(), Number),
            dddCode: StringUtil.parseCsvFilter(input.dddCode?.toString(), Number),
            stateId: StringUtil.parseCsvFilter(input.stateId?.toString(), Number),
            statusId: StringUtil.parseCsvFilter(input.statusId?.toString(), Number)
        }
    }
}