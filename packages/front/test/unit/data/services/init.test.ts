import { initService } from '../../../../src/data/services/init';
import { post } from '../../../../src/data/core/api';
import { parseData } from '../../../../src/utils/parsers';

jest.mock('../../../../src/data/core/api');
jest.mock('../../../../src/utils/parsers');

describe('initService', () => {
  const mockDataService = {
    tables: [],
    end: '2024-01-01T00:00:00.000Z',
    phase: 'PLAYING',
    superLifeMax: 10,
    superPlanIni: 0,
    superPlanMax: 10,
    spiderWomanMax: 10,
    shipMax: 15,
    enemyInit: 10,
    exposedMax: 10,
    uatu: false,
    aron: false,
  };

  const mockParsedData = {
    tables: [],
    end: new Date('2024-01-01T00:00:00.000Z'),
    phase: 'PLAYING' as const,
    superLife: 100,
    superPlan: 0,
    spiderWoman: 100,
    ship: 100,
    enemy: 100,
    exposed: 100,
    uatu: false,
    aron: false,
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should call post with correct endpoint and formatted date', async () => {
    (post as jest.Mock).mockResolvedValueOnce(mockDataService);
    (parseData as jest.Mock).mockReturnValueOnce(mockParsedData);

    const endDate = new Date('2024-01-01T15:30:00.000Z');
    await initService(endDate);

    expect(post).toHaveBeenCalledWith('/init', {
      end: expect.any(Number),
    });
  });

  it('should format end date with correct hours and minutes', async () => {
    (post as jest.Mock).mockResolvedValueOnce(mockDataService);
    (parseData as jest.Mock).mockReturnValueOnce(mockParsedData);

    const endDate = new Date('2024-01-01T15:30:00.000Z');
    await initService(endDate);

    const callArgs = (post as jest.Mock).mock.calls[0][1];
    const sentDate = new Date(callArgs.end);

    expect(sentDate.getHours()).toBe(endDate.getHours());
    expect(sentDate.getMinutes()).toBe(endDate.getMinutes());
    expect(sentDate.getSeconds()).toBe(59);
  });

  it('should set seconds to 59', async () => {
    (post as jest.Mock).mockResolvedValueOnce(mockDataService);
    (parseData as jest.Mock).mockReturnValueOnce(mockParsedData);

    const endDate = new Date('2024-01-01T10:20:30.000Z');
    await initService(endDate);

    const callArgs = (post as jest.Mock).mock.calls[0][1];
    const sentDate = new Date(callArgs.end);

    expect(sentDate.getSeconds()).toBe(59);
  });

  it('should parse the response data', async () => {
    (post as jest.Mock).mockResolvedValueOnce(mockDataService);
    (parseData as jest.Mock).mockReturnValueOnce(mockParsedData);

    const endDate = new Date('2024-01-01T15:30:00.000Z');
    await initService(endDate);

    expect(parseData).toHaveBeenCalledWith(mockDataService);
  });

  it('should return parsed data', async () => {
    (post as jest.Mock).mockResolvedValueOnce(mockDataService);
    (parseData as jest.Mock).mockReturnValueOnce(mockParsedData);

    const endDate = new Date('2024-01-01T15:30:00.000Z');
    const result = await initService(endDate);

    expect(result).toEqual(mockParsedData);
  });

  it('should handle errors', async () => {
    const error = new Error('Init error');
    (post as jest.Mock).mockRejectedValueOnce(error);

    const endDate = new Date('2024-01-01T15:30:00.000Z');
    await expect(initService(endDate)).rejects.toThrow('Init error');
  });
});
