import {CreateStatusOutput, ICreateStatusUseCase} from "@status/application/ports/ICreateStatusUseCase";
import {StatusPayload} from "@payloads/statusPayload";

export class CreateStatusUseCaseMock {
    private readonly createStatusUseCaseMock: jest.Mocked<ICreateStatusUseCase>;

    constructor() {
        this.createStatusUseCaseMock = {
            execute: jest.fn()
        };
    };

    get mock(): jest.Mocked<ICreateStatusUseCase> {
        return this.createStatusUseCaseMock;
    };

    public withExecute(id: number = StatusPayload.id,
                       description: string = StatusPayload.validDescriptionFormatted): this {

        const result: CreateStatusOutput = {
            id: id,
            description: description
        }

        this.createStatusUseCaseMock.execute.mockResolvedValueOnce(result);
        return this;
    };

    public withExecuteError(error: any): this {
        this.createStatusUseCaseMock.execute.mockRejectedValue(error);
        return this;
    };
}