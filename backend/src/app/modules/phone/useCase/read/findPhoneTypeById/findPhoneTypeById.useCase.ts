import {inject, injectable} from "tsyringe";
import {FindByIdRequestDTO} from "@coreShared/dtos/operation.dto";
import {ResultType} from "@coreShared/types/result.type";
import {StringUtil} from "@coreShared/utils/string.util";
import {UseCaseResponseUtil} from "@coreShared/utils/useCaseResponse.util";
import {LogError} from "@coreShared/decorators/LogError";
import {IFindPhoneTypeByIdUseCase} from "@phone/useCase/read/findPhoneTypeById/IFindPhoneTypeById.useCase";
import {FindByIdPhoneTypeResponseDTO} from "@phone/adapters/dtos/phoneType.dto";
import {IPhoneTypeService} from "@phone/domain/service/interfaces/IPhoneType.service";
import {PhoneTypeEntity} from "@phone/domain/entities/phoneType.entity";

@injectable()
export class FindPhoneTypeByIdUseCase implements IFindPhoneTypeByIdUseCase {
    constructor(
        @inject("IPhoneTypeService")
        private readonly service: IPhoneTypeService,
    ) {
    }

    @LogError()
    async execute(input: FindByIdRequestDTO): Promise<ResultType<FindByIdPhoneTypeResponseDTO>> {
        try {
            const id: number = StringUtil.strToNumber(input.id);
            const entity: PhoneTypeEntity = await this.service.getById(id);

            return ResultType.success(entity);
        } catch (error) {
            return UseCaseResponseUtil.handleResultError(error);
        }
    }
}