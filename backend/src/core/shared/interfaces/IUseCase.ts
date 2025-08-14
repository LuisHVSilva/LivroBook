import {ResultType} from "@coreShared/types/result.type";

export interface IUseCase<Input, Output>{
    execute(input: Input): Promise<ResultType<Output>>;
}