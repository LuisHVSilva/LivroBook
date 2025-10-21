import axios from '../api/http.ts'
import {type AllModulesMap, allModulesUrls, type HttpMethodUrls} from "../api/endpoints.api.ts";
import {serverUtil} from "../utils/server/server.util.ts";
import {NullFieldError} from "../errors/generic.error.ts";
import {t} from "../models/messages/translations.ts";
import {errorMessage} from "../models/messages/error.message.ts";
import type {FindAllProps} from "../models/types/admin.type.ts";
import type {BaseEntityType} from "./entity.domain.base.ts";


export type RepositoryClassType<TRepo extends EntityRepositoryBase<any, any>> = {
    new(): TRepo;
};

export abstract class EntityRepositoryBase<
    TProps extends BaseEntityType,
    E extends keyof AllModulesMap
> {
    protected readonly entityName: E;

    protected constructor(entityName: E) {
        this.entityName = entityName;
    }

    public async getById(id: string): Promise<TProps | null> {
        const url = this.getEndpointPath("get", "findById");
        const {data} = await axios.get<{ result?: TProps }>(
            `${url}/${id}`
        );

        if (!data?.result) return null;
        return data.result;
    }

    public async findAll(
        filters?: Partial<TProps>,
        page?: number,
        limit?: number
    ): Promise<FindAllProps<TProps>> {
        const patternUrl = this.getEndpointPath("get", "findAll");
        const url = serverUtil.buildUrlWithParams(patternUrl, {
            ...filters,
            page,
            limit,
        });

        const {data} = await axios.get<{ result?: FindAllProps<TProps> }>(url);

        if (!data.result) {
            return {
                page: 0,
                limit: 0,
                totalPages: 0,
                data: [],
            };
        }

        return data.result;
    }

    public async create(payload: TProps): Promise<boolean> {
        const url:string = this.getEndpointPath("post", "create");
        await axios.post(url, payload);
        return true;
    }

    /**
     * Partially updates an entity
     */
    public async alter(payload: Partial<TProps>): Promise<boolean> {
        const url = this.getEndpointPath("patch", "update");
        await axios.patch(url, payload);
        return true;
    }

    public async delete(id: number | string): Promise<void> {
        if (!id) {
            throw new NullFieldError(t(errorMessage.nullFieldError.required, {field: "id"}));
        }

        const url = `${this.getEndpointPath("delete", "delete")}?id=${String(id)}`;
        await axios.delete(url);
    }

    /**
     * Resolves the correct module/method/action endpoint
     */
    private getEndpointPath<
        M extends keyof HttpMethodUrls,
        A extends keyof NonNullable<AllModulesMap[E][M]>
    >(method: M, action: A): string {
        const module = allModulesUrls[this.entityName];
        if (!module) {
            throw new Error(`Entidade '${String(this.entityName)}' não encontrada.`);
        }

        const methodGroup = module[method];
        if (!methodGroup) {
            throw new Error(`Método '${String(method)}' não existe em '${String(this.entityName)}'.`);
        }

        const url = methodGroup[action];
        if (!url) {
            throw new Error(
                `Ação '${String(action)}' não existe em '${String(this.entityName)}.${String(method)}'.`
            );
        }

        return String(url);
    }
}
