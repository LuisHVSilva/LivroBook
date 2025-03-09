import {IStatusRepository} from "../../application/ports/IStatusRepository";
import {Status} from "../../domain/status"
import {StatusModel} from "../models/StatusModel";
import {StateEnum} from "@coreShared/enums/StateEnum";
import {StringUtils} from "@coreShared/utils/StringUtils";


export class StatusRepository implements IStatusRepository {
    private convertBooleanToStateEnum(active: boolean): StateEnum {
        return active ? StateEnum.ACTIVE : StateEnum.INACTIVE;
    }

    private convertStateEnumToBoolean(state: StateEnum): boolean {
        return state === StateEnum.ACTIVE;
    }

    public async save(status: Status): Promise<Status> {

        const descriptionFormatted: string = StringUtils.transformCapitalLetterWithoutAccent(status.getDescription());

        const savedStatus:StatusModel = await StatusModel.create({
            description: descriptionFormatted,
            active: this.convertStateEnumToBoolean(StateEnum.INACTIVE),
        });

        return Status.restore({
            id: savedStatus.id,
            description: savedStatus.description,
            active: this.convertBooleanToStateEnum(savedStatus.active),
        });
    }

        public async findById(id: string): Promise<Status | null> {
            const foundStatus = await StatusModel.findByPk(id);

            if (!foundStatus) {
                return null;
            }

            return Status.restore({
                id: foundStatus.id,
                description: foundStatus.description,
                active: this.convertBooleanToStateEnum(foundStatus.active),
            });
        }

    public async findByDescription(description: string): Promise<Status | null> {

        const descriptionFormatted: string = StringUtils.transformCapitalLetterWithoutAccent(description);
        const foundStatus = await StatusModel.findOne({where: {description: descriptionFormatted}});

        if (!foundStatus) {
            return null;
        }

        return Status.restore({
            id: foundStatus.id,
            description: foundStatus.description,
            active: this.convertBooleanToStateEnum(foundStatus.active),
        });
    }
}
