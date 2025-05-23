import {ICreateStatusUseCase} from "@status/application/createStatus/ICreateStatusUseCase";
import {StatusPayload} from "@payloads/statusPayload";
import {CreateStatusResponseDTO} from "@status/adapters/dtos/CreateStatusDTO";
import {Result} from "@coreShared/types/Result";
import {StatusMessages} from "@coreShared/messages/statusMessages";

export class MockCreateStatusUseCase {
    private readonly createStatusUseCaseMock: jest.Mocked<ICreateStatusUseCase>;
    private readonly statusPayloadMock: StatusPayload = StatusPayload.createMock();

    constructor() {
        this.createStatusUseCaseMock = {
            execute: jest.fn()
        };
    };

    get mock(): jest.Mocked<ICreateStatusUseCase> {
        return this.createStatusUseCaseMock;
    };

    public withExecute(): this {
        const result: Result<CreateStatusResponseDTO> = Result.success<CreateStatusResponseDTO>({
            message: StatusMessages.Success.Creation(this.statusPayloadMock.description),
            id: this.statusPayloadMock.id.toString(),
            description: this.statusPayloadMock.description,
        });

        this.createStatusUseCaseMock.execute.mockResolvedValueOnce(result);
        return this;
    };

    public withExecuteError(error: any): this {
        this.createStatusUseCaseMock.execute.mockRejectedValue(error);
        return this;
    };
}