import "reflect-metadata"
import request from "supertest";
import express, { Express } from "express";
import { StatusCodes } from "http-status-codes";
import { container } from "tsyringe";
import { CreateStatusResponseDTO } from "@status/adapters/dtos/CreateStatusDTO";
import { IStatusController } from "@status/adapters/controllers/IStatusController";
import {StatusPayload} from "@payloads/statusPayload";
import {GetStatusResponseDTO} from "@status/adapters/dtos/GetStatusDTO";
import {UpdateDescriptionResponseDTO} from "@status/adapters/dtos/UpdateDescriptionDTO";
import {UpdateActiveResponseDTO} from "@status/adapters/dtos/UpdateActiveDTO";
import {MockStatusController} from "@mocks/Status/mockStatusController";
import {StatusMessages} from "@coreShared/messages/statusMessages";

jest.mock("@status/adapters/factories/controllerFactory", () => ({
    makeStatusController: () => mockStatusController.mock,
}));

const mockStatusController:  MockStatusController = new MockStatusController();

describe("status Route", () => {
    let app: Express;
    let statusPayload: StatusPayload;

    beforeEach(() => {
        statusPayload = StatusPayload.createMock();
        container.reset();
        container.registerInstance<IStatusController>("IStatusController", mockStatusController.mock);

        app = express();
        app.use(express.json());

        const { statusRoutes } = require("@status/adapters/statusRoute");
        app.use("/api/admin", statusRoutes);
    });

    afterEach(() => {
        jest.clearAllMocks();
        jest.resetModules();
    });

    describe("POST /status", () => {
        it("should return status 201 and the correct response", async () => {
            const responseDTO: CreateStatusResponseDTO = {
                id: statusPayload.id.toString(),
                description: "STATUS",
                message: StatusMessages.Success.Creation("STATUS"),
            };

            const responseBody = { success: true, data: responseDTO };
            mockStatusController.withCreateStatus(StatusCodes.CREATED, responseBody);

            const response = await request(app)
                .post("/api/admin/status")
                .send({ description: "STATUS" });

            expect(response.statusCode).toBe(StatusCodes.CREATED);
            expect(response.body).toEqual(responseBody);
            expect(mockStatusController.mock.createStatus).toHaveBeenCalledTimes(1);
        });
    });

    describe("GET /status", () => {
        it("should return status 200 and the correct response", async () => {
            const responseDTO: GetStatusResponseDTO = {
                message: StatusMessages.Success.Retrieval.FOUND(statusPayload.description),
                id: statusPayload.id.toString(),
                description: statusPayload.description,
                active: statusPayload.active,
            }

            const responseBody = { success: true, data: responseDTO };

            mockStatusController.withGetStatusById(StatusCodes.OK, responseBody)

            const response = await request(app).get(`/api/admin/status/${statusPayload.id.toString()}`);

            expect(response.statusCode).toBe(StatusCodes.OK);
            expect(response.body).toEqual(responseBody);
            expect(mockStatusController.mock.getStatusById).toHaveBeenCalledTimes(1);
        })
    })

    describe("PATCH /status/description/:id", () => {
        it("should return status 200 and the correct response", async () => {
            const newDescription = "NEW DESCRIPTION";
            const responseDTO: UpdateDescriptionResponseDTO = {
                message: StatusMessages.Success.Update(statusPayload.description, newDescription),
                newDescription: newDescription,
            }

            const responseBody = { success: true, data: responseDTO };
            mockStatusController.withUpdateDescription(StatusCodes.OK, responseBody)

            const response = await request(app)
                .patch(`/api/admin/status/description/${statusPayload.id.toString()}`)
                .send({ newDescription: newDescription });

            expect(response.statusCode).toBe(StatusCodes.OK);
            expect(response.body).toEqual(responseBody);
            expect(mockStatusController.mock.updateDescription).toHaveBeenCalledTimes(1);
        })
    })

    describe("PATCH /status/active/:id", () => {
        it("should return status 200 and the correct response", async () => {
            const responseDTO: UpdateActiveResponseDTO = {
                message: StatusMessages.Success.Activation.ACTIVATED,
            }

            const responseBody = { success: true, data: responseDTO };
            mockStatusController.withUpdateActive(StatusCodes.OK, responseBody)

            const response = await request(app)
                .patch(`/api/admin/status/active/${statusPayload.id.toString()}`)
                .send({ active: false });

            expect(response.statusCode).toBe(StatusCodes.OK);
            expect(response.body).toEqual(responseBody);
            expect(mockStatusController.mock.updateActive).toHaveBeenCalledTimes(1);
        })
    })
});
