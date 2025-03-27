import { Response } from "express";
import { StatusCodes } from "http-status-codes";
import {ControllerError} from "@coreShared/errors/ControllerError";
import { ILogger } from "@coreShared/logs/ILogger";
import { UseCaseError } from "@coreShared/errors/UseCaseError";
import { Messages } from "@coreShared/messages/messages";

describe("ControllerError.handleError", () => {
    let loggerMock: jest.Mocked<ILogger>;
    let responseMock: jest.Mocked<Response>;

    beforeEach(() => {
        loggerMock = {
            logError: jest.fn(),
        } as unknown as jest.Mocked<ILogger>;

        responseMock = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        } as unknown as jest.Mocked<Response>;
    });

    it("should handle standard Error correctly", async () => {
        const error = new Error("Test error");

        await ControllerError.handleError(
            loggerMock,
            "TestClass",
            "testMethod",
            error,
            responseMock,
            StatusCodes.BAD_REQUEST,
        );

        expect(loggerMock.logError).toHaveBeenCalledWith("TestClass", "testMethod", error, StatusCodes.BAD_REQUEST, undefined);
        expect(responseMock.status).toHaveBeenCalledWith(StatusCodes.BAD_REQUEST);
        expect(responseMock.json).toHaveBeenCalledWith({
            success: false,
            message: "Test error",
        });
    });

    it("should handle standard status code correctly", async () => {
        const error = new Error("Test error");

        await ControllerError.handleError(
            loggerMock,
            "TestClass",
            "testMethod",
            error,
            responseMock,
        );

        expect(responseMock.status).toHaveBeenCalledWith(StatusCodes.BAD_REQUEST);
    });

    it("should handle UseCaseError correctly", async () => {
        const error = new UseCaseError("TestClass", "UseCase error");

        await ControllerError.handleError(
            loggerMock,
            "TestClass",
            "testMethod",
            error,
            responseMock,
            StatusCodes.NOT_FOUND
        );

        expect(loggerMock.logError).toHaveBeenCalledWith("TestClass", "testMethod", error, StatusCodes.NOT_FOUND, undefined);
        expect(responseMock.status).toHaveBeenCalledWith(StatusCodes.NOT_FOUND);
        expect(responseMock.json).toHaveBeenCalledWith({
            success: false,
            message: "UseCase error",
        });
    });

    it("should handle unknown errors as internal server error", async () => {
        const error = "Some unknown error";

        await ControllerError.handleError(
            loggerMock,
            "TestClass",
            "testMethod",
            error,
            responseMock,
            StatusCodes.BAD_REQUEST,
        );

        expect(loggerMock.logError).toHaveBeenCalledWith(
            "TestClass",
            "testMethod",
            error as any,
            StatusCodes.INTERNAL_SERVER_ERROR,
            undefined
        );
        expect(responseMock.status).toHaveBeenCalledWith(StatusCodes.INTERNAL_SERVER_ERROR);
        expect(responseMock.json).toHaveBeenCalledWith({
            success: false,
            message: Messages.Generic.INTERNAL_ERROR,
        });
    });

    it("should catch logging errors and continue execution", async () => {
        loggerMock.logError.mockImplementation(() => {
            throw new Error("Logging failed");
        });

        const error = new Error("Test error");

        await ControllerError.handleError(
            loggerMock,
            "TestClass",
            "testMethod",
            error,
            responseMock,
            StatusCodes.BAD_REQUEST,
        );

        expect(responseMock.status).toHaveBeenCalledWith(StatusCodes.BAD_REQUEST);
        expect(responseMock.json).toHaveBeenCalledWith({
            success: false,
            message: "Test error",
        });
    });
});
