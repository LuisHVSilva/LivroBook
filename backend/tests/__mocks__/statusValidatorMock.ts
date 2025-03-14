import {IStatusValidator} from "@status/domain/validators/IStatusValidator";
import {Messages} from "@coreShared/constants/messages";

export class StatusValidatorMock {
    private readonly statusValidatorMock: jest.Mocked<IStatusValidator>;

    constructor() {
        this.statusValidatorMock = {
            validateUniqueDescription: jest.fn()
        }
    }

    get mock(): jest.Mocked<IStatusValidator> {
        return this.statusValidatorMock;
    }

    public withValidateUniqueDescriptionError(message: string = Messages.Generic.MESSAGE_NOT_REGISTERED): this {
        this.statusValidatorMock.validateUniqueDescription.mockImplementation(() => {
            throw message;
        })
        return this;
    }
}