import axios from "../../client/http.ts";
import type {
    GetAllEntitiesNamesDTO,
    GetAllEntityDataResponseDTO,
    GetAllModelAttributesResponseDTO, GetEntityByIdResponseDTO
} from "../../types/admin.type.ts";
import {ServiceError} from "../../../errors/generic.error.ts";
import {t} from "../../../constants/messages/translations.ts";
import {errorMessage} from "../../../constants/messages/error.message.ts";
import {type AllModulesMap, metadataUrl} from "../../../constants/url.constant.ts";
import {mapApiService} from "../../../maps/apiServices.map.ts";

class AdminApiService {

    async getAllEntitiesNames(): Promise<GetAllEntitiesNamesDTO> {
        const {data} = await axios.get(metadataUrl.getAllEntitiesNames);

        if (!data.success) {
            throw new ServiceError(t(errorMessage.appError.api.get));
        }

        return data.result as GetAllEntitiesNamesDTO;
    }

    async getAllEntityAttributes(modelName: string, cleanDatabaseProps: boolean = true): Promise<GetAllModelAttributesResponseDTO> {
        const url: string = `${metadataUrl.getModelAttributes}/${modelName}`;
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
        let url: string = `${metadataUrl.findAllEntityData(entity as keyof AllModulesMap)}?`;
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

        data.result.data = this.treatResultData(data.result.data);
        return data.result;
    }

    public async getEntityById(entity: string, id: number): Promise<GetEntityByIdResponseDTO> {
        const url: string = `${metadataUrl.findEntityDataById(entity as keyof AllModulesMap)}/${id}`;
        const {data} = await axios.get(url);
        return this.treatResultData(data.result) as GetEntityByIdResponseDTO;
    }

    public async preAlterEntity(entityName: string): Promise<Record<string, unknown>> {
        const service = mapApiService(entityName);

        return service?.preAlter ? await service.preAlter() : {};
    }

    public async alterEntity(entityName: string, payload: Record<string, string>): Promise<boolean> {
        try {
            const service = mapApiService(entityName);
            if (!service) {
                console.log(new Error(`Service '${entityName}' not found.`));
                return false;
            }

            return await service.alter(payload);
        } catch (e) {
            if (e instanceof Error) {
                console.log(`An error occurred while alter entity: ${e}`);
            }
            return false;
        }

    }

    private removeDatabaseProps(datas: GetAllModelAttributesResponseDTO): GetAllModelAttributesResponseDTO {
        return datas.filter(
            (d) => d.columnName !== "updatedAt" && d.columnName !== "createdAt"
        );
    }

    private treatResultData(result: Record<string, unknown>): unknown {
        if (!Array.isArray(result)) {
            return this.flattenObject(result as Record<string, unknown>);
        }

        return result.map((item) => this.flattenObject(item));
    }

    private flattenObject(obj: Record<string, unknown>): Record<string, unknown> {
        if (!obj || typeof obj !== "object" || Array.isArray(obj)) {
            return obj;
        }

        const flattened: Record<string, unknown> = {};

        for (const [key, value] of Object.entries(obj)) {
            if (value && typeof value === "object" && !Array.isArray(value)) {
                Object.assign(flattened, value);
            } else {
                flattened[key] = value;
            }
        }

        return flattened;
    }

}

export const adminApiService = new AdminApiService();
