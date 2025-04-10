import {StateEnum} from "@coreShared/enums/StateEnum"
import {StringUtils} from "@coreShared/utils/StringUtils";
import {Status} from "@status/domain/status";
import {StatusModel} from "@status/infrastructure/models/StatusModel";

export class StatusPayload {
    private readonly _id: number = 1;
    private readonly _description: string = "DESCRIPTION";
    private readonly _active: StateEnum = StateEnum.ACTIVE;

    constructor(id: number, description: string, active: StateEnum) {
        this._id = id;
        this._description = StringUtils.transformCapitalLetterWithoutAccent(description);
        this._active = active;
    }


    get id(): number {
        return this._id;
    }

    get description(): string {
        return this._description;
    }

    get active(): StateEnum {
        return this._active;
    }

    static createMock(overrides?: Partial<{ id: number; description: string; active: StateEnum }>): StatusPayload {
        return new StatusPayload(
            overrides?.id ?? 1,
            overrides?.description ?? "Status Padrão",
            overrides?.active ?? StateEnum.ACTIVE
        );
    }

    public toEntity(): Status {
        return Status.restore({
                id: this.id,
                description: this.description,
                active: this.active,
            }
        );
    }

    public model(): StatusModel {
        return { id: this.id, description: this.description, active: true } as StatusModel;
    }
}