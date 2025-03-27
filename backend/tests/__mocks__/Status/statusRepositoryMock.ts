import {IStatusRepository} from "@status/infrastructure/repositories/IStatusRepository";
import {Status} from "@status/domain/status";
import {StatusPayload} from "@payloads/statusPayload";
import {Result} from "@coreShared/types/Result";
import {Messages} from "@coreShared/messages/messages";
import {Transaction} from "sequelize";
import {RepositoryError} from "@coreShared/errors/RepositoryError";
import {UseCaseError} from "@coreShared/errors/UseCaseError";

export class StatusRepositoryMock {
    private readonly statusRepositoryMock: jest.Mocked<IStatusRepository>;
    private readonly transactionMock: jest.Mocked<Transaction>;
    private readonly CLASS_NAME: string = "statusRepository";
    private payloadEntity: Status = StatusPayload.createMock().toEntity();
    private readonly resultSuccess: Result<Status> = Result.success(this.payloadEntity);

    constructor() {
        this.statusRepositoryMock = {
            startTransaction: jest.fn(),
            findById: jest.fn(),
            findByDescription: jest.fn(),
            save: jest.fn(),
            updateDescription: jest.fn(),
            updateActive: jest.fn(),
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

    private generateUseCaseError(message: string): UseCaseError {
        return new UseCaseError(this.CLASS_NAME, message);
    }

    public async withTransaction(): Promise<this> {
        this.statusRepositoryMock.startTransaction.mockResolvedValueOnce(this.transactionMock);
        return this;
    };

    public withFindById(): this {
        this.statusRepositoryMock.findById.mockResolvedValueOnce(this.resultSuccess);
        return this;
    }

    public withFindByIdNull(): this {
        const idString: string = this.payloadEntity.getId()!.toString();
        const result = Result.failure<Status>(Messages.Status.Error.INVALID_ID(idString));

        this.statusRepositoryMock.findById.mockResolvedValue(result);
        return this;
    }

    public withFindByIdError(message: string): this {
        this.statusRepositoryMock.findById.mockRejectedValue(new RepositoryError(this.CLASS_NAME, message));
        return this;
    }

    public withFindByDescription(): this {
        this.statusRepositoryMock.findByDescription.mockResolvedValueOnce(this.resultSuccess);
        return this;
    }

    public withFindByDescriptionNull(): this {
        const result: Result<Status> = Result.failure<Status>(
            Messages.Status.Error.DESCRIPTION_NOT_FOUND(this.payloadEntity.getDescription())
        );
        this.statusRepositoryMock.findByDescription.mockResolvedValueOnce(result);
        return this;
    }

    public withSave(): this {
        this.statusRepositoryMock.save.mockResolvedValue(this.resultSuccess);
        return this;
    }

    public withSaveError(message: string): this {
        this.statusRepositoryMock.save.mockRejectedValue(this.generateUseCaseError(message));
        return this;
    }

    public withUpdateDescription(): this {
        this.statusRepositoryMock.updateDescription.mockResolvedValueOnce();
        return this;
    }

    public withUpdateDescriptionError(message: string): this {
        this.statusRepositoryMock.updateDescription.mockRejectedValueOnce(this.generateUseCaseError(message));
        return this;
    }

    public withUpdateActive(): this {
        this.statusRepositoryMock.updateActive.mockResolvedValueOnce();
        return this;
    }

    public withUpdateActiveError(message: string): this {
        this.statusRepositoryMock.updateActive.mockRejectedValueOnce(this.generateUseCaseError(message));
        return this;
    }

}
