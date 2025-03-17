import {StateEnum} from "@coreShared/enums/StateEnum";

export type GetStatusDTO = {
    id: string;
};

export type GetStatusResponseDTO = {
    message: string;
    id: number;
    description: string;
    active: StateEnum;
};