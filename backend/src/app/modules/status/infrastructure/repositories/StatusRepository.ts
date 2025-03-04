import {IStatusRepository} from "../../application/ports/IStatusRepository";
import {Status} from "../../domain/status"
import {StatusModel} from "../models/StatusModel";
import {StateEnum} from "../../../../../core/shared/enums/StateEnum";
import {Messages} from "../../../../../core/shared/constants/messages";

export class StatusRepository implements IStatusRepository {
    public async save(status: Status): Promise<Status> {

        const savedStatus = await StatusModel.create({
            description: status.getDescription(),
            active: this.convertStateEnumToBoolean(status.getActive()),
        });

        return Status.restore({
            id: savedStatus.id,
            description: savedStatus.description,
            active: this.convertBooleanToStateEnum(savedStatus.active),
        });
    }

    public async findById(id: string): Promise<Status> {
        const foundStatus = await StatusModel.findByPk(id);

        if (!foundStatus) {
            throw new Error(Messages.Status.Error.NOT_FOUND(id));
        }

        return Status.restore({
            id: foundStatus.id,
            description: foundStatus.description,
            active: this.convertBooleanToStateEnum(foundStatus.active),
        });
    }


    private convertStateEnumToBoolean(state: StateEnum): boolean {
        return state === StateEnum.ACTIVE;
    }

    private convertBooleanToStateEnum(active: boolean): StateEnum {
        return active ? StateEnum.ACTIVE : StateEnum.INACTIVE;
    }
}
