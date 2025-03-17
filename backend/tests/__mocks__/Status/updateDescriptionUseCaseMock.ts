import {
    IUpdateDescriptionUseCase,
    UpdateDescriptionInput,
    UpdateDescriptionOutput
} from "@status/application/ports/IUpdateDescriptionUseCase";
import {StatusPayload} from "@payloads/statusPayload";

export class UpdateDescriptionUseCaseMock {
    private readonly updateDescriptionUseCaseMock: jest.Mocked<IUpdateDescriptionUseCase>;

    constructor() {
        this.updateDescriptionUseCaseMock = {
            execute: jest.fn(),
        }
    }

    get mock(): jest.Mocked<IUpdateDescriptionUseCase> {
        return this.updateDescriptionUseCaseMock;
    }

    public withExecute(id: string = StatusPayload.id.toString(),
                       description: string = StatusPayload.validDescriptionFormatted): this {

        const result: UpdateDescriptionOutput =  {
            id: id,
            description: description
        }

        this.updateDescriptionUseCaseMock.execute.mockResolvedValueOnce(result);
        return this;
    }
}