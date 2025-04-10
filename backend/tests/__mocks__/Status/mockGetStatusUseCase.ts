import {IGetStatusUseCase} from "@status/application/getStatus/IGetStatusUseCase";
import {StatusPayload} from "@payloads/statusPayload";
import {GetStatusResponseDTO} from "@status/adapters/dtos/GetStatusDTO";
import {Result} from "@coreShared/types/Result";
import {StatusMessages} from "@coreShared/messages/statusMessages";

export class MockGetStatusUseCase {
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
            message: StatusMessages.Success.Retrieval.FOUND(this.statusPayloadMock.description),
            id: this.statusPayloadMock.id.toString(),
            description: this.statusPayloadMock.description,
            active: this.statusPayloadMock.active
        });

        this.getStatusUseCaseMock.execute.mockResolvedValueOnce(result);
        return this;
    };

    public withExecuteNullReturn(): this {
        this.getStatusUseCaseMock.execute.mockResolvedValueOnce(Result.none());
        return this;
    };

    public withExecuteError(error: any): this {
        this.getStatusUseCaseMock.execute.mockRejectedValue(error);
        return this;
    };
}