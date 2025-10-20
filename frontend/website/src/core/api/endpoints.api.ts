//#region BASE TYPE

export type HttpMethodUrls = {
    get?: Record<string, string>;
    post?: Record<string, string>;
    patch?: Record<string, string>;
    delete?: Record<string, string>;
};

const defaultSuffixes = {
    get: {findAll: "/findAll", findById: "/findById"},
    post: {create: "/create"},
    patch: {update: "/update"},
    delete: {delete: "/delete"},
} as const;

// Automatic merge of standard and custom types
type MergeUrls<T extends Partial<HttpMethodUrls>> = {
    [K in keyof typeof defaultSuffixes]: Record<
        | keyof (typeof defaultSuffixes)[K]
        | (T[K] extends Record<string, unknown> ? keyof T[K] : never),
        string
    >;
};

// Final type returned by createEndpoints
export type BaseUrlType<T extends Partial<HttpMethodUrls>> = {
    base: string;
} & MergeUrls<T>;

//#endregion

//#region ️ PRINCIPAL FUNCTIONS

export function createEndpoints<T extends Partial<HttpMethodUrls>>(
    baseModule: string,
    baseEntity?: string,
    customUrls?: T
): BaseUrlType<T> {
    const buildBasePath = (value: string = "") =>
        baseEntity ? `/${baseModule}/${baseEntity}${value}` : `/${baseModule}${value}`;

    const buildUrls = (entries?: Record<string, string>) =>
        entries
            ? Object.fromEntries(
                Object.entries(entries).map(([key, value]) => [key, buildBasePath(value)])
            )
            : {};

    const result: Record<string, unknown> = {base: buildBasePath()};

    (Object.keys(defaultSuffixes) as (keyof typeof defaultSuffixes)[]).forEach((method) => {
        const builtDefault = buildUrls(defaultSuffixes[method]);
        const builtCustom = buildUrls(customUrls?.[method]);
        const merged = {...builtDefault, ...builtCustom};

        if (Object.keys(merged).length > 0) result[method] = merged;
    });

    return result as BaseUrlType<T>;
}

//#endregion

//#region HELPERS

export function extractFindByIdEntity(
    entityName: keyof AllModulesMap,
    allModulesUrls: AllModulesMap
): string {
    const module = allModulesUrls[entityName];
    const findById = module.get?.findById;

    if (!findById)
        throw new Error(`A entidade '${String(entityName)}' não possui um endpoint GET.findById.`);
    return findById;
}

export function extractFindAllByEntity(
    entityName: keyof AllModulesMap,
    allModulesUrls: AllModulesMap
): string {
    const module = allModulesUrls[entityName];
    const findAll = module.get?.findAll;

    if (!findAll)
        throw new Error(`A entidade '${String(entityName)}' não possui um endpoint GET.findAll.`);
    return findAll;
}

//#endregion

//#region MODULE DECLARATION

const LOCATION = "location";
const DOCUMENT = "document";
const PHONE = "phone";
const STATUS = "status";
const USER = "user";
const AUTH = "auth";
const METADATA = "metadata";

// --- Modules with endpoints ---
export const locationUrl = {
    country: createEndpoints(LOCATION, "country", {
        get: {findByFilter: "/findByFilter"},
    }),
    state: createEndpoints(LOCATION, "state"),
    city: createEndpoints(LOCATION, "city"),
} as const;

export const documentUrl = {
    documentType: createEndpoints(DOCUMENT, "documentType"),
} as const;

export const phoneUrl = {
    phoneType: createEndpoints(PHONE, "phoneType"),
    phoneCode: createEndpoints(PHONE, "phoneCode"),
    phone: createEndpoints(PHONE),
} as const;

export const statusUrl = {
    status: createEndpoints(STATUS),
} as const;

export const user = {
    userType: createEndpoints(USER, "userType"),
    userCredentialType: createEndpoints(USER, "userCredentialType"),
    userCredential: createEndpoints(USER, "userCredential"),
    user: createEndpoints(USER),
} as const;

// --- Authentication and metadata ---
export const authUrl = {
    login: `/${AUTH}/login`,
    register: "/user/register",
} as const;

//#endregion

//#region GLOBAL MAPPING + METADATA

export const allModulesUrls = {
    ...locationUrl,
    ...documentUrl,
    ...phoneUrl,
    ...statusUrl,
    ...user,
} as const;

export type AllModulesMap = typeof allModulesUrls;

// Metadata URL with entity autocomplete
export const metadataUrl = {
    getAllEntitiesNames: `/${METADATA}/getAllEntitiesNames`,
    getModelAttributes: `/${METADATA}/getAttribute`,
    // findEntityDataById: (entityName: keyof AllModulesMap) => extractFindByIdEntity(entityName, allModulesUrls),
    findAllEntityData: (entityName: keyof AllModulesMap) => extractFindAllByEntity(entityName, allModulesUrls),
} as const;

//#endregion
