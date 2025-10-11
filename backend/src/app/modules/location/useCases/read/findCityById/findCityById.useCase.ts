import {inject, injectable} from "tsyringe";
import {FindByIdRequestDTO} from "@coreShared/dtos/operation.dto";
import {ResultType} from "@coreShared/types/result.type";
import {StringUtil} from "@coreShared/utils/string.util";
import {UseCaseResponseUtil} from "@coreShared/utils/useCaseResponse.util";
import {IFindCityByIdUseCase} from "@location/useCases/read/findCityById/IFindCityById.useCase";
import {ICityService} from "@location/domain/services/interfaces/ICity.service";
import {FindByIdCityResponseDto} from "@location/adapters/dtos/city.dto";
import {CityEntity} from "@location/domain/entities/city.entity";
import {LogError} from "@coreShared/decorators/LogError";

@injectable()
export class FindCityByIdUseCase implements IFindCityByIdUseCase {
    constructor(
        @inject("ICityService")
        private readonly service: ICityService,
    ) {
    }

    @LogError()
    async execute(input: FindByIdRequestDTO): Promise<ResultType<FindByIdCityResponseDto>> {
        try {
            const id: number = StringUtil.strToNumber(input.id);
            const entity: CityEntity = await this.service.getById(id);

            return ResultType.success(entity);
        } catch (error) {
            return UseCaseResponseUtil.handleResultError(error);
        }
    }
}