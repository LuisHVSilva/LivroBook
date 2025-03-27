// import { StatusDomainService } from "@status/domain/statusDomainService";
// import {StatusRepositoryMock} from "@mocks/Status/statusRepositoryMock";
// import { Status } from "@status/domain/status";
// import {StateEnum} from "@coreShared/enums/StateEnum";
// import {StatusPayload} from "@payloads/statusPayload";
//
// describe("StatusDomainService", () => {
//     let statusRepositoryMock: StatusRepositoryMock;
//     let pendingStatus: Status;
//     let statusPayloadMock: StatusPayload = StatusPayload.createMock();
//
//     beforeEach(() => {
//         statusRepositoryMock = new StatusRepositoryMock();
//
//         // Criar um status de teste
//         pendingStatus = Status.create("PENDENTE DE APROVAÇÃO");
//     });
//
//     afterEach(() => {
//         jest.clearAllMocks();
//     });
//
//     describe("getPendingApprovalStatus", () => {
//         it("should return pending approval status when found", async () => {
//             statusRepositoryMock.withFindByDescription();
//
//             const result = await StatusDomainService.getPendingApprovalStatus(statusRepositoryMock.mock);
//
//             expect(result).toBeDefined();
//             expect(result.getDescription()).toBe("PENDENTE DE APROVAÇÃO");
//             expect(statusRepositoryMock.mock.findByDescription).toHaveBeenCalledWith("PENDENTE DE APROVAÇÃO");
//         });
//
//         it("should throw error when pending status is not found", async () => {
//             // Configurar mock para retornar falha
//             statusRepositoryMock.withFindByDescriptionError();
//
//             await expect(
//                 StatusDomainService.getPendingApprovalStatus(statusRepositoryMock.mock)
//             ).rejects.toThrow("O status 'PENDENTE DE APROVAÇÃO' não foi encontrado.");
//         });
//
//         it("should handle repository errors gracefully", async () => {
//             // Configurar mock para lançar erro
//             statusRepositoryMock.withFindByDescriptionError(new Error("Erro de banco"));
//
//             await expect(
//                 StatusDomainService.getPendingApprovalStatus(statusRepositoryMock.mock)
//             ).rejects.toThrow("O status 'PENDENTE DE APROVAÇÃO' não foi encontrado.");
//         });
//     });
// });