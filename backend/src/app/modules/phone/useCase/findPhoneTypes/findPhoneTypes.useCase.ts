import {inject, injectable} from "tsyringe";
import {IFindPhoneTypesUseCase} from "@phone/useCase/findPhoneTypes/IFindPhoneTypes.useCase";
import {IPhoneTypeService} from "@phone/domain/service/interfaces/IPhoneType.service";
import {LogExecution} from "@coreShared/decorators/LogExecution";
import {
    FindPhoneTypesDTO,
    FindPhoneTypesResponseDTO,
    PhoneTypeDTO,
    PhoneTypeFilterDTO
} from "@phone/adapters/dtos/phoneType.dto";
import {UseCaseResponseUtil} from "@coreShared/utils/useCaseResponse.util";
import {ResultType} from "@coreShared/types/result.type";
import {StringUtil} from "@coreShared/utils/string.util";
import {FindAllType} from "@coreShared/types/findAll.type";

@injectable()
export class FindPhoneTypesUseCase implements IFindPhoneTypesUseCase {
    constructor(
        @inject("IPhoneTypeService") private readonly phoneTypeService: IPhoneTypeService,
    ) {
    }

    @LogExecution()
    async execute(input: FindPhoneTypesDTO): Promise<ResultType<FindPhoneTypesResponseDTO>> {
        try {
            const filter: PhoneTypeFilterDTO = this.mapPhoneTypesFilter(input);
            const page: number = input.page ? StringUtil.strToNumber(input.page) : 1;
            const limit: number = input.limit ? StringUtil.strToNumber(input.limit) : 20;

            const phoneTypes: FindAllType<PhoneTypeDTO> = await this.phoneTypeService.findMany(filter, page, limit);

            return ResultType.success({
                page,
                limit,
                totalPages: Math.ceil(phoneTypes.total / limit),
                data: phoneTypes.entities
            });
        } catch (error) {
            return UseCaseResponseUtil.handleResultError(error);
        }
    }

    private mapPhoneTypesFilter(input: FindPhoneTypesDTO): PhoneTypeFilterDTO {
        return {
            id: StringUtil.parseCsvFilter(input.id?.toString(), Number),
            description: StringUtil.parseCsvFilter(input.description?.toString(), String),
            statusId: StringUtil.parseCsvFilter(input.statusId?.toString(), Number),
        };
    }
}