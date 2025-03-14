import {GetStatusOutput, IGetStatusUseCase} from "@status/application/ports/IGetStatusUseCase";
import {StatusPayload} from "@payloads/statusPayload";
import {StateEnum} from "@coreShared/enums/StateEnum";

export class GetStatusUseCaseMock {
    private readonly getStatusUseCaseMock: jest.Mocked<IGetStatusUseCase>;

    constructor() {
        this.getStatusUseCaseMock = {
            execute: jest.fn()
        };
    };

    get mock(): jest.Mocked<IGetStatusUseCase> {
        return this.getStatusUseCaseMock;
    };

    public withExecute(id: number = StatusPayload.id,
                description: string = StatusPayload.validDescriptionFormatted,
                active: StateEnum = StatusPayload.active): this {
        const result: GetStatusOutput = {
            id: id,
            description: description,
            active: active
        };

        this.getStatusUseCaseMock.execute.mockResolvedValueOnce(result);
        return this;
    };

    public withExecuteNullReturn(): this {
        this.getStatusUseCaseMock.execute.mockResolvedValueOnce(null);
        return this;
    };

    public withExecuteError(error: any): this {
        this.getStatusUseCaseMock.execute.mockRejectedValue(error);
        return this;
    };
}