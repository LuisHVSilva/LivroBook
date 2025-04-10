import {Request, Response} from "express";
import {HttpMock} from "@testHelpers/httpMock";
import {StatusCodes} from "http-status-codes";
import {StatusPayload} from "@payloads/statusPayload";
import {StatusController} from "@status/adapters/controllers/statusController";
import {MockLogger} from "@mocks/mockLogger";
import {MockCreateStatusUseCase} from "@mocks/Status/mockCreateStatusUseCase";
import {MockGetStatusUseCase} from "@mocks/Status/mockGetStatusUseCase";
import {MockUpdateDescriptionUseCase} from "@mocks/Status/mockUpdateDescriptionUseCase";
import {MockUpdateActiveUseCase} from "@mocks/Status/mockUpdateActiveUseCase";
import {CreateStatusDTO} from "@status/adapters/dtos/CreateStatusDTO";
import {StatusMessages} from "@coreShared/messages/statusMessages";
import {UseCaseError} from "@coreShared/errors/useCaseError";
import {GetStatusDTO} from "@status/adapters/dtos/GetStatusDTO";
import {UpdateDescriptionDTO} from "@status/adapters/dtos/UpdateDescriptionDTO";
import {UpdateActiveDTO} from "@status/adapters/dtos/UpdateActiveDTO";


