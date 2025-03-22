import {ICreateStatusUseCase} from "@status/application/ports/ICreateStatusUseCase";
import {StatusPayload} from "@payloads/statusPayload";
import {CreateStatusResponseDTO} from "@status/adapters/dtos/CreateStatusDTO";
import {Result} from "@coreShared/types/Result";
import {Messages} from "@coreShared/constants/messages";

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

    public withExecute(): this {

        const result: Result<CreateStatusResponseDTO> = Result.success<CreateStatusResponseDTO>({
            message: Messages.Status.Success.CREATED(StatusPayload.validDescriptionFormatted),
            id: StatusPayload.id.toString(),
            description: StatusPayload.validDescriptionFormatted,
        });

        this.createStatusUseCaseMock.execute.mockResolvedValueOnce(result);
        return this;
    };

    public withExecuteError(error: any): this {
        this.createStatusUseCaseMock.execute.mockRejectedValue(error);
        return this;
    };
}