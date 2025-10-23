import {inject, injectable} from "tsyringe";
import {FindByIdRequestDTO} from "@coreShared/dtos/operation.dto";
import {ResultType} from "@coreShared/types/result.type";
import {StringUtil} from "@coreShared/utils/string.util";
import {UseCaseResponseError} from "@coreShared/errors/useCaseResponse.error";
import {IFindCountryByIdUseCase} from "@location/useCases/read/findCountryById/IFindCountryById.useCase";
import {ICountryService} from "@location/domain/services/interfaces/ICountry.service";
import {FindByIdCountryResponseDTO} from "@location/adapters/dtos/country.dto";
import {CountryEntity} from "@location/domain/entities/country.entity";
import {LogError} from "@coreShared/decorators/LogError";

@injectable()
export class FindCountryByIdUseCase implements IFindCountryByIdUseCase {
    constructor(
        @inject("ICountryService")
        private readonly service: ICountryService,
    ) {
    }

    @LogError()
    async execute(input: FindByIdRequestDTO): Promise<ResultType<FindByIdCountryResponseDTO>> {
        try {
            const id: number = StringUtil.strToNumber(input.id);
            const entity: CountryEntity = await this.service.getById(id);

            return ResultType.success(entity);
        } catch (error) {
            return UseCaseResponseError.handleResultError(error);
        }
    }
}