describe("StatusController", () => {
    let statusController: StatusController;
    let mockLogger: MockLogger;
    let mockCreateStatusUseCase: MockCreateStatusUseCase;
    let mockGetStatusUseCase: MockGetStatusUseCase;
    let mockUpdateDescriptionUseCase: MockUpdateDescriptionUseCase;
    let mockUpdateActiveUseCase: MockUpdateActiveUseCase;
    let statusPayloadMock: StatusPayload = StatusPayload.createMock();
    let req: Request;
    let res: Response;

    beforeEach(() => {
        mockLogger = new MockLogger();
        mockCreateStatusUseCase = new MockCreateStatusUseCase();
        mockGetStatusUseCase = new MockGetStatusUseCase();
        mockUpdateDescriptionUseCase = new MockUpdateDescriptionUseCase();
        mockUpdateActiveUseCase = new MockUpdateActiveUseCase();
        statusPayloadMock = StatusPayload.createMock();

        statusController = new StatusController(
            mockLogger.mock,
            mockCreateStatusUseCase.mock,
            mockGetStatusUseCase.mock,
            mockUpdateDescriptionUseCase.mock,
            mockUpdateActiveUseCase.mock,
            );
    });

    afterEach(() => {
        jest.clearAllMocks();
    })

    describe("createStatus", () => {
        it("should be able to create a status", async () => {
            mockCreateStatusUseCase.withExecute();

            req = HttpMock.requestMock<CreateStatusDTO>({description: statusPayloadMock.description});
            res = HttpMock.responseMock();

            await statusController.createStatus(req, res);

            expect(res.status).toHaveBeenCalledWith(StatusCodes.CREATED);
            expect(res.json).toHaveBeenCalledWith({
                success: true,
                data: {
                    id: statusPayloadMock.id.toString(),
                    description: statusPayloadMock.description,
                    message: StatusMessages.Success.Creation(statusPayloadMock.description),
                },
            });

            expect(mockLogger.logInfo).toHaveBeenCalledTimes(3);
        });

        it("should throw error when failing to create status", async () => {
            req = HttpMock.requestMock<CreateStatusDTO>({description: ""});
            res = HttpMock.responseMock();

            const error: UseCaseError = new UseCaseError("CreateUseCase", StatusMessages.Error.Failure.CREATION_FAILED);
            mockCreateStatusUseCase.withExecuteError(error);

            await statusController.createStatus(req, res)

            expect(res.status).toHaveBeenCalledWith(StatusCodes.CONFLICT);
            expect(res.json).toHaveBeenCalledWith({
                success: false,
                message: StatusMessages.Error.Failure.CREATION_FAILED,
            });
            expect(mockLogger.logError).toHaveBeenCalledTimes(1)
        });
    });

    describe("getStatusById", () => {
        it("should be able to get a status", async () => {
            mockGetStatusUseCase.withExecute();

            req = HttpMock.requestMock<GetStatusDTO>({id: statusPayloadMock.id.toString()});
            res = HttpMock.responseMock();

            await statusController.getStatusById(req, res);

            expect(res.status).toHaveBeenCalledWith(StatusCodes.OK);
            expect(res.json).toHaveBeenCalledWith({
                success: true,
                data: {
                    id: statusPayloadMock.id.toString(),
                    description: statusPayloadMock.description,
                    active: statusPayloadMock.active,
                    message: StatusMessages.Success.Retrieval.FOUND(statusPayloadMock.description),
                },
            });

            expect(mockLogger.logInfo).toHaveBeenCalledTimes(3);
        });

        it("should return null when status not found", async () => {
            mockGetStatusUseCase.withExecuteNullReturn();
            req = HttpMock.requestMock<GetStatusDTO>({id: statusPayloadMock.id.toString()});
            res = HttpMock.responseMock();

            await statusController.getStatusById(req, res);

            expect(mockLogger.logInfo).toHaveBeenCalledTimes(2);
            expect(res.status).toHaveBeenCalledWith(StatusCodes.NOT_FOUND);
            expect(res.json).toHaveBeenCalledWith({
                success: true,
                data: null
            })
        })

        it("should throw UseCaseError when failing to find a status", async () => {
            const error: UseCaseError = new UseCaseError("GetStatusUseCase", "");
            mockGetStatusUseCase.withExecuteError(error);

            req = HttpMock.requestMock<GetStatusDTO>({id: statusPayloadMock.id.toString()});
            res = HttpMock.responseMock();

            await statusController.getStatusById(req, res)

            expect(res.status).toHaveBeenCalledWith(StatusCodes.INTERNAL_SERVER_ERROR);
            expect(res.json).toHaveBeenCalledWith({
                success: false,
                message: "",
            });
            expect(mockLogger.logError).toHaveBeenCalledTimes(1)
        });
    });

    describe("updateDescription", () => {
        const input: UpdateDescriptionDTO  = {
            id: statusPayloadMock.id.toString(),
            newDescription: "NEW DESCRIPTION",
        };

        const OLD_DESCRIPTION: string = "OLD DESCRIPTION";

        it("should be able to update a status description", async () => {
            mockUpdateDescriptionUseCase.withExecute(input.newDescription, OLD_DESCRIPTION);

            req = HttpMock.requestMock<UpdateDescriptionDTO>(input);
            res = HttpMock.responseMock();

            await statusController.updateDescription(req, res);

            expect(res.status).toHaveBeenCalledWith(StatusCodes.OK);
            expect(res.json).toHaveBeenCalledWith({
                success: true,
                data: {
                    message: StatusMessages.Success.Update(OLD_DESCRIPTION, input.newDescription),
                    newDescription: input.newDescription
                },
            });

            expect(mockLogger.logInfo).toHaveBeenCalledTimes(3);
        });

        it("should throw UseCaseError when failing to update a status", async () => {
            const error: UseCaseError = new UseCaseError("UpdateDescriptionUseCase", "");
            mockUpdateDescriptionUseCase.withExecuteError(error);

            req = HttpMock.requestMock<UpdateDescriptionDTO>(input);
            res = HttpMock.responseMock();

            await statusController.updateDescription(req, res)

            expect(res.status).toHaveBeenCalledWith(StatusCodes.NOT_FOUND);
            expect(res.json).toHaveBeenCalledWith({
                success: false,
                message: "",
            });
            expect(mockLogger.logError).toHaveBeenCalledTimes(1)
        });
    })

    describe("updateActive", () => {
        const input: UpdateActiveDTO = {
            id: statusPayloadMock.id.toString(),
            active: false
        };

        it("should be able to update a status active property", async () => {
            mockUpdateActiveUseCase.withExecute();

            req = HttpMock.requestMock<UpdateActiveDTO>(input);
            res = HttpMock.responseMock();

            await statusController.updateActive(req, res);
            expect(res.status).toHaveBeenCalledWith(StatusCodes.OK);
            expect(res.json).toHaveBeenCalledWith({success: true,data: {message: StatusMessages.Success.Activation.DEACTIVATED}});
            expect(mockLogger.logInfo).toHaveBeenCalledTimes(3);
        });

        it("should throw UseCaseError when failing to update status active property", async () => {
            const error: UseCaseError = new UseCaseError("UpdateActiveUseCase", "");
            mockUpdateActiveUseCase.withExecuteError(error);

            req = HttpMock.requestMock<UpdateActiveDTO>(input);
            res = HttpMock.responseMock();

            await statusController.updateActive(req, res)

            expect(res.status).toHaveBeenCalledWith(StatusCodes.BAD_REQUEST);
            expect(res.json).toHaveBeenCalledWith({
                success: false,
                message: "",
            });
            expect(mockLogger.logError).toHaveBeenCalledTimes(1)
        });
    })
});
