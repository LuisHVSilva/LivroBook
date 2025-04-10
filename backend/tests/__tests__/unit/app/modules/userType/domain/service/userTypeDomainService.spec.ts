import {UserTypeDomainService} from "@userType/domain/service/userTypeDomainService";
import {MockUserTypeRepository} from "@mocks/UserType/mockUserTypeRepository";

describe("userTypeDomainService", () => {
    let service: UserTypeDomainService;
    let mockUserTypeRepository: MockUserTypeRepository;

    beforeEach(() => {
        mockUserTypeRepository = new MockUserTypeRepository();
        service = new UserTypeDomainService(mockUserTypeRepository.mock);
    })

    afterEach(() => {
        jest.clearAllMocks();
        jest.restoreAllMocks();
    })

    describe("ensureDescriptionIsUnique", () => {
        it("should throw error when description already exists", async () => {
            mockUserTypeRepository.withCountByDescription(1);
            await expect(service.ensureDescriptionIsUnique("description")).rejects.toThrow();
        });

        it("should not throw error when description is unique", async () => {
            mockUserTypeRepository.withCountByDescription(0);
            await expect(service.ensureDescriptionIsUnique("description")).resolves.toBeUndefined();
        });
    })
})