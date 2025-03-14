import {IStatusController} from "@status/adapters/controllers/IStatusController";
import {StatusCodes} from "http-status-codes";
import {Request, Response} from "express";

export class StatusControllerMock {
    private readonly statusControllerMock: jest.Mocked<IStatusController>;

    constructor () {
        this.statusControllerMock = {
            createStatus: jest.fn(),
            getStatusById: jest.fn(),
        }
    }

    get mock(): jest.Mocked<IStatusController> {
        return this.statusControllerMock;
    }

    public withCreateStatus(statusCode: StatusCodes, responseBody: any) {
        this.statusControllerMock.createStatus.mockImplementation(
            async (req: Request, res: Response) => {
                return res.status(statusCode).json(responseBody);
            }
        )
    }

    public withGetStatusById(statusCode: StatusCodes, responseBody: any) {
        this.statusControllerMock.getStatusById.mockImplementation(
            async (req: Request, res: Response) => {
                return res.status(statusCode).json(responseBody);
            }
        )
    }
}