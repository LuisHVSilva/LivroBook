import {StateEnum} from "@coreShared/enums/StateEnum";
import {Status} from "@status/domain/status";
import {StatusPayload} from "@payloads/statusPayload";
import {StringUtils} from "@coreShared/utils/StringUtils";
import {MockStatusDomainService} from "@mocks/Status/mockStatusDomainService";
import {StatusMessages} from "@coreShared/messages/statusMessages";

describe("status Entity", () => {
    const statusPayload: StatusPayload = StatusPayload.createMock();
    let mockStatusDomainService: MockStatusDomainService;
    let status: Status;

    beforeEach(async () => {
        mockStatusDomainService = new MockStatusDomainService();
        status = await Status.create(statusPayload.description, mockStatusDomainService.mock);
    })

    afterEach(() => {
        jest.clearAllMocks();
        jest.restoreAllMocks();
    })

    describe("create ", () => {
        it("should create a valid status", async () => {
            const stringUtilsSpy = jest.spyOn(StringUtils, "transformCapitalLetterWithoutAccent");
            await mockStatusDomainService.withEnsureDescriptionIsUnique();

            const status: Status = await Status.create(statusPayload.description, mockStatusDomainService.mock);

            expect(stringUtilsSpy).toHaveBeenCalledWith(statusPayload.description);
            expect(stringUtilsSpy).toHaveBeenCalledTimes(1);
            expect(status.getDescription()).toBe(statusPayload.description);
            expect(status.getActive()).toBe(StateEnum.INACTIVE);
            expect(status.isActive()).toBeFalsy();
        })

        it("should throw error when creating status with short description", async () => {
            const stringUtilsSpy = jest.spyOn(StringUtils, "transformCapitalLetterWithoutAccent");

            await expect(Status.create("", mockStatusDomainService.mock))
                .rejects.toThrow(StatusMessages.Error.Validation.INVALID_DESCRIPTION_LEN);

            expect(stringUtilsSpy).toHaveBeenCalledWith("");
        });
    })

    describe("Update", () => {
        const NEW_DESCRIPTION = "NEW DESCRIPTION";

        it("should update the description keeping the current state", async () => {
            const stringUtilsSpy = jest.spyOn(StringUtils, "transformCapitalLetterWithoutAccent");

            const updatedStatus: Status = await status.updateDescription(NEW_DESCRIPTION, mockStatusDomainService.mock);

            expect(stringUtilsSpy).toHaveBeenCalledWith(NEW_DESCRIPTION);
            expect(updatedStatus.getDescription()).toBe(NEW_DESCRIPTION);
            expect(updatedStatus.getActive()).toBe(status.getActive());
            expect(updatedStatus.getId()).toBe(status.getId());
        })

        it("should activate status", () => {
            expect(status.getActive()).toBe(StateEnum.INACTIVE); // Garante o estado inicial

            const activeStatus = status.activate();
            expect(activeStatus.getActive()).toBe(StateEnum.ACTIVE);
        })

        it("should deactivate status", () => {
            status = status.activate(); // Ativa primeiro para garantir o teste correto
            expect(status.getActive()).toBe(StateEnum.ACTIVE);

            const inactiveStatus = status.deactivate();
            expect(inactiveStatus.getActive()).toBe(StateEnum.INACTIVE);
        })

    })

    describe("JSON serialize", () => {
        it("should serialize to JSON correctly", () => {
            const json = status.toJSON();

            expect(json).toHaveProperty("id", status.getId());
            expect(json).toHaveProperty("description", status.getDescription());
            expect(json).toHaveProperty("active", status.getActive());
        })
    })

    describe("Restore status", () => {
        it("should restore a status from persisted data", () => {
            const restoredStatus = Status.restore(statusPayload);

            expect(restoredStatus.getId()).toBe(statusPayload.id);
            expect(restoredStatus.getDescription()).toBe(statusPayload.description);
            expect(restoredStatus.getActive()).toBe(statusPayload.active);
        })
    })
})