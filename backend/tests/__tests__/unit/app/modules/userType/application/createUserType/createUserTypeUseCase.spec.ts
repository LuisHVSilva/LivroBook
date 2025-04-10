import {CreateUserTypeUseCase} from "@userType/application/createUserType/createUserTypeUseCase";
import {MockUserTypeRepository} from "@mocks/UserType/mockUserTypeRepository";
import {MockLogger} from "@mocks/mockLogger";
import {MockUserTypeDomainService} from "@mocks/UserType/mockUserTypeDomainService";
import {MockStatusDomainService} from "@mocks/Status/mockStatusDomainService";
import {UserTypePayload} from "@payloads/userTypePayload";
import {UserTypeMessages} from "@coreShared/messages/userTypeMessages";
import {Result} from "@coreShared/types/Result";
import {CreateUserTypeOutputDTO} from "@userType/adapters/dtos/createUserTypeDTO";
import {UseCaseError} from "@coreShared/errors/useCaseError";
import {ErrorMessages} from "@coreShared/messages/errorMessages";

describe("CreateUserTypeUseCase", () => {
    const INPUT = {description: UserTypePayload.createMock().description};

    let useCase: CreateUserTypeUseCase;
    let mockUseTypeRepository: MockUserTypeRepository;
    let mockLogger: MockLogger;
    let mockUserTypeDomainService: MockUserTypeDomainService;
    let mockStatusDomainService: MockStatusDomainService;

    beforeEach(async () => {
        mockUseTypeRepository = new MockUserTypeRepository();
        mockLogger = new MockLogger();
        mockUserTypeDomainService = new MockUserTypeDomainService();
        mockStatusDomainService = new MockStatusDomainService();
        useCase = new CreateUserTypeUseCase(mockUseTypeRepository.mock, mockLogger.mock, mockUserTypeDomainService.mock,
            mockStatusDomainService.mock);

        await mockUseTypeRepository.withTransaction();
    })

    afterEach(() => {
        jest.clearAllMocks();
        jest.restoreAllMocks();
    })

    it("should create a new user type", async () => {
        mockUseTypeRepository.withCreate();

        const result: Result<CreateUserTypeOutputDTO, UseCaseError> = await useCase.execute(INPUT);

        expect(mockUseTypeRepository.mock.startTransaction).toHaveBeenCalledTimes(1);
        expect(mockUseTypeRepository.commit).toHaveBeenCalledTimes(1);
        expect(mockUseTypeRepository.mock.create).toHaveBeenCalled();
        expect(mockLogger.logInfo).toHaveBeenCalledTimes(2);
        expect(result.isSuccess()).toBeTruthy();
    })

    it("should throw ValidateError if description is null", async () => {
        const result: Result<CreateUserTypeOutputDTO, UseCaseError> = await useCase.execute({description: ""});

        expect(result.isSuccess()).toBeFalsy();
        expect(result.getError().message).toBe(UserTypeMessages.Error.Validation.INVALID_DESCRIPTION_NULL);
        expect(mockUseTypeRepository.mock.startTransaction).toHaveBeenCalledTimes(1);
        expect(mockUseTypeRepository.rollback).toHaveBeenCalledTimes(1);
        expect(mockLogger.logError).toHaveBeenCalledTimes(2);
    })

    it("should throw generic message if an error occurs", async () => {
        mockUseTypeRepository.mock.create.mockRejectedValue(null);

        const result: Result<CreateUserTypeOutputDTO, UseCaseError> = await useCase.execute(INPUT);
        expect(result.isSuccess()).toBeFalsy();
        expect(result.getError().message).toBe(ErrorMessages.Internal.INTERNAL_ERROR);
    })
})