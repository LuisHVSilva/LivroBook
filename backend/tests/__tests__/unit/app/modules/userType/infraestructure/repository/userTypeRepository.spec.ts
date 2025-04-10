import {UserTypeRepository} from "@userType/infrastructure/repository/UserTypeRepository";
import {UserType} from "@userType/domain/userType";
import {RepositoryError} from "@coreShared/errors/RepositoryError";
import {MockCacheManager} from "@mocks/mockCacheManager";
import {UserTypeModel} from "@userType/infrastructure/model/UserTypeModel";
import {UserTypePayload} from "@payloads/userTypePayload";
import {StatusModel} from "@status/infrastructure/models/StatusModel";

jest.mock("@userType/infrastructure/model/UserTypeModel");
jest.mock("@status/infrastructure/models/StatusModel");
jest.mock("@coreConfig/database", () => ({
    Database: {
        getInstance: jest.fn(() => ({
            addModels: jest.fn(),
            sync: jest.fn(),
            authenticate: jest.fn(),
            close: jest.fn(),
        })),
    },
}));

describe("UserTypeRepository", () => {
    let userTypeRepository: UserTypeRepository;
    let cacheManagerMock: MockCacheManager<UserType, RepositoryError>;

    //#region Properties
    const userTypePayloadMock: UserTypePayload = UserTypePayload.createMock();
    const userTypeEntity: UserType = userTypePayloadMock.toEntity();

    const CLASS_NAME: string = "UserTypeRepository";
    const REPOSITORY_ERROR_MESSAGE: string = "ERROR";
    const mockError = new RepositoryError(CLASS_NAME, REPOSITORY_ERROR_MESSAGE);

    //#endregion

    beforeEach(() => {
        cacheManagerMock = new MockCacheManager<UserType, RepositoryError>();
        userTypeRepository = new UserTypeRepository({transaction: jest.fn()} as any, cacheManagerMock.mock);

        cacheManagerMock.withGenerateCacheKey();
        cacheManagerMock.withGetOrSetFetcher();
    })

    afterEach(() => {
        jest.clearAllMocks();
        jest.restoreAllMocks();
    });

    describe("create", () => {
        it("should create a new user type", async () => {
            (UserTypeModel.create as jest.Mock).mockResolvedValue(userTypePayloadMock);

            const userTypeModelCreateSpy = jest.spyOn(UserTypeModel, "create");
            const userTypeRestoreSpy = jest.spyOn(UserType, "restore");
            const cacheInvalidateRelatedCachesSpy = jest.spyOn(cacheManagerMock.mock, "invalidateRelatedCaches");

            const result = await userTypeRepository.create(userTypeEntity);

            expect(userTypeModelCreateSpy).toHaveBeenCalledWith({
                description: userTypePayloadMock.description,
                statusId: userTypePayloadMock.statusId
            });
            expect(userTypeRestoreSpy).toHaveBeenCalledWith({
                id: userTypePayloadMock.id,
                description: userTypePayloadMock.description,
                status: userTypePayloadMock.status
            });
            expect(cacheInvalidateRelatedCachesSpy).toHaveBeenCalledTimes(1);
            expect(result.isSuccess()).toBe(true);
        });

        it("should throw an error when creating a user type fails", async () => {
            (UserTypeModel.create as jest.Mock).mockRejectedValue(new Error("Database error"));

            const userTypeModelCreateSpy = jest.spyOn(UserTypeModel, "create");

            await expect(userTypeRepository.create(userTypeEntity)).rejects.toThrow(RepositoryError);

            expect(userTypeModelCreateSpy).toHaveBeenCalled();
        });
    });

    describe("findById", () => {
        it("should find a user type by id", async () => {
            (UserTypeModel.findByPk as jest.Mock).mockResolvedValue(userTypePayloadMock);
            (StatusModel.findByPk as jest.Mock).mockResolvedValue(userTypePayloadMock.status);

            const userTypeModelFindByPkSpy = jest.spyOn(UserTypeModel, "findByPk");
            const statusFindByPkSpy = jest.spyOn(StatusModel, "findByPk");

            const result = await userTypeRepository.findById(userTypePayloadMock.id);

            expect(userTypeModelFindByPkSpy).toHaveBeenCalledWith(userTypePayloadMock.id);
            expect(statusFindByPkSpy).toHaveBeenCalledWith(userTypePayloadMock.status.getId());
            expect(result.isSuccess()).toBe(true);
        });

        it("should return none when user type is not found", async () => {
            (UserTypeModel.findByPk as jest.Mock).mockResolvedValue(null);

            const userTypeModelFindByPkSpy = jest.spyOn(UserTypeModel, "findByPk");

            const result = await userTypeRepository.findById(userTypePayloadMock.id);

            expect(userTypeModelFindByPkSpy).toHaveBeenCalledWith(userTypePayloadMock.id);
            expect(result.isNone()).toBe(true);
        });

        it("should return none when status is not found", async () => {
            (UserTypeModel.findByPk as jest.Mock).mockResolvedValue(userTypePayloadMock);
            (StatusModel.findByPk as jest.Mock).mockResolvedValue(null);

            const userTypeModelFindByPkSpy = jest.spyOn(UserTypeModel, "findByPk");

            const result = await userTypeRepository.findById(userTypePayloadMock.id);

            expect(userTypeModelFindByPkSpy).toHaveBeenCalledWith(userTypePayloadMock.id);
            expect(result.isNone()).toBe(true);
        });

        it("should throw an error when findById fails", async () => {
            (UserTypeModel.findByPk as jest.Mock).mockRejectedValue(mockError);
            await expect(userTypeRepository.findById(userTypePayloadMock.id)).rejects.toThrow(RepositoryError);
        });
    });

    describe("countByDescription", () => {
        it("should find a user type by description", async () => {
            (UserTypeModel.count as jest.Mock).mockResolvedValue(1);
            const result = await userTypeRepository.countByDescription(userTypePayloadMock.description);

            expect(result).toBe(1);
            expect(UserTypeModel.count).toHaveBeenCalledWith({
                where: { description:  userTypePayloadMock.description}
            });
        });
    });
})