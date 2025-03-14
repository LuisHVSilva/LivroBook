import {IStatusRepository} from "@status/application/ports/IStatusRepository";
import {Status} from "@status/domain/status";
import {StateEnum} from "@coreShared/enums/StateEnum";
import {StatusPayload} from "@payloads/statusPayload";

export class StatusRepositoryMock {
    private readonly statusRepositoryMock: jest.Mocked<IStatusRepository>;

    constructor() {
        this.statusRepositoryMock = {
            findById: jest.fn(),
            findByDescription: jest.fn(),
            save: jest.fn(),
        };
    }

    get mock(): jest.Mocked<IStatusRepository> {
        return this.statusRepositoryMock;
    }

    public withFindById(
        id: number = StatusPayload.id,
        description: string = StatusPayload.validDescriptionFormatted,
        active: StateEnum = StatusPayload.active
    ): this {
        this.statusRepositoryMock.findById.mockResolvedValue(this.createStatus(id, description, active));
        return this;
    }

    public withFindByIdNull(): this {
        this.statusRepositoryMock.findById.mockResolvedValue(null);
        return this;
    }

    public withFindByIdError(message: string): this {
        this.statusRepositoryMock.findById.mockRejectedValue(new Error(message));
        return this;
    }

    public withFindByDescription(
        id: number = StatusPayload.id,
        description: string = StatusPayload.validDescriptionFormatted,
        active: StateEnum = StatusPayload.active
    ): this {
        this.statusRepositoryMock.findByDescription.mockResolvedValue(this.createStatus(id, description, active));
        return this;
    }

    public withFindByDescriptionNull(): this {
        this.statusRepositoryMock.findByDescription.mockResolvedValue(null);
        return this;
    }

    public withSave(description: string = StatusPayload.validDescriptionFormatted): this {
        const mockStatus = Status.create(description);
        this.statusRepositoryMock.save.mockResolvedValue(mockStatus);
        return this;
    }

    public withSaveError(message: string): this {
        this.statusRepositoryMock.save.mockRejectedValue(
            new Error(message)
        );

        return this;
    }


    private createStatus(id: number, description: string, active: StateEnum): Status {
        return Status.restore({id, description, active});
    }
}
