import { IStatusEntity } from '../../../src/app/interface/Entities/IStatusEntity';
import { StatusRepository } from '../../../src/app/repositories/statusRepository';
import { Status } from '../../../src/models/Status';
import { Logger } from '../../../src/utils/logger';
import { MESSAGES } from '../../../src/utils/messages';
import { StatusMock } from '../../mocks/StatusMock';
import { StatusCodes } from 'http-status-codes';


jest.mock('../../../src/models/Status', () => {
    return {
        __esModule: true,
        Status: {
            create: jest.fn(),
            findAll: jest.fn(),
            findOne: jest.fn(),
            findByPk: jest.fn(),
            destroy: jest.fn(),
        },
    };
});

const genericError = "Database error";

describe('StatusRepository', () => {
    let statusRepository: StatusRepository;
    let statusMock: StatusMock;
    let logger: Logger;
    const newStatus: IStatusEntity = {
        id: BigInt(3),
        description: "newStatus",
        active: false,
        createdAt: new Date("2024-01-01"),
        updatedAt: new Date("2024-01-02"),
    };

    beforeEach(() => {
        logger = new Logger();
        statusRepository = new StatusRepository(logger);
        statusMock = new StatusMock();

    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('create: should create a new Status and return the correct properties', async () => {
        (Status.create as jest.Mock) = jest.fn().mockResolvedValue(newStatus);

        // Executando a criação
        const result = await statusRepository.create(newStatus);

        // Verificando se o resultado foi bem-sucedido
        expect(result.success).toBe(true);

        if (result.success) {
            expect(result.data).toBeDefined();

            expect(result.data).toEqual(expect.objectContaining({
                id: expect.any(BigInt),
                description: newStatus.description,
                active: newStatus.active,
                createdAt: expect.any(Date),
                updatedAt: expect.any(Date),
            }));

            expect(result.data.id).toBe(newStatus.id);
            expect(result.data.description).toBe(newStatus.description);
            expect(result.data.active).toBe(newStatus.active);
            expect(result.data.createdAt).toEqual(newStatus.createdAt);
            expect(result.data.updatedAt).toEqual(newStatus.updatedAt);
        };

    });

    it('create error: should log and return error message', async () => {     
        const logSpy = jest.spyOn(logger, 'logError').mockImplementation(() => {});

        (Status.create as jest.Mock).mockRejectedValue(new Error(genericError));

        const result = await statusRepository.create(newStatus);

        expect(result.success).toBe(false);

        if(!result.success){
            expect(result.error).toEqual(MESSAGES.ERRORS.STATUS_REPOSITORY.CREATE);
        }
        
        expect(logSpy).toHaveBeenCalledWith(
            "createStatus",
            StatusCodes.INTERNAL_SERVER_ERROR,
            expect.any(Error)
        );

    });

    it('getAll: should return all status records', async () => {        
        (Status.findAll as jest.Mock).mockImplementation(statusMock.mockFindAll());

        const result = await statusRepository.getAll();

        expect(result.success).toBe(true);
        if (result.success) {
            expect(result.data).toBeDefined();
            expect(result.data).toEqual(expect.objectContaining(statusMock.getStatusMockDataList()));
        };

    });

    it('getAll error: should return a error.', async () => {
        const id: bigint = BigInt(5);
        const logSpy = jest.spyOn(logger, 'logError').mockImplementation(() => {});

        (Status.findAll as jest.Mock).mockRejectedValue(new Error(genericError));

        const result = await statusRepository.getAll();
        
        expect(result.success).toBe(false);

        if(!result.success) {
            expect(result.error).toEqual(MESSAGES.ERRORS.STATUS_REPOSITORY.GET_ALL_STATUS);
        }
        expect(logSpy).toHaveBeenCalledWith(
            "getAll",
            StatusCodes.INTERNAL_SERVER_ERROR,
            expect.any(Error)
        );        
        logSpy.mockRestore();
    });

    it('getById: should return status record based on id.', async () => {
        const id: bigint = BigInt(1);

        (Status.findByPk as jest.Mock).mockImplementation(statusMock.mockFindByPk());

        const result = await statusRepository.getById(id);

        expect(result.success).toBe(true);
        if (result.success) {
            expect(result.data).toBeDefined();
            expect(result.data).toEqual(expect.objectContaining(statusMock.getStatusMockDataList()[0]));
        };

    });

    it('getById error: PK not found.', async () => {
        const id: bigint = BigInt(5);
        const logSpy = jest.spyOn(logger, 'logError').mockImplementation(() => {});

        (Status.findByPk as jest.Mock).mockImplementation(statusMock.mockFindByPk());

        const result = await statusRepository.getById(id);
        
        expect(result.success).toBe(false);

        if(!result.success) {
            expect(result.error).toEqual(MESSAGES.ERRORS.STATUS_REPOSITORY.GET_BY_ID_NOT_FOUND);
        }
        expect(logSpy).toHaveBeenCalledWith(
            "getById",
            StatusCodes.INTERNAL_SERVER_ERROR,
            expect.any(Error)
        );        
        logSpy.mockRestore();
    });

    it('getById error: should return a error.', async () => {
        const id: bigint = BigInt(5);
        const logSpy = jest.spyOn(logger, 'logError').mockImplementation(() => {});

        (Status.findByPk as jest.Mock).mockRejectedValue(new Error(genericError));

        const result = await statusRepository.getById(id);
        
        expect(result.success).toBe(false);

        if(!result.success) {
            expect(result.error).toEqual(MESSAGES.ERRORS.STATUS_REPOSITORY.GET_BY_ID);
        }
        expect(logSpy).toHaveBeenCalledWith(
            "getById",
            StatusCodes.INTERNAL_SERVER_ERROR,
            expect.any(Error)
        );        

        logSpy.mockRestore();
    });    

    it('deleteById: should delete a status by id', async () => {
        const id: bigint = BigInt(1);

        (Status.destroy as jest.Mock).mockResolvedValue(1);

        const result = await statusRepository.deleteById(id);

        expect(result.success).toBe(true);
        
        if(result.success) {
            expect(result.data).toBe(1);
        }
    });

    it('deleteById error: PK not found', async () => {
        const id: bigint = BigInt(5);
        const logSpy = jest.spyOn(logger, 'logError').mockImplementation(() => {});

        (Status.destroy as jest.Mock).mockResolvedValue(0);

        const result = await statusRepository.deleteById(id);

        expect(result.success).toBe(false);
        if(!result.success) {
            expect(result.error).toEqual(MESSAGES.ERRORS.STATUS_REPOSITORY.DELETE_BY_ID_NOT_FOUND);
        }
        expect(logSpy).toHaveBeenCalledWith(
            "deleteById",
            StatusCodes.INTERNAL_SERVER_ERROR,
            expect.any(Error)
        );   

        logSpy.mockRestore();
    });

    it('deleteById error: PK not found', async () => {
        const id: bigint = BigInt(5);
        const logSpy = jest.spyOn(logger, 'logError').mockImplementation(() => {});

        (Status.destroy as jest.Mock).mockRejectedValue(new Error(genericError));

        const result = await statusRepository.deleteById(id);

        expect(result.success).toBe(false);
        if(!result.success) {
            expect(result.error).toEqual(MESSAGES.ERRORS.STATUS_REPOSITORY.DELETE);
        }
        expect(logSpy).toHaveBeenCalledWith(
            "deleteById",
            StatusCodes.INTERNAL_SERVER_ERROR,
            expect.any(Error)
        );   

        logSpy.mockRestore();
    });
});
