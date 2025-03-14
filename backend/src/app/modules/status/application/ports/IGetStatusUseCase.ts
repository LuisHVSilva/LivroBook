import {IUseCase} from "@coreShared/interfaces/usecases";
import {StateEnum} from "@coreShared/enums/StateEnum";

export type GetStatusInput = {
    id: string;
    active?: StateEnum;
};

export type GetStatusOutput = {
    id: number;
    description: string;
    active: StateEnum;
};

export interface IGetStatusUseCase extends IUseCase<GetStatusInput, GetStatusOutput | null> {
}
