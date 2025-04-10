import {StatusCodes} from "http-status-codes";
import {Request, Response} from "express";
import {IUserTypeController} from "@userType/adapters/controller/IUserTypeController";

export class MockUserTypeController {
    private readonly mockController: jest.Mocked<IUserTypeController>;

    constructor () {
        this.mockController = {
            create: jest.fn(),
        }
    }

    get mock(): jest.Mocked<IUserTypeController> {
        return this.mockController;
    }

    public withCreate(statusCode: StatusCodes, responseBody: any): void {
        this.mockController.create.mockImplementation(
            async (req: Request, res: Response) => {
                return res.status(statusCode).json(responseBody);
            }
        )
    }
}