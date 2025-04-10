import {StatusModel} from "@status/infrastructure/models/StatusModel";
import {StatusRepository} from "@status/infrastructure/repositories/StatusRepository";
import {StatusPayload} from "@payloads/statusPayload";
import {Status} from "@status/domain/status";
import {StateEnum} from "@coreShared/enums/StateEnum";
import {Result} from "@coreShared/types/Result";
import {RepositoryError} from "@coreShared/errors/RepositoryError";
import {MockCacheManager} from "@mocks/mockCacheManager";
import {DataConverter} from "@coreShared/utils/dataConverterUtils";

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

describe('StatusRepository', () => {
    let statusRepository: StatusRepository;
    let cacheManagerMock: MockCacheManager<Status, RepositoryError>;


    //#region Properties
    const statusModelMock = StatusModel as jest.Mocked<typeof StatusModel>
    const statusPayloadMock: StatusPayload = StatusPayload.createMock();
    const statusEntity: Status = statusPayloadMock.toEntity();

    const CLASS_NAME: string = "StatusRepository";
    const REPOSITORY_ERROR_NAME: string = `RepositoryError - ${CLASS_NAME}`
    const REPOSITORY_ERROR_MESSAGE: string = "ERROR";
    const mockError = new RepositoryError(CLASS_NAME, REPOSITORY_ERROR_MESSAGE);

    const NEW_DESCRIPTION = "NEW DESCRIPTION";

    //#endregion

    beforeEach(() => {
        cacheManagerMock = new MockCacheManager<Status, RepositoryError>();
        statusRepository = new StatusRepository({transaction: jest.fn()} as any, cacheManagerMock.mock);
    })


    afterEach(() => {
        jest.clearAllMocks();
        jest.restoreAllMocks();
    });


    describe("create", () => {
        it("should create a new status", async () => {
            (StatusModel.create as jest.Mock).mockResolvedValue(statusEntity);

            const statusModelCreateSpy = jest.spyOn(StatusModel, "create");
            const statusRestoreSpy = jest.spyOn(Status, "restore");

            cacheManagerMock.withInvalidateRelatedCaches();
            statusModelMock.create.mockResolvedValueOnce(statusPayloadMock);

            const savedStatus: Status = (await statusRepository.create(statusEntity)).unwrapOrThrow();

            expect(statusModelCreateSpy).toHaveBeenCalled();
            expect(statusRestoreSpy).toHaveBeenCalled();
            expect(savedStatus.getId()).toBe(statusPayloadMock.id);
            expect(savedStatus.getDescription()).toBe(statusPayloadMock.description);
            expect(savedStatus.getActive()).toBe(1);
        });

        it('should throw RepositoryError if invalid status ', async () => {
            statusModelMock.create.mockRejectedValue(mockError);

            await expect(statusRepository.create(statusEntity)).rejects.toMatchObject({
                name: REPOSITORY_ERROR_NAME,
                message: REPOSITORY_ERROR_MESSAGE,
            });

            expect(statusModelMock.create).toHaveBeenCalledTimes(1);
        });
    });

    describe("findById", () => {
        beforeEach(() => {
            cacheManagerMock.withGenerateCacheKey();
            cacheManagerMock.withGetOrSetFetcher();
        })

        afterEach(() => {
            jest.clearAllMocks();

        })

        it("should found status", async() => {
            jest.spyOn(StatusModel, 'findByPk').mockResolvedValue(statusPayloadMock.model());
            jest.spyOn(DataConverter, 'convertBooleanToStateEnum').mockReturnValue(StateEnum.ACTIVE);

            const result: Status = (await statusRepository.findById(statusPayloadMock.id)).unwrapOrThrow();

            expect(StatusModel.findByPk).toHaveBeenCalledWith(statusPayloadMock.id);
            expect(DataConverter.convertBooleanToStateEnum).toHaveBeenCalledWith(statusPayloadMock.model().active);
            expect(result.getId()).toBe(statusPayloadMock.id);
            expect(result.getDescription()).toBe(statusPayloadMock.description);
            expect(result.getActive()).toBe(StateEnum.ACTIVE);

        })

        it("should return null when status not found", async () => {
            (StatusModel.findByPk as jest.Mock).mockResolvedValueOnce(null);
            const result: Result<Status> = await statusRepository.findById(statusPayloadMock.id);

            expect(result.isNone()).toBeTruthy();
        });

        it('should throw RepositoryError when findById throw any error ', async () => {
            (StatusModel.findByPk as jest.Mock).mockResolvedValueOnce(mockError);
            const result: Result<Status> = await statusRepository.findById(statusPayloadMock.id);
            await expect(result.isFailure()).toBeTruthy();
        });
    });

    describe('FindByDescription', () => {
        beforeEach(() => {
            cacheManagerMock.withGenerateCacheKey();
            cacheManagerMock.withGetOrSetFetcher();
        })

        afterEach(() => {
            jest.clearAllMocks();
        })

        it("should find a status with description", async () => {
            (StatusModel.findOne as jest.Mock).mockResolvedValueOnce(statusEntity);

            const status: Result<Status, RepositoryError> =
                await statusRepository.findByDescription(statusPayloadMock.description);
            const statusValue: Status = status.unwrapOrThrow();

            expect(statusValue.getId()).toBe(statusPayloadMock.id);
            expect(statusValue.getDescription()).toBe(statusPayloadMock.description);
            expect(statusValue.getActive()).toBe(StateEnum.ACTIVE);
        })

        it("should return null when status not found with description", async () => {
            (StatusModel.findOne as jest.Mock).mockResolvedValueOnce(null);
            const result: Result<Status, RepositoryError> =
                await statusRepository.findByDescription(statusPayloadMock.description);
            expect(result.isNone()).toBeTruthy();
        });

        it('should throw RepositoryError when findByDescription throw any error ', async () => {
            (StatusModel.findOne as jest.Mock).mockResolvedValueOnce(mockError);
            await expect(statusRepository.findByDescription(statusPayloadMock.description)).rejects.toThrow(RepositoryError);
        });
    });

    describe('updateDescription', () => {
        it("should update a status with id", async () => {
            const updatedStatus: Status = StatusPayload.createMock({description: NEW_DESCRIPTION}).toEntity();

            (StatusModel.update as jest.Mock).mockResolvedValueOnce(updatedStatus);

            await statusRepository.updateDescription(updatedStatus.getId()!, updatedStatus.getDescription());

            expect(StatusModel.update).toHaveBeenCalledWith(
                {description: NEW_DESCRIPTION},
                {where: {id: statusPayloadMock.id}}
            );
        });

        it("should throw RepositoryError when updateDescription throw any error", async () => {
            statusModelMock.update.mockRejectedValue(mockError);

            await expect(statusRepository.updateDescription(statusEntity.getId()!, statusEntity.getDescription()))
                .rejects.toThrow({
                    name: REPOSITORY_ERROR_NAME,
                    message: REPOSITORY_ERROR_MESSAGE,
                });

            expect(statusModelMock.update).toHaveBeenCalledTimes(1);
        });
    });

    describe("updateActive", () => {
        it("should deactivate a status with id", async () => {
            const updatedStatus: Status = StatusPayload.createMock().toEntity();

            (StatusModel.update as jest.Mock).mockResolvedValueOnce(updatedStatus);

            await statusRepository.updateActive(updatedStatus.getId()!, updatedStatus.getActive());

            expect(StatusModel.update).toHaveBeenCalledWith(
                {active: true},
                {where: {id: statusPayloadMock.id}}
            );
        });

        it("should throw RepositoryError when updateActive throw any error", async () => {
            statusModelMock.update.mockRejectedValue(mockError);

            await expect(statusRepository.updateActive(statusEntity.getId()!, statusEntity.getActive()))
                .rejects.toThrow({
                name: REPOSITORY_ERROR_NAME,
                message: REPOSITORY_ERROR_MESSAGE,
            });

            expect(statusModelMock.update).toHaveBeenCalledTimes(1);
        });
    });
})

