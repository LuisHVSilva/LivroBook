import "reflect-metadata";

export interface DtoFieldOptions {
    send?: boolean;
    type?: "string" | "number" | "boolean" | "date";
    nested?: boolean;
    pick?: string[];
}

// --- Mark a class as Domain ---
export function Domain(): ClassDecorator {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-function-type
    return (target: Function) => {
        Reflect.defineMetadata("isDomain", true, target.prototype);
    };
}

// --- Internal validation ---
function ensureDomain(target: unknown, propertyKey: string) {
    const isDomain = Reflect.getMetadata("isDomain", target as object);
    if (!isDomain) {
        throw new Error(
            `A propriedade "${propertyKey}" só pode ser usada em classes decoradas com @Domain.Class()`
        );
    }
}

// --- Property Decorators ---
export function DtoField(dtoKey: string, options?: DtoFieldOptions) {
    return (target: unknown, propertyKey: string) => {
        ensureDomain(target, propertyKey);
        const dtoFields = Reflect.getMetadata("dtoFields", target as object) || {};

        dtoFields[propertyKey] = {
            key: dtoKey,
            send: options?.send ?? true,
            type: options?.type,
            nested: options?.nested ?? false,
            pick: options?.pick,
        };

        Reflect.defineMetadata("dtoFields", dtoFields, target as object);
    };
}

export function Label(label: string) {
    return function (target: unknown, propertyKey: string) {
        const labels = Reflect.getMetadata("labels", target as object) || {};
        labels[propertyKey] = label;
        Reflect.defineMetadata("labels", labels, target as object);
    };
}

export function UpperCase() {
    return (target: unknown, propertyKey: string) => {
        ensureDomain(target, propertyKey);

        const transforms = Reflect.getMetadata("transforms", target as object) || {};
        transforms[propertyKey] = [
            ...(transforms[propertyKey] || []),
            (value: unknown) =>
                typeof value === "string" ? value.toUpperCase() : value,
        ];

        Reflect.defineMetadata("transforms", transforms, target as object);
    };
}


// export function Required() {
//     return (target: any, propertyKey: string) => {
//         ensureDomain(target, propertyKey);
//         const validations = Reflect.getMetadata("validations", target) || {};
//         validations[propertyKey] = {...validations[propertyKey], required: true};
//         Reflect.defineMetadata("validations", validations, target);
//     };
// }
//
// export function MaxLength(max: number) {
//     return (target: any, propertyKey: string) => {
//         ensureDomain(target, propertyKey);
//         const validations = Reflect.getMetadata("validations", target) || {};
//         validations[propertyKey] = {...validations[propertyKey], maxLength: max};
//         Reflect.defineMetadata("validations", validations, target);
//     };
// }
//
// export function Trim() {
//     return (target: any, propertyKey: string) => {
//         ensureDomain(target, propertyKey);
//         const transforms = Reflect.getMetadata("transforms", target) || {};
//         transforms[propertyKey] = [
//             ...(transforms[propertyKey] || []),
//             (value: any) => (typeof value === "string" ? value.trim() : value),
//         ];
//         Reflect.defineMetadata("transforms", transforms, target);
//     };
// }
