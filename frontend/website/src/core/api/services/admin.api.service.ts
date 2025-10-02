import axios from "../client/http.ts";
import type {
    GetAllEntitiesNamesDTO,
    GetAllEntityDataResponseDTO,
    GetAllModelAttributesResponseDTO, GetEntityByIdResponseDTO
} from "../types/admin.type.ts";
import {adminServiceUrl} from "../../constants/url.constant.ts";
import {ServiceError} from "../../errors/generic.error.ts";
import {t} from "../../constants/messages/translations.ts";
import {errorMessage} from "../../constants/messages/error.message.ts";

class AdminApiService {
    private readonly findAllSuffix: string = "findAll";

    async getAllEntitiesNames(): Promise<GetAllEntitiesNamesDTO> {
        const {data} = await axios.get(adminServiceUrl.getAllEntitiesNames);

        if (!data.success) {
            throw new ServiceError(t(errorMessage.appError.api.get));
        }

        return data.result as GetAllEntitiesNamesDTO;
    }

    async getAllEntityAttributes(modelName: string, cleanDatabaseProps: boolean = true): Promise<GetAllModelAttributesResponseDTO> {
        const url: string = `${adminServiceUrl.getModelAttributes}/${modelName}`;
        const {data} = await axios.get(url);

        if (!data.success) {
            throw new ServiceError(t(errorMessage.appError.api.get));
        }

        if (cleanDatabaseProps) {
            return this.removeDatabaseProps(data.result);
        }

        return data.result as GetAllModelAttributesResponseDTO;
    }

    public async findAllEntityData(entity: string, page?: number, limit?: number, props?: string): Promise<GetAllEntityDataResponseDTO> {
        let url: string = `/${entity}/${this.findAllSuffix}?`;

        if (page) {
            url += `&page=${page}`;
        }

        if (limit) {
            url += `&limit=${limit}`;
        }

        if (props) {
            url += `&${props}`;
        }

        const {data} = await axios.get(url);

        return data.result;
    }

    public async getEntityById(entity: string, id: number): Promise<GetEntityByIdResponseDTO> {
        const props = `id=${id}`;

        return (await this.findAllEntityData(entity, 1, 1, props)).data[0];
    }

    private removeDatabaseProps(datas: GetAllModelAttributesResponseDTO): GetAllModelAttributesResponseDTO {
        return datas.filter(
            (d) => d.columnName !== "updatedAt" && d.columnName !== "createdAt"
        );
    }
}

export const adminApiService = new AdminApiService();
