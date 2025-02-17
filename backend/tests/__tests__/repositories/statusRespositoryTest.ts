import { StatusRepository } from '../../../src/app/repositories/statusRepository';
import { Status } from '../../../src/models/Status';
import { Logger } from '../../../src/utils/logger';
import { MESSAGES } from '../../../src/utils/messages';
import { StatusMock } from '../../mocks/StatusMock';

jest.mock('../../../src/models/Status', () => {
    return {
        __esModule: true,
        Status: {
            create: jest.fn(),
            findAll: jest.fn(),
            findOne: jest.fn(),
            destroy: jest.fn(),
        },
    };
});

describe('StatusRepository', () => {
    let statusRepository: StatusRepository;
    let statusMock: StatusMock;    
    let logger: Logger;

    beforeEach(() => {
        logger = new Logger();
        statusRepository = new StatusRepository(logger);
        statusMock = new StatusMock();
        
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('getAllStatus: should return all status records.', async () => {        

        (Status.findAll as jest.Mock).mockImplementation(statusMock.mockFindAll());

        const result = await statusRepository.getAllStatus();

        expect(result).toEqual(statusMock.getStatusMockDataList());        
    });

    it('getAllStatus error: should capture error and return a Error instance.', async () => {
        jest.spyOn(Status, "findAll").mockRejectedValue(new Error(MESSAGES.ERRORS.STATUS_REPOSITORY.GET_ALL_STATUS));

    });

});
