import "reflect-metadata"
import express, {Express} from "express";
import request from "supertest";
import {StatusPayload} from "@payloads/statusPayload";
import {Sequelize} from "sequelize-typescript";
import {StatusModel} from "@status/infrastructure/models/StatusModel";
import {StatusCodes} from "http-status-codes";
import {CreateStatusDTO, CreateStatusResponseDTO} from "@status/adapters/dtos/CreateStatusDTO";
import {Messages} from "@coreShared/constants/messages";
import {GetStatusResponseDTO} from "@status/adapters/dtos/GetStatusDTO";
import {StateEnum} from "@coreShared/enums/StateEnum";
import {UpdateDescriptionResponseDTO} from "@status/adapters/dtos/UpdateDescriptionDTO";
import {UpdateActiveResponseDTO} from "@status/adapters/dtos/UpdateActiveDTO";

describe("Integration tests - Status", () => {
    let app: Express;
    let sequelize: Sequelize;
    let statusPayloadMock: StatusPayload;

    beforeEach(async () => {
        statusPayloadMock = StatusPayload.createMock();
        sequelize = new Sequelize({
            dialect: "sqlite",
            storage: ":memory:",
            models: [StatusModel],
            logging: false,
        });

        await sequelize.sync({ force: true });

        app = express();
        app.use(express.json());

        const { statusRoutes } = require("@status/adapters/route/statusRoute");
        app.use("/api/admin", statusRoutes);
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    afterAll(async () => {
        await sequelize.close();
    })

    describe("POST /status", () => {
        it("should return status 201 and the correct response", async () => {
            const createStatusDTO: CreateStatusDTO = {
                description: statusPayloadMock.description
            }

            const createStatusResponseDTO: CreateStatusResponseDTO = {
                message: Messages.Status.Success.CREATED(statusPayloadMock.description),
                id: statusPayloadMock.id.toString(),
                description: statusPayloadMock.description.toString()
            }

            const expectedResponse = {
                data: createStatusResponseDTO,
                success: true,
            }
            const response = await request(app)
                .post("/api/admin/status")
                .send(createStatusDTO);

            expect(response.statusCode).toBe(StatusCodes.CREATED);
            expect(response.body).toStrictEqual(expectedResponse);
        });
    });

    describe("GET /status/:id", () => {
        it("should return status 200 and the correct response", async () => {
            const statusCreated: StatusModel = await StatusModel.create({
                description: statusPayloadMock.description,
                active: true,
            });

            const getStatusResponseDTO: GetStatusResponseDTO = {
                message: Messages.Status.Success.FOUND_BY_ID,
                id: statusCreated.id.toString(),
                description: statusPayloadMock.description,
                active: StateEnum.ACTIVE,
            }

            const expectedResponse = {
                data: getStatusResponseDTO,
                success: true,
            }
            const response = await request(app).get(`/api/admin/status/1`);

            expect(response.statusCode).toBe(StatusCodes.OK);
            expect(response.body).toStrictEqual(expectedResponse);
        })
    });

    describe("PATCH /status/description/:id", () => {
        it("should return status 200 and the correct response", async () => {
            const newDescription: string = "NOVA DESCRICAO";

            const statusCreated: StatusModel = await StatusModel.create({
                description: statusPayloadMock.description,
                active: true,
            });

            const updateDescriptionResponseDTO: UpdateDescriptionResponseDTO = {
                message: Messages.Status.Success.UPDATED_TO(statusPayloadMock.description, newDescription),
                newDescription: newDescription,
            }

            const expectedResponse = {
                data: updateDescriptionResponseDTO,
                success: true,
            }

            const response = await request(app)
                .patch(`/api/admin/status/description/${statusCreated.id.toString()}`)
                .send({newDescription: newDescription});

            expect(response.statusCode).toBe(StatusCodes.OK);
            expect(response.body).toStrictEqual(expectedResponse);

        })
    });

    describe("PATCH /status/active/:id", () => {
        it("should return status 200 and the correct response", async () => {
            const statusCreated: StatusModel = await StatusModel.create({
                description: statusPayloadMock.description,
                active: false,
            });

            const updateActiveResponseDTO: UpdateActiveResponseDTO = {
                message: Messages.Status.Success.ACTIVATED,
            }

            const expectedResponse = {
                data: updateActiveResponseDTO,
                success: true,
            }

            const response = await request(app)
                .patch(`/api/admin/status/active/${statusCreated.id.toString()}`)
                .send({active: true});

            expect(response.statusCode).toBe(StatusCodes.OK);
            expect(response.body).toStrictEqual(expectedResponse);
        })
    });
})