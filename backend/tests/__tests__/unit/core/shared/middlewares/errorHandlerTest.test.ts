import request from "supertest";
import express, { Request, Response, NextFunction } from "express";
import {ErrorHandler} from "@coreShared/middlewares/errorHandler";
import { Messages } from "@coreShared/constants/messages";

describe("ErrorHandler Middleware", () => {
    let app: express.Express;

    beforeAll(() => {
        app = express();

        app.get("/error", (req: Request, res: Response, next: NextFunction) => {
            next(new Error("Simulated error"));
        });

        app.use(ErrorHandler.handleError);
    });

    it("should catch an error and return status 500 with error message", async () => {
        const response = await request(app).get("/error");

        expect(response.status).toBe(500);
        expect(response.body).toEqual({ message: Messages.ErrorHandler.UNEXPECTED_ERROR });
    });
});
