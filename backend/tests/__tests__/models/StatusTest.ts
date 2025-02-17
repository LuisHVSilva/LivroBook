
import { StatusMock } from "../../mocks/StatusMock";
import { Status } from "../../../src/models/Status";
import { MESSAGES } from "../../../src/utils/messages";


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

describe('Status Model', () => {
  let statusMock: StatusMock;

  beforeAll(() => {    
    statusMock = new StatusMock();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('create: should create a new status record.', async () => {
    const newStatusData = {
      id: BigInt(3),
      description: "Pending",
      createdAt: new Date("2025-02-16"),
      updatedAt: new Date("2025-02-16"),
    };
    (Status.create as jest.Mock).mockImplementation(statusMock.mockCreate());

    const result = await Status.create(newStatusData);

    expect(result).toEqual(newStatusData);
    expect(typeof result!.id).toBe("bigint");
    expect(typeof result!.description).toBe("string");
    expect(result!.createdAt).toBeInstanceOf(Date);
    expect(result!.updatedAt).toBeInstanceOf(Date);
    expect(Object.keys(result).length).toEqual(4);
  });

  it('findOne: should return status records id, description, createdAt and updatedAt values.', async () => {
    const statusData = statusMock.getStatusMockDataList()[0]
    const query = { where: { id: statusData.id } };
    (Status.findOne as jest.Mock).mockImplementation(statusMock.mockFindOne());

    const result = await Status.findOne(query);

    expect(result).toEqual(statusData);
  });

  it('findlAll: should return all status records.', async () => {
    (Status.findAll as jest.Mock).mockResolvedValue(statusMock.getStatusMockDataList());
    
    const result = await Status.findAll();
    
    expect(result).toEqual(statusMock.getStatusMockDataList());
  });

  it('destroy: should delete a record.', async () => {
    const statusData = statusMock.getStatusMockDataList()[0]
    const query = { where: { id: statusData.id } };    
    (Status.destroy as jest.Mock).mockResolvedValue(statusMock.mockDelete());    

    const result = Status.destroy(query);    
    
    expect(statusMock.getStatusMockDataList()).not.toContainEqual(
      expect.objectContaining({ id: 1 })
    );        
  })
});

