import { container } from "tsyringe";
import { ILogger } from "@coreConfig/logs/ILogger";
import { LoggerContext } from "@coreConfig/logs/LoggerContext";
import { ResultType } from "@coreShared/types/result.type";
import util from "util";

function safe(data: any) {
    try {
        JSON.stringify(data);
        return data;
    } catch {
        return util.inspect(data, { depth: 2 });
    }
}

export function LogError(): MethodDecorator {
    return function (
        target: any,
        propertyKey: string | symbol,
        descriptor: PropertyDescriptor
    ) {
        const originalMethod = descriptor.value;

        descriptor.value = async function (...args: any[]) {
            const logger = container.resolve<ILogger>("ILogger");
            const context = new LoggerContext(target.constructor.name, propertyKey.toString());
            const start = Date.now();

            try {
                const result = await originalMethod.apply(this, args);
                const duration = Date.now() - start;

                if (result instanceof ResultType) {
                    if (result.isFailure()) {
                        const error = result.getError();
                        await logger.logError(
                            context,
                            `⚠️ Erro de negócio: ${error.message ?? error}`,
                            undefined,
                            { error: safe(error), duration }
                        );
                    }
                }
                return result;
            } catch (error: any) {
                const duration = Date.now() - start;
                await logger.logError(
                    context,
                    `❌ Erro inesperado: ${error.message ?? error}`,
                    undefined,
                    { error: safe(error), duration }
                );
                throw error;
            }
        };
    };
}