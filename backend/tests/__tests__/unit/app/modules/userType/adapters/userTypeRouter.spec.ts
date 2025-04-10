import "reflect-metadata"
import request from "supertest";
import express, { Express } from "express";
import { StatusCodes } from "http-status-codes";
import { container } from "tsyringe";
import {MockUserTypeController} from "@mocks/UserType/mockUserTypeController";
import {IUserTypeController} from "@userType/adapters/controller/IUserTypeController";
import {CreateUserTypeOutputDTO} from "@userType/adapters/dtos/createUserTypeDTO";
import {UserTypePayload} from "@payloads/userTypePayload";
import {UserTypeMessages} from "@coreShared/messages/userTypeMessages";

jest.mock("@userType/adapters/factories/controllerFactory", () => ({
    makeUserTypeController: () => mockUserTypeController.mock,
}));

const mockUserTypeController:  MockUserTypeController = new MockUserTypeController();

describe("User Type Route", () => {
    let app: Express;
    let userTypePayload: UserTypePayload;

    beforeEach(() => {
        userTypePayload = UserTypePayload.createMock();
        container.reset();
        container.registerInstance<IUserTypeController>("IUserTypeController", mockUserTypeController.mock);

        app = express();
        app.use(express.json());

        const { userTypeRouter } = require("@userType/adapters/userTypeRouter");
        app.use("/api/admin", userTypeRouter);
    });

    afterEach(() => {
        jest.clearAllMocks();
        jest.resetModules();
    });

    describe("POST /register", () => {
        it("should return user type 201 and the correct response", async () => {
            const responseDTO: CreateUserTypeOutputDTO = {
                message: UserTypeMessages.Success.Creation("ADM"),
                id: userTypePayload.id.toString(),
                description: "ADM",
                status: "ACTIVE",
            };

            const responseBody = { success: true, data: responseDTO };
            mockUserTypeController.withCreate(StatusCodes.CREATED, responseBody);

            const response = await request(app)
                .post("/api/admin/usertype/register")
                .send({ description: "ADM" });

            expect(response.statusCode).toBe(StatusCodes.CREATED);
            expect(response.body).toEqual(responseBody);
            expect(mockUserTypeController.mock.create).toHaveBeenCalledTimes(1);
        });
    });
});
