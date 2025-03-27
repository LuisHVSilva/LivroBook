import {StateEnum} from "@coreShared/enums/StateEnum";

export class DataConverter {
    public static convertBooleanToStateEnum(active: boolean): StateEnum {
        return active ? StateEnum.ACTIVE : StateEnum.INACTIVE;
    };

    public static convertStateEnumToBoolean(state: StateEnum): boolean {
        return state === StateEnum.ACTIVE;
    };
}