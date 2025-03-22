import {IStatusRepository} from "@status/application/ports/IStatusRepository";
import {Status} from "@status/domain/status";
import {StateEnum} from "@coreShared/enums/StateEnum";
import {StatusPayload} from "@payloads/statusPayload";
import {Result} from "@coreShared/types/Result";
import {Messages} from "@coreShared/constants/messages";
import {Transaction} from "sequelize";

export class StatusRepositoryMock {
    private readonly statusRepositoryMock: jest.Mocked<IStatusRepository>;
    private readonly transactionMock: jest.Mocked<Transaction>;

    constructor() {
        this.statusRepositoryMock = {
            startTransaction: jest.fn(),
            findById: jest.fn(),
            findByDescription: jest.fn(),
            save: jest.fn(),
            updateDescription: jest.fn(),
        } as jest.Mocked<IStatusRepository>;

        this.transactionMock = {
            commit: jest.fn(),
            rollback: jest.fn(),
        } as unknown as jest.Mocked<Transaction>;
    }

    get mock(): jest.Mocked<IStatusRepository> {
        return this.statusRepositoryMock;
    }

    get commit() {
        return this.transactionMock.commit;
    }

    get rollback() {
        return this.transactionMock.rollback;
    };

    public async withTransaction(): Promise<this> {
        this.statusRepositoryMock.startTransaction.mockResolvedValueOnce(this.transactionMock);
        return this;
    };

    public withFindById(
        id: number = StatusPayload.id,
        description: string = StatusPayload.validDescriptionFormatted,
        active: StateEnum = StatusPayload.active
    ): this {
        this.statusRepositoryMock.findById.mockResolvedValueOnce(this.createStatus(id, description, active));
        return this;
    }

    public withFindByIdNull(id: number): this {
        this.statusRepositoryMock.findById.mockResolvedValue(Result.failure<Status>(Messages.Status.Error.INVALID_ID(id.toString())));
        return this;
    }

    public withFindByIdError(message: string): this {
        this.statusRepositoryMock.findById.mockRejectedValue(new Error(message));
        return this;
    }

    public withFindByDescription(description: string = StatusPayload.validDescriptionFormatted,): this {
        this.statusRepositoryMock.findByDescription.mockResolvedValueOnce(this.createStatus(StatusPayload.id, description, StatusPayload.active));
        return this;
    }

    public withFindByDescriptionNull(description: string): this {
        this.statusRepositoryMock.findByDescription.mockResolvedValueOnce(Result.failure<Status>(Messages.Status.Error.DESCRIPTION_NOT_FOUND(description)));
        return this;
    }

    public withSave(description: string = StatusPayload.validDescriptionFormatted): this {
        const newStatus: Status = Status.create(description);

        this.statusRepositoryMock.save.mockResolvedValue(this.createStatus(StatusPayload.id,
            newStatus.getDescription(), newStatus.getActive()));
        return this;
    }

    public withSaveError(message: string): this {
        this.statusRepositoryMock.save.mockRejectedValue(new Error(message));
        return this;
    }

    public withUpdateDescription(): this {
        this.statusRepositoryMock.updateDescription.mockResolvedValueOnce();
        return this;
    }

    public withUpdateDescriptionError(message: string): this {
        this.statusRepositoryMock.updateDescription.mockRejectedValue(new Error(message));
        return this;
    }

    private createStatus(id: number, description: string, active: StateEnum): Result<Status> {
        return Result.success(Status.restore({id, description, active}));
    }
}
