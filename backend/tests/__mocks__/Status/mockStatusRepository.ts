import {IStatusRepository} from "@status/infrastructure/repositories/IStatusRepository";
import {Status} from "@status/domain/status";
import {StatusPayload} from "@payloads/statusPayload";
import {Result} from "@coreShared/types/Result";
import {Transaction} from "sequelize";
import {RepositoryError} from "@coreShared/errors/RepositoryError";
import {UseCaseError} from "@coreShared/errors/useCaseError";
import {StateEnum} from "@coreShared/enums/StateEnum";

export class MockStatusRepository {
    private readonly statusRepositoryMock: jest.Mocked<IStatusRepository>;
    private readonly transactionMock: jest.Mocked<Transaction>;
    private readonly CLASS_NAME: string = "statusRepository";
    private readonly payloadEntity: Status = StatusPayload.createMock().toEntity();
    private readonly resultSuccess: Result<Status, RepositoryError> = Result.success(this.payloadEntity);

    constructor() {
        this.statusRepositoryMock = {
            startTransaction: jest.fn(),
            create: jest.fn(),
            findById: jest.fn(),
            findByDescription: jest.fn(),
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

    private generateStatusSuccessResult(
        id: number | null = null,
        description: string | null = null,
        active: StateEnum | null = null
    ): Result<Status, RepositoryError> {
        const {id: defaultId, description: defaultDescription, active: defaultActive} = StatusPayload.createMock();
        const status: Status = Status.restore({
            id: id ?? defaultId,
            description: description ?? defaultDescription,
            active: active ?? defaultActive
        });
        return Result.success(status);
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
        this.statusRepositoryMock.findById.mockResolvedValue(Result.none());
        return this;
    }

    public withFindByIdError(message: string): this {
        this.statusRepositoryMock.findById.mockRejectedValue(new RepositoryError(this.CLASS_NAME, message));
        return this;
    }

    public withFindByDescription(
        id: number | null = null,
        description: string | null = null,
        active: StateEnum | null = null,
    ): this {
        const result: Result<Status, RepositoryError> = this.generateStatusSuccessResult(id, description, active);
        this.statusRepositoryMock.findByDescription.mockResolvedValueOnce(result);
        return this;
    }

    public withFindByDescriptionNull(): this {
        this.statusRepositoryMock.findByDescription.mockResolvedValueOnce(Result.none());
        return this;
    }

    public withCreate(
        id: number | null = null,
        description: string | null = null,
        active: StateEnum | null = null
    ): this {
        const result: Result<Status, RepositoryError> = this.generateStatusSuccessResult(id, description, active);
        this.statusRepositoryMock.create.mockResolvedValue(result);

        return this;
    }


    public withCreateError(message: string): this {
        this.statusRepositoryMock.create.mockRejectedValue(this.generateUseCaseError(message));
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
