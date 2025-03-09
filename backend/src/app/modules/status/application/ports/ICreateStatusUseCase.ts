import { IUseCase } from "@coreShared/interfaces/usecases";

export type CreateStatusInput = {
    description: string;
};

export type CreateStatusOutput = {
    id?: number;
    description: string;
};

export interface ICreateStatusUseCase extends IUseCase<CreateStatusInput, CreateStatusOutput> { }
