import { superPlanService } from '../../../../src/data/services/superPlan';
import { post } from '../../../../src/data/core/api';
import { parseData } from '../../../../src/utils/parsers';

jest.mock('../../../../src/data/core/api');
jest.mock('../../../../src/utils/parsers');

describe('superPlanService', () => {
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

  it('should call post with correct endpoint and parameters', async () => {
    (post as jest.Mock).mockResolvedValueOnce(mockDataService);
    (parseData as jest.Mock).mockReturnValueOnce(mockParsedData);

    await superPlanService(5, 1);

    expect(post).toHaveBeenCalledWith('/super-plan', {
      value: 5,
      table: 1,
    });
  });

  it('should call post with different values', async () => {
    (post as jest.Mock).mockResolvedValueOnce(mockDataService);
    (parseData as jest.Mock).mockReturnValueOnce(mockParsedData);

    await superPlanService(10, 2);

    expect(post).toHaveBeenCalledWith('/super-plan', {
      value: 10,
      table: 2,
    });
  });

  it('should parse the response data with table parameter', async () => {
    (post as jest.Mock).mockResolvedValueOnce(mockDataService);
    (parseData as jest.Mock).mockReturnValueOnce(mockParsedData);

    await superPlanService(5, 3);

    expect(parseData).toHaveBeenCalledWith(mockDataService, 3);
  });

  it('should return parsed data', async () => {
    (post as jest.Mock).mockResolvedValueOnce(mockDataService);
    (parseData as jest.Mock).mockReturnValueOnce(mockParsedData);

    const result = await superPlanService(5, 1);

    expect(result).toEqual(mockParsedData);
  });

  it('should handle negative values', async () => {
    (post as jest.Mock).mockResolvedValueOnce(mockDataService);
    (parseData as jest.Mock).mockReturnValueOnce(mockParsedData);

    await superPlanService(-3, 1);

    expect(post).toHaveBeenCalledWith('/super-plan', {
      value: -3,
      table: 1,
    });
  });

  it('should handle errors', async () => {
    const error = new Error('Super Plan error');
    (post as jest.Mock).mockRejectedValueOnce(error);

    await expect(superPlanService(5, 1)).rejects.toThrow('Super Plan error');
  });
});
