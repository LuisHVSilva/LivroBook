import {inject, injectable} from "tsyringe";
import {FindByIdRequestDTO} from "@coreShared/dtos/operation.dto";
import {ResultType} from "@coreShared/types/result.type";
import {StringUtil} from "@coreShared/utils/string.util";
import {UseCaseResponseError} from "@coreShared/errors/useCaseResponse.error";
import {LogError} from "@coreShared/decorators/LogError";
import {IFindPhoneByIdUseCase} from "@phone/useCase/read/findPhoneById/IFindPhoneById.useCase";
import {IPhoneService} from "@phone/domain/service/interfaces/IPhone.service";
import {FindByIdPhoneResponseDTO} from "@phone/adapters/dtos/phone.dto";
import {PhoneEntity} from "@phone/domain/entities/phone.entity";

@injectable()
export class FindPhoneByIdUseCase implements IFindPhoneByIdUseCase {
    constructor(
        @inject("IPhoneService")
        private readonly service: IPhoneService,
    ) {
    }

    @LogError()
    async execute(input: FindByIdRequestDTO): Promise<ResultType<FindByIdPhoneResponseDTO>> {
        try {
            const id: number = StringUtil.strToNumber(input.id);
            const entity: PhoneEntity = await this.service.getById(id);

            return ResultType.success(entity);
        } catch (error) {
            return UseCaseResponseError.handleResultError(error);
        }
    }
}