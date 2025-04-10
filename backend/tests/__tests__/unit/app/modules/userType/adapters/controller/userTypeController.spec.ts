import {UserTypeController} from "@userType/adapters/controller/userTypeController";
import {MockLogger} from "@mocks/mockLogger";
import {MockCreateUserTypeUseCase} from "@mocks/UserType/mockCreateUserTypeUseCase";
import {UserTypePayload} from "@payloads/userTypePayload";

describe("UserTypeController", () => {
    let userTypeController: UserTypeController;
    let mockLogger: MockLogger;
    let mockCreateUserTypeUseCase: MockCreateUserTypeUseCase;

    beforeEach(() => {
        mockLogger = new MockLogger();
        mockCreateUserTypeUseCase = new MockCreateUserTypeUseCase();
        userTypeController = new UserTypeController(mockLogger.mock, mockCreateUserTypeUseCase.mock);
    })

    afterEach(() => {
        jest.clearAllMocks();
        jest.restoreAllMocks();
    })

    it("should create a user type", async () => {
        const req = {
            body: {
                description: UserTypePayload.createMock().description
            }
        } as any;

        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        } as any;

        mockCreateUserTypeUseCase.withExecute();

        await userTypeController.create(req, res);

        expect(mockCreateUserTypeUseCase.mock.execute).toHaveBeenCalledWith(req.body);
        expect(res.status).toHaveBeenCalledWith(201);
        expect(res.json).toHaveBeenCalledWith({success: true, data: expect.anything()});
    })

    it("should handle error when creating a user type", async () => {
        const req = {
            body: {
                description: UserTypePayload.createMock().description
            }
        } as any;

        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        } as any;

        const error = new Error("Error creating user type");
        mockCreateUserTypeUseCase.withExecuteError(error);

        await userTypeController.create(req, res);

        expect(mockCreateUserTypeUseCase.mock.execute).toHaveBeenCalledWith(req.body);
        expect(res.status).toHaveBeenCalledWith(409);
        expect(res.json).toHaveBeenCalledWith({success: false, message: error.message});
    })
})