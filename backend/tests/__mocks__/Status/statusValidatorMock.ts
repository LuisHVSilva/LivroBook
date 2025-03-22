import {IStatusValidator} from "@status/domain/validators/IStatusValidator";

export class StatusValidatorMock {
    private readonly statusValidatorMock: jest.Mocked<IStatusValidator>;

    constructor() {
        this.statusValidatorMock = {
            validateUniqueDescription: jest.fn(),
            validateExistingStatus: jest.fn(),
        }
    };

    get mock(): jest.Mocked<IStatusValidator> {
        return this.statusValidatorMock;
    };
}