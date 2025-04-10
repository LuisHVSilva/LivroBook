import {IUserTypeRepository} from "@userType/infrastructure/repository/IUserTypeRepository";
import {Transaction} from "sequelize";
import {Result} from "@coreShared/types/Result";
import {Status} from "@status/domain/status";
import {RepositoryError} from "@coreShared/errors/RepositoryError";
import {UserType} from "@userType/domain/userType";
import {UserTypePayload} from "@payloads/userTypePayload";

export class MockUserTypeRepository {
    private readonly _mock: jest.Mocked<IUserTypeRepository>;
    private readonly transactionMock: jest.Mocked<Transaction>;
    private readonly CLASS_NAME: string = "UserTypeRepository";

    constructor() {
        this._mock = {
            startTransaction: jest.fn(),
            create: jest.fn(),
            findById: jest.fn(),
            countByDescription: jest.fn(),
        } ;

        this.transactionMock = {
            commit: jest.fn(),
            rollback: jest.fn(),
        } as unknown as jest.Mocked<Transaction>;
    }

    private generateUserTypeSuccessResult(
        id: number | null = null,
        description: string | null = null,
        status: Status | null = null
    ): Result<UserType, RepositoryError> {
        const {id: defaultId, description: defaultDescription, status: defaultStatus} = UserTypePayload.createMock();
        const userType: UserType = UserType.restore({
            id: id ?? defaultId,
            description: description ?? defaultDescription,
            status: status ?? defaultStatus
        });

        return Result.success(userType);
    }

    get mock(): jest.Mocked<IUserTypeRepository> {
        return this._mock;
    }

    get commit() {
        return this.transactionMock.commit;
    }

    get rollback() {
        return this.transactionMock.rollback;
    };

    public async withTransaction(): Promise<this> {
        this._mock.startTransaction.mockResolvedValueOnce(this.transactionMock);
        return this;
    };

    public withCreate(
        id: number | null = null,
        description: string | null = null,
        status: Status | null = null
    ): this {
        const result: Result<UserType, RepositoryError> = this.generateUserTypeSuccessResult(id, description, status);
        this._mock.create.mockResolvedValue(result);

        return this;
    }

    public withCountByDescription(count: number = 1): this {
        this._mock.countByDescription.mockResolvedValueOnce(count);
        return this;
    };
}