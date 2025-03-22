import "reflect-metadata"
import express, {Express} from "express";
import request from "supertest";
import {StatusPayload} from "@payloads/statusPayload";
import {Sequelize} from "sequelize-typescript";
import {StatusModel} from "@status/infrastructure/models/StatusModel";
import {StatusCodes} from "http-status-codes";

describe("Integration tests - Status", () => {
    let app: Express;
    let sequelize: Sequelize;

    beforeEach(async () => {
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
            const expectedResponse = {
                data: StatusPayload.createStatusResponseDTO(),
                success: true,
            }
            const response = await request(app)
                .post("/api/admin/status")
                .send(StatusPayload.createStatusInputDTO());

            expect(response.statusCode).toBe(StatusCodes.CREATED);
            expect(response.body).toStrictEqual(expectedResponse);
        });
    });

    describe("GET /status/:id", () => {

        it("should return status 200 and the correct response", async () => {
            await StatusModel.create({
                description: StatusPayload.validDescriptionFormatted,
                active: true,
            });

            const expectedResponse = {
                data: StatusPayload.getStatusResponseDTO(),
                success: true,
            }
            const response = await request(app).get(`/api/admin/status/1`);

            expect(response.statusCode).toBe(StatusCodes.OK);
            expect(response.body).toStrictEqual(expectedResponse);
        })
    });

    describe("PATCH /status", () => {
        it("should return status 200 and the correct response", async () => {
            const newDescription: string = "NOVA DESCRIÇÃO";

            await StatusModel.create({
                description: StatusPayload.validDescriptionFormatted,
                active: true,
            });

            const expectedResponse = {
                data: StatusPayload.updateDescriptionDTO(newDescription),
                success: true,
            }

            const response = await request(app)
                .patch(`/api/admin/status`)
                .send(StatusPayload.createStatusInputDTO());

            expect(response.statusCode).toBe(StatusCodes.OK);
            expect(response.body).toStrictEqual(expectedResponse);

        })
    });
})