import type {
    FindAllType,
    GetAllEntitiesNamesDTO,
    GetAllModelAttributesResponseDTO, FindByIdAdmin, EntityDtoInfos
} from "../../models/types/admin.type.ts";
import axios from '../../api/http.ts';
import {metadataUrl} from "../../api/endpoints.api.ts";
import {ServiceError} from "../../errors/generic.error.ts";
import {t} from "../../models/messages/translations.ts";
import {errorMessage} from "../../models/messages/error.message.ts";
import type {EntityDomainBase} from "../entity.domain.base.ts";
import {mapApiEntities, mapApiService} from "../../mappers/apiServices.mapper.ts";
import {DomainDecoratorUtil} from "../../utils/decorators/domain.decorator.util.ts";
import {DtoMapper} from "../../mappers/dto.mapper.ts";

class AdminApiService {

    private readonly keyToRemoveToCreateMethod: string = "status";

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

    public async findAllEntityData<T extends EntityDomainBase<any>>(
        entityName: string,
        page?: number,
        limit?: number
    ): Promise<FindAllType<T>> {
        const service = mapApiService(entityName);

        if (!service) {
            throw new Error(`Service '${entityName}' not found.`);
        }

        return await service.findAll(undefined, page, limit) as unknown as FindAllType<T>;
    }

    public async getEntityById<T extends EntityDomainBase<any>>(entityName: string, id: number): Promise<FindByIdAdmin<T> | null> {
        try {
            const service = mapApiService(entityName);
            const entity = await service.getById(id);

            if (!entity) {
                console.error(`Service '${entityName}' not found.`);
                return null;
            }

            const labels: Record<string, string> = DomainDecoratorUtil.getLabels(entity);
            const treatedData: Record<string, unknown>[] = this.treatResultData(entity.getProps());

            return treatedData.map((entityFlatten: Record<string, unknown>) => {
                const combinedEntries = Object.entries(entityFlatten).map(([key, value]) => [
                    key,
                    {
                        value,
                        label: labels[key] ?? key
                    },
                ]);

                return Object.fromEntries(combinedEntries);
            })[0];
        } catch (e) {
            if (e instanceof Error) {
                console.error(`An error occurred while alter entity: ${e}`);
            }
            return null;
        }
    }

    public async loadReferenceData(entityName: string, createMethod?: boolean): Promise<Record<string, unknown>> {
        const service = mapApiService(entityName);

        const referenceData: Record<string, unknown> = service?.loadReferenceData ? await service.loadReferenceData() : {};

        if (createMethod) {
            return this.removeKey(this.keyToRemoveToCreateMethod, referenceData);
        }

        return referenceData;
    }

    public async alterEntity(entityName: string, payload: Record<string, string>): Promise<boolean> {
        try {
            const service = mapApiService(entityName);
            return await service.alter(payload);
        } catch (e) {
            if (e instanceof Error) {
                console.error(`An error occurred while alter entity: ${e}`);
            }
            return false;
        }
    }

    public async deleteEntity(entityName: string, id: number | string): Promise<boolean> {
        try {
            const service = mapApiService(entityName);
            await service.delete(id);
            return true;
        } catch (e) {
            if (e instanceof Error) {
                console.error(`An error occurred while alter entity: ${e}`);
            }
            return false;
        }
    }

    public async addEntity(entityName: string, payload: Record<string, string>): Promise<boolean> {
        try {
            const service = mapApiService(entityName);

            if (!service) {
                console.error(`Service '${entityName}' not found.`);
                return false;
            }

            return await service.add(payload);
        } catch (e) {
            if (e instanceof Error) {
                console.error(`An error occurred while alter entity: ${e}`);
            }
            return false;
        }
    }

    public entityInfos(entityName: string, createMethod?: boolean): EntityDtoInfos[] {
        const entity = mapApiEntities(entityName);
        const fieldsInfos: EntityDtoInfos[] = DtoMapper.fieldsInfos(entity, true);

        if (createMethod) {
            return this.removeKey(this.keyToRemoveToCreateMethod, fieldsInfos);
        }

        return fieldsInfos;
    }

    private removeDatabaseProps(datas: GetAllModelAttributesResponseDTO): GetAllModelAttributesResponseDTO {
        return datas.filter(
            (d) => d.columnName !== "updatedAt" && d.columnName !== "createdAt"
        );
    }

    private treatResultData(result: Record<string, unknown>): Record<string, unknown>[] {
        if (!Array.isArray(result)) {
            const flattenObject = this.flattenObject(result as Record<string, unknown>);
            return [flattenObject];
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

    private removeKey<T extends Record<string, unknown> | Record<string, unknown>[]>(
        key: string,
        target: T
    ): T {
        if (Array.isArray(target)) {
            return target.filter(obj => !(key in obj)) as T;
        }

        if (key in target) {
            delete target[key];
        }

        return target;
    }
}

export const adminApiService = new AdminApiService();
