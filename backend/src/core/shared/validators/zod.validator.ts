import {output, z, ZodBoolean, ZodDate, ZodNumber, ZodOptional, ZodPipe, ZodString, ZodTransform} from "zod";
import {EntitiesMessage} from "@coreShared/messages/entities.message";

export class ZodValidator {
    /**
     * ‘String’ → número inteiro positivo
     * Exemplo: "5" → 5
     */
    static positiveIntFromString() {
        return z
            .string()
            .optional()
            .transform((val) => (val !== undefined ? Number(val) : undefined))
            .refine(
                (val) => val === undefined || (Number.isInteger(val) && val > 0),
                {message: EntitiesMessage.error.validation.numberPositive}
            );
    }

    /**
     * String → array de inteiros positivos
     * Exemplo: "1,2,3" → [1, 2, 3]
     */
    static positiveIntArrayFromString() {
        return z
            .string()
            .optional()
            .transform((val) =>
                val ? val.split(",").map((v) => Number(v.trim())) : undefined
            )
            .refine(
                (values) =>
                    !values ||
                    values.every((v) => Number.isInteger(v) && v > 0),
                {message: EntitiesMessage.error.validation.numberPositive}
            );
    }

    /**
     * String → array de boolean
     * Exemplo: "true,false,true" → [true, false, true]
     */
    static booleanArrayFromString() {
        return z
            .string()
            .optional()
            .transform((val) =>
                val ? val.split(",").map((v) => v.trim().toLowerCase()) : undefined
            )
            .refine(
                (values) =>
                    !values ||
                    values.every((v) => v === "true" || v === "false"),
                {message: EntitiesMessage.error.validation.boolType}
            )
            .transform((values) => values?.map((v) => v === "true"));
    }

    static dateArrayFromString() {
        return z
            .string()
            .optional()
            .transform((val) =>
                val
                    ? val.split(",").map((v) => {
                        const date = new Date(v.trim());
                        return isNaN(date.getTime()) ? null : date;
                    })
                    : undefined
            )
            .refine(
                (values) => !values || values.every((d) => d instanceof Date && !isNaN(d.getTime())),
                {message: "Formato de data inválido"}
            );
    }

    static intInputValue(min?: number, max?: number, optional: boolean = false, positive: boolean = true): ZodNumber | ZodOptional<ZodNumber> {
        let schema: ZodNumber | ZodOptional<ZodNumber> = z.number();

        if (min !== undefined) {
            schema = schema.min(min, {
                message: EntitiesMessage.error.validation.invalidMinLen("int", min.toString()),
            });
        }

        if (max !== undefined) {
            schema = schema.max(max, {
                message: EntitiesMessage.error.validation.invalidMaxLen("int", max.toString()),
            });
        }

        if (positive) {
            schema = schema.positive({
                message: EntitiesMessage.error.validation.numberPositive,
            });
        }

        if (optional) {
            schema = schema.optional();
        }

        return schema;
    }

    static stringInputValue(min: number = 1, max: number = 255, optional: boolean = false): ZodString | ZodOptional<ZodString> {
        let schema: ZodString | ZodOptional<ZodString> = z.string().min(min).max(max);

        if (optional) {
            schema = schema.optional();
        }

        return schema;
    }

    static booleanInputValue(optional: boolean = false): ZodBoolean | ZodOptional<ZodBoolean> {
        let schema: ZodBoolean | ZodOptional<ZodBoolean> = z.boolean();

        if (optional) {
            schema = schema.optional();
        }

        return schema;
    }

    static dateInputValue(optional: boolean = false) {
        let schema: ZodPipe<ZodString, ZodTransform<Awaited<Date>, output<ZodString>>> | ZodOptional<ZodPipe<ZodString, ZodTransform<Awaited<Date>, output<ZodString>>>> = z.string().transform((val, ctx) => {
            const date = new Date(val);
            if (isNaN(date.getTime())) {
                ctx.addIssue({
                    code: "custom",
                    message: "Data inválida. Use o formato yyyy-MM-dd.",
                });
                return z.NEVER;
            }
            return date;
        });

        if (optional) {
            schema = schema.optional();
        }

        return schema;
    }

}
