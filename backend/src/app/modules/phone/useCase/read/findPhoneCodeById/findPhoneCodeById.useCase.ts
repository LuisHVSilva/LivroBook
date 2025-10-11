import {inject, injectable} from "tsyringe";
import {FindByIdRequestDTO} from "@coreShared/dtos/operation.dto";
import {ResultType} from "@coreShared/types/result.type";
import {StringUtil} from "@coreShared/utils/string.util";
import {UseCaseResponseUtil} from "@coreShared/utils/useCaseResponse.util";
import {LogError} from "@coreShared/decorators/LogError";
import {IPhoneCodeService} from "@phone/domain/service/interfaces/IPhoneCode.service";
import {PhoneCodeEntity} from "@phone/domain/entities/phoneCode.entity";
import {FindByIdPhoneCodeResponseDTO} from "@phone/adapters/dtos/phoneCode.dto";
import {IFindPhoneCodeByIdUseCase} from "@phone/useCase/read/findPhoneCodeById/IFindPhoneCodeById.useCase";

@injectable()
export class FindPhoneCodeByIdUseCase implements IFindPhoneCodeByIdUseCase {
    constructor(
        @inject("IPhoneCodeService")
        private readonly service: IPhoneCodeService,
    ) {
    }

    @LogError()
    async execute(input: FindByIdRequestDTO): Promise<ResultType<FindByIdPhoneCodeResponseDTO>> {
        try {
            const id: number = StringUtil.strToNumber(input.id);
            const entity: PhoneCodeEntity = await this.service.getById(id);

            return ResultType.success(entity);
        } catch (error) {
            return UseCaseResponseUtil.handleResultError(error);
        }
    }
}