import { advanceService } from '../../../../src/data/services/advance';
import { post } from '../../../../src/data/core/api';

jest.mock('../../../../src/data/core/api');

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

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should call post with correct endpoint', async () => {
    (post as jest.Mock).mockResolvedValueOnce(mockDataService);

    await advanceService();

    expect(post).toHaveBeenCalledWith('/advance');
  });

  it('should parse and return the response data', async () => {
    (post as jest.Mock).mockResolvedValueOnce(mockDataService);

    const result = await advanceService();

    expect(result.end).toBeInstanceOf(Date);
    expect(result.phase).toBe('PLAYING');
    expect(result.superLife).toBe(100);
    expect(result.superPlan).toBe(0);
    expect(result.uatu).toBe(false);
    expect(result.aron).toBe(false);
  });

  it('should handle errors', async () => {
    const error = new Error('Network error');
    (post as jest.Mock).mockRejectedValueOnce(error);

    await expect(advanceService()).rejects.toThrow('Network error');
  });
});
