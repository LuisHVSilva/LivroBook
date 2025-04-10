import {IStatusDomainService} from "@status/domain/service/IStatusDomainService";
import {StatusPayload} from "@payloads/statusPayload";
import {Status} from "@status/domain/status";

export class MockStatusDomainService {
    private readonly _mock: jest.Mocked<IStatusDomainService>;

    constructor() {
        this._mock = {
            getPendingApprovalStatus: jest.fn(),
            ensureDescriptionIsUnique: jest.fn(),
            ensureStatusExists: jest.fn(),
        }
    }

    get mock(): jest.Mocked<IStatusDomainService> {
        return this._mock;
    }

    public async withGetPendingApprovalStatus(): Promise<this> {
        const pendingApprovalStatus: Status = StatusPayload.createMock({description: "PENDENTE DE APROVACAO"}).toEntity();

        this._mock.getPendingApprovalStatus.mockResolvedValueOnce(pendingApprovalStatus);
        return this;
    }

    public async withEnsureDescriptionIsUnique(): Promise<this> {
        this._mock.ensureDescriptionIsUnique.mockResolvedValueOnce();
         return this;
    }

    public async withEnsureStatusExists(): Promise<this> {
        this._mock.ensureStatusExists.mockResolvedValueOnce(StatusPayload.createMock().toEntity());
        return this;
    }
}