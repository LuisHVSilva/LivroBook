import {UserType} from "@userType/domain/userType";
import {UserTypePayload} from "@payloads/userTypePayload";
import {MockUserTypeDomainService} from "@mocks/UserType/mockUserTypeDomainService";
import {MockStatusDomainService} from "@mocks/Status/mockStatusDomainService";
import {Status} from "@status/domain/status";
import {StateEnum} from "@coreShared/enums/StateEnum";
import {StatusPayload} from "@payloads/statusPayload";

describe("userType Entity", () => {
    const payload = UserTypePayload.createMock();

    let mockUserTypeDomainService: MockUserTypeDomainService;
    let mockStatusDomainService: MockStatusDomainService;


    beforeEach(async () => {
        mockUserTypeDomainService = new MockUserTypeDomainService();
        mockStatusDomainService = new MockStatusDomainService();

        await mockStatusDomainService.withGetPendingApprovalStatus();
        await mockUserTypeDomainService.withEnsureDescriptionIsUnique();
    })

    afterEach(() => {
        jest.clearAllMocks();
        jest.restoreAllMocks();
    })

    describe("create", () => {
        it("should create a valid userType", async () => {
            const userType: UserType = await UserType.create(payload.description, mockUserTypeDomainService.mock,
                mockStatusDomainService.mock);

            expect(userType).toBeDefined();
            expect(userType.id).toBe(null);
            expect(typeof userType.description).toBe("string");
            expect(userType.status).toBeInstanceOf(Status);
            expect(userType.status.getDescription()).toBe(UserType.createEntityStatusDescription);
            expect(userType.status.getActive()).toBe(StateEnum.ACTIVE);
        })
    })

    describe("update", () => {
        it("should update the status of the userType", async () => {
            const newStatus = StatusPayload.createMock({description: "description"}).toEntity();
            const userType: UserType = await UserType.create(payload.description, mockUserTypeDomainService.mock,
                mockStatusDomainService.mock);

            const updatedUserType = userType.updateStatus(newStatus);

            expect(updatedUserType).toBeInstanceOf(UserType);
            expect(updatedUserType.id).toBe(userType.id);
            expect(updatedUserType.description).toBe(userType.description);
            expect(updatedUserType.status).toEqual(newStatus);
        })

        it("should update the description of the userType", async () => {
            const userType: UserType = await UserType.create(payload.description, mockUserTypeDomainService.mock,
                mockStatusDomainService.mock);

            const updatedUserType = userType.updateDescription("new description");

            expect(updatedUserType).toBeInstanceOf(UserType);
            expect(updatedUserType.id).toBe(userType.id);
            expect(updatedUserType.description).toBe("NEW DESCRIPTION");
            expect(updatedUserType.status).toEqual(userType.status);
        })
    })

    describe("JSON Serialization", () => {
        it("should serialize to JSON correctly", async ()  => {
            const userType: UserType = await UserType.create(payload.description, mockUserTypeDomainService.mock,
                mockStatusDomainService.mock);
            const json = userType.toJSON();

            expect(json).toHaveProperty("id", userType.id);
            expect(json).toHaveProperty("description", userType.description);
            expect(json["status"]).toHaveProperty("id", userType.status.getId());
            expect(json["status"]).toHaveProperty("description", userType.status.getDescription());
            expect(json["status"]).toHaveProperty("active", userType.status.getActive());
        })
    })

    describe("restore", () => {
        it("should restore userType from object", () => {
            const status: Status = StatusPayload.createMock().toEntity();

            const userTypeData = {
                id: payload.id,
                description: payload.description,
                status: status
            };

            const userType = UserType.restore(userTypeData);

            expect(userType).toBeDefined();
            expect(userType.id).toBe(payload.id);
            expect(userType.description).toBe(payload.description);
            expect(userType.status.getId()).toBe(payload.statusId);
            expect(userType.status.getDescription()).toBe(status.getDescription());
            expect(userType.status.getActive()).toBe(status.getActive());
        })
    })
})