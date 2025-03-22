import {IGetStatusUseCase} from "@status/application/ports/IGetStatusUseCase";
import {StatusPayload} from "@payloads/statusPayload";
import {StateEnum} from "@coreShared/enums/StateEnum";
import {GetStatusResponseDTO} from "@status/adapters/dtos/GetStatusDTO";
import {Result} from "@coreShared/types/Result";
import {Messages} from "@coreShared/constants/messages";

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

        const result: Result<GetStatusResponseDTO> = Result.success<GetStatusResponseDTO>({
            message: Messages.Status.Success.FOUND(StatusPayload.validDescriptionFormatted),
            id: id.toString(),
            description: description,
            active: active
        });

        this.getStatusUseCaseMock.execute.mockResolvedValueOnce(result);
        return this;
    };

    public withExecuteNullReturn(id: number): this {
        this.getStatusUseCaseMock.execute.mockResolvedValueOnce(Result.failure(Messages.Status.Error.INVALID_ID(id.toString())));
        return this;
    };

    public withExecuteError(error: any): this {
        this.getStatusUseCaseMock.execute.mockRejectedValue(error);
        return this;
    };
}