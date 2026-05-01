import { advanceService } from '../../../../src/data/services/advance';
import { post } from '../../../../src/data/core/api';
import { parseData } from '../../../../src/utils/parsers';

jest.mock('../../../../src/data/core/api');
jest.mock('../../../../src/utils/parsers');

describe('advanceService', () => {
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

  it('should call post with correct endpoint', async () => {
    (post as jest.Mock).mockResolvedValueOnce(mockDataService);
    (parseData as jest.Mock).mockReturnValueOnce(mockParsedData);

    await advanceService();

    expect(post).toHaveBeenCalledWith('/advance');
  });

  it('should parse the response data', async () => {
    (post as jest.Mock).mockResolvedValueOnce(mockDataService);
    (parseData as jest.Mock).mockReturnValueOnce(mockParsedData);

    await advanceService();

    expect(parseData).toHaveBeenCalledWith(mockDataService);
  });

  it('should return parsed data', async () => {
    (post as jest.Mock).mockResolvedValueOnce(mockDataService);
    (parseData as jest.Mock).mockReturnValueOnce(mockParsedData);

    const result = await advanceService();

    expect(result).toEqual(mockParsedData);
  });

  it('should handle errors', async () => {
    const error = new Error('Network error');
    (post as jest.Mock).mockRejectedValueOnce(error);

    await expect(advanceService()).rejects.toThrow('Network error');
  });
});
