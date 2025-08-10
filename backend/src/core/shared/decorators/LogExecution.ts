import { container } from "tsyringe";
import { ILogger } from "@coreShared/logs/ILogger";
import { LoggerContext } from "@coreShared/logs/LoggerContext";
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

export function LogExecution(): MethodDecorator {
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
                await logger.logInfo(context, "🚀 Iniciando execução");

                const result = await originalMethod.apply(this, args);

                const duration = Date.now() - start;

                if (result instanceof ResultType) {
                    if (result.isSuccess()) {
                        await logger.logInfo(
                            context,
                            `✔️ Execução concluída em ${duration}ms`,
                            undefined,
                            // { result: safe(result) }
                        );
                    } else if( result.isNone()) {
                        await logger.logInfo(
                            context,
                            `✔️ Execução concluída (nenhum resultado) em ${duration}ms`,
                            undefined,
                            // { result: safe(result) }
                        );
                    }
                    else {
                        const error = result.getError();
                        await logger.logWarn(
                            context,
                            `⚠️ Erro de negócio: ${error.message ?? error}`,
                            undefined,
                            // { error: safe(error), duration }
                        );
                    }
                } else {
                    await logger.logInfo(
                        context,
                        `✔️ Execução concluída (sem ResultType) em ${duration}ms`,
                        undefined,
                        // { result: safe(result) }
                    );
                }

                return result;
            } catch (error: any) {
                const duration = Date.now() - start;
                await logger.logError(
                    context,
                    `❌ Erro inesperado: ${error.message ?? error}`,
                    error.stack,
                    { duration }
                );
                throw error;
            }
        };
    };
}
