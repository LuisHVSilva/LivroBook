import {StatusDomainService} from "@status/domain/service/statusDomainService";
import {MockStatusRepository} from "@mocks/Status/mockStatusRepository";
import {StateEnum} from "@coreShared/enums/StateEnum";
import {Status} from "@status/domain/status";
import {ValidateError} from "@coreShared/errors/ValidateError";
import {StatusMessages} from "@coreShared/messages/statusMessages";
import {StatusPayload} from "@payloads/statusPayload";

describe("StatusDomainService", () => {
    const className: string = "StatusDomainService";

    let statusDomainService: StatusDomainService;
    let mockStatusRepository: MockStatusRepository
    let statusPayload: StatusPayload = StatusPayload.createMock();

    beforeEach(() => {
        mockStatusRepository = new MockStatusRepository();
        statusDomainService = new StatusDomainService(mockStatusRepository.mock);
    })

    afterEach(() => {
        jest.clearAllMocks();
        jest.restoreAllMocks();
    });

    describe('getPendingApprovalStatus', () => {
        const defaultDescription: string = "PENDENTE DE APROVACAO";
        it('Should return status "PENDENTE DE APROVAÇÃO"', async () => {
            mockStatusRepository.withFindByDescription(1, defaultDescription, StateEnum.ACTIVE);
            const status: Status = await statusDomainService.getPendingApprovalStatus();

            expect(status.getActive()).toBe(StateEnum.ACTIVE);
            expect(status.getDescription()).toBe(defaultDescription);
            expect(status.getActive()).toBeDefined();
        })

        it('Should return error if "PENDENTE DE APROVAÇÃO" does not exist', async () => {
            mockStatusRepository.withFindByDescriptionNull();
            const error = new ValidateError(className, StatusMessages.Error.Validation.PENDING_APPROVAL_STATUS_NOT_FOUND);
            await expect(statusDomainService.getPendingApprovalStatus()).rejects.toThrow(error);
        })

        it('Should return error if "PENDENTE DE APROVAÇÃO" is inactive', async () => {
            mockStatusRepository.withFindByDescription(1, defaultDescription, StateEnum.INACTIVE);
            const error = new ValidateError(className, StatusMessages.Error.Validation.PENDING_APPROVAL_STATUS_INACTIVE);
            await expect(statusDomainService.getPendingApprovalStatus()).rejects.toThrow(error);
        })
    })

    describe('ensureDescriptionIsUnique', () => {
        it("should throw error when description already exists", async () => {
            mockStatusRepository.withFindByDescription();
            const error = new ValidateError(className, StatusMessages.Error.Validation.DUPLICATE_DESCRIPTION);
            await expect(statusDomainService.ensureDescriptionIsUnique(statusPayload.description)).rejects.toThrow(error);
        });

        it("should not throw error when description is unique", async () => {
            mockStatusRepository.withFindByDescriptionNull();

            await expect(statusDomainService.ensureDescriptionIsUnique(statusPayload.description)).resolves.toBeUndefined();
        });
    })

    describe("ensureStatusExists", () => {
        it("should throw error when status ID does not exist", async () => {
            mockStatusRepository.withFindByIdNull();
            const error = new ValidateError(className, StatusMessages.Error.Validation.STATUS_NOT_FOUND);
            await expect(statusDomainService.ensureStatusExists(999)).rejects.toThrow(error);
        });

        it("should throw error when findById returns a failure result", async () => {
            mockStatusRepository.withFindByIdError(StatusMessages.Error.Validation.STATUS_NOT_FOUND);
            await expect(statusDomainService.ensureStatusExists(999)).rejects.toThrow(StatusMessages.Error.Validation.STATUS_NOT_FOUND);
        });

        it("should return status when it exists", async () => {
            mockStatusRepository.withFindById();

            const result = await statusDomainService.ensureStatusExists(1);

            expect(result.getId()).toBe(statusPayload.id);
            expect(result.getDescription()).toBe(statusPayload.description);
            expect(result.getActive()).toBe(statusPayload.active);
        });
    });
})
