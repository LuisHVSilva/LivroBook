import axios from "../client/http.ts";
import {type AllModulesMap, allModulesUrls, type HttpMethodUrls} from "../../constants/url.constant.ts";
import {serverUtil} from "../../utils/server.util.ts";
import {StatusEnum} from "../../enums/entity.enum.ts";
import {NullFieldError} from "../../errors/generic.error.ts";
import {t} from "../../constants/messages/translations.ts";
import {errorMessage} from "../../constants/messages/error.message.ts";


export abstract class BaseApiService<E extends keyof AllModulesMap, TEntity extends Record<string, unknown>> {
    private readonly entityName: E;

    public constructor(entityName: E) {
        this.entityName = entityName;
    }

    private getEndpointPath<
        M extends keyof HttpMethodUrls,
        A extends keyof NonNullable<AllModulesMap[E][M]>
    >(
        method: M,
        action: A
    ): string {
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

    public async getById(id: string): Promise<TEntity | null> {
        const url: string = this.getEndpointPath("get", "findById");
        const {data} = await axios.get(`${url}/${id}`);
        return data.result;
    }

    public async findAll(filters?: Partial<TEntity>): Promise<TEntity[]> {
        const patternUrl: string = this.getEndpointPath("get", "findAll");
        const url: string = serverUtil.buildUrlWithParams<TEntity>(patternUrl, filters);

        const {data} = await axios.get(url);
        return data.result.data as TEntity[];
    }

    public async alter(payload: Record<string, string>): Promise<boolean> {
        const url: string = this.getEndpointPath("patch", "update");
        if (payload.id === "" || payload.id === undefined) {
            throw new NullFieldError(t(errorMessage.nullFieldError.required, {field: "id"}));
        }
        const payloadTreated: Partial<TEntity> = this.convertStringToPartialEntity(payload);
        await axios.patch(url, payloadTreated);
        return true;
    }

    public async extractPropertiesList<K extends keyof TEntity>(
        props: K | K[],
        isActive: boolean = true
    ): Promise<Pick<TEntity, K>[]> {
        const filter = this.makeExtractPropertiesActiveFilter(isActive) as Partial<TEntity>;
        const entitiesList: TEntity[] = await this.findAll(filter);

        const propsArray = Array.isArray(props) ? props : [props];

        return entitiesList.map(entity => {
            const partial: Partial<TEntity> = {};
            for (const prop of propsArray) {
                partial[prop] = entity[prop];
            }
            return partial as Pick<TEntity, K>;
        });
    }


    private makeExtractPropertiesActiveFilter(isActive: boolean): Record<string, boolean | string> | null {
        if (this.entityName === "status") {
            if (isActive) {
                return {active: true};
            }
            return {active: false}
        }

        if (isActive) {
            return {status: StatusEnum.ACTIVE};
        }

        return null;
    }

    public async preAlter(): Promise<Record<string, unknown>> {
        return this.preAlterConfig();
    }

    protected abstract convertStringToPartialEntity(payloadString: Record<string, string>): Partial<TEntity>;

    protected abstract preAlterConfig(): Promise<Record<string, unknown>>
}