import { aronService } from '../../../../src/data/services/aron';
import { post } from '../../../../src/data/core/api';

jest.mock('../../../../src/data/core/api');

describe('aronService', () => {
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

  it('should call post with correct endpoint and parameters', async () => {
    (post as jest.Mock).mockResolvedValueOnce(mockDataService);

    await aronService(true, 1);

    expect(post).toHaveBeenCalledWith('/aron', {
      next: true,
      table: 1,
    });
  });

  it('should call post with next=false', async () => {
    (post as jest.Mock).mockResolvedValueOnce(mockDataService);

    await aronService(false, 2);

    expect(post).toHaveBeenCalledWith('/aron', {
      next: false,
      table: 2,
    });
  });

  it('should parse and return the response data', async () => {
    (post as jest.Mock).mockResolvedValueOnce(mockDataService);

    const result = await aronService(true, 1);

    expect(result.end).toBeInstanceOf(Date);
    expect(result.phase).toBe('PLAYING');
    expect(result.aron).toBe(false);
  });

  it('should handle errors', async () => {
    const error = new Error('Network error');
    (post as jest.Mock).mockRejectedValueOnce(error);

    await expect(aronService(true, 1)).rejects.toThrow('Network error');
  });
});
