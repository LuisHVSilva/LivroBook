import {IStatusValidator} from "@status/domain/validators/IStatusValidator";
import {Status} from "@status/domain/status";
import {StatusPayload} from "@payloads/statusPayload";

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

    public withValidateExistingStatus(): this {
        const result: Status = StatusPayload.createMock().toEntity();
        this.statusValidatorMock.validateExistingStatus.mockResolvedValueOnce(result);
        return this;
    }
}