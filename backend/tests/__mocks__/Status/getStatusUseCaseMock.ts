import {IGetStatusUseCase} from "@status/application/ports/IGetStatusUseCase";
import {StatusPayload} from "@payloads/statusPayload";
import {GetStatusResponseDTO} from "@status/adapters/dtos/GetStatusDTO";
import {Result} from "@coreShared/types/Result";
import {Messages} from "@coreShared/constants/messages";

export class GetStatusUseCaseMock {
    private readonly getStatusUseCaseMock: jest.Mocked<IGetStatusUseCase>;
    private readonly statusPayloadMock: StatusPayload = StatusPayload.createMock();

    constructor() {
        this.getStatusUseCaseMock = {
            execute: jest.fn()
        };
    };

    get mock(): jest.Mocked<IGetStatusUseCase> {
        return this.getStatusUseCaseMock;
    };

    public withExecute(): this {
        const result: Result<GetStatusResponseDTO> = Result.success<GetStatusResponseDTO>({
            message: Messages.Status.Success.FOUND(this.statusPayloadMock.description),
            id: this.statusPayloadMock.id.toString(),
            description: this.statusPayloadMock.description,
            active: this.statusPayloadMock.active
        });

        this.getStatusUseCaseMock.execute.mockResolvedValueOnce(result);
        return this;
    };

    public withExecuteNullReturn(): this {
        const message: string =Messages.Status.Error.INVALID_ID(this.statusPayloadMock.id.toString());
        this.getStatusUseCaseMock.execute.mockResolvedValueOnce(Result.failure(message));
        return this;
    };

    public withExecuteError(error: any): this {
        this.getStatusUseCaseMock.execute.mockRejectedValue(error);
        return this;
    };
}