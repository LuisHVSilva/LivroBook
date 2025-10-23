import {inject, injectable} from "tsyringe";
import {IFindPhonesUseCase} from "@phone/useCase/read/findPhones/IFindPhones.useCase";
import {IPhoneService} from "@phone/domain/service/interfaces/IPhone.service";
import {LogExecution} from "@coreShared/decorators/LogExecution";
import {FindPhonesRawDTO, FindPhonesResponseDTO, PhoneDTO, PhoneFilterDTO} from "@phone/adapters/dtos/phone.dto";
import {ResultType} from "@coreShared/types/result.type";
import {UseCaseResponseError} from "@coreShared/errors/useCaseResponse.error";
import {StringUtil} from "@coreShared/utils/string.util";
import {FindAllType} from "@coreShared/types/findAll.type";

@injectable()
export class FindPhonesUseCase implements IFindPhonesUseCase {
    constructor(
        @inject("IPhoneService") private readonly service: IPhoneService
    ) {
    }

    @LogExecution()
    async execute(input: FindPhonesRawDTO): Promise<ResultType<FindPhonesResponseDTO>> {
        try {
            const filter: PhoneFilterDTO = this.mapPhoneFilter(input);
            const page: number = input.page ? StringUtil.strToNumber(input.page) : 1;
            const limit: number = input.limit ? StringUtil.strToNumber(input.limit) : 20;

            const phones: FindAllType<PhoneDTO> = await this.service.findMany(filter, page, limit);

            return ResultType.success({
                page,
                limit,
                totalPages: Math.ceil(phones.total / limit),
                data: phones.entities
            })
        } catch (error) {
            return UseCaseResponseError.handleResultError(error);
        }
    }

    private mapPhoneFilter(input: FindPhonesRawDTO): PhoneFilterDTO {
        return {
            id: StringUtil.parseCsvFilter(input.id?.toString(), Number),
            number: StringUtil.parseCsvFilter(input.number?.toString(), String),
            phoneCodeDdiCode: StringUtil.parseCsvFilter(input.ddiCode?.toString(), Number),
            phoneCodeDddCode: StringUtil.parseCsvFilter(input.dddCode?.toString(), Number),
            phoneType: StringUtil.parseCsvFilter(input.phoneType?.toString(), String),
            status: StringUtil.parseCsvFilter(input.status?.toString(), String)
        }
    }
}