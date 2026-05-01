import { resetService } from '../../../../src/data/services/reset';
import { post } from '../../../../src/data/core/api';

jest.mock('../../../../src/data/core/api');

describe('resetService', () => {
  const mockDataService = {
    tables: [{
      players: [],
      expert: false,
      saved: false,
      completeVeranke: false,
      spiderWoman: 0,
      superDamage: 0,
      superThreat: 0,
      ship: 0,
      enemy: 0,
      exposed: 0,
    }],
    end: '2024-01-01T00:00:00.000Z',
    phase: 'INIT',
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

    await resetService();

    expect(post).toHaveBeenCalledWith('/reset');
  });

  it('should parse and return the response data', async () => {
    (post as jest.Mock).mockResolvedValueOnce(mockDataService);

    const result = await resetService();

    expect(result.end).toBeInstanceOf(Date);
    expect(result.phase).toBe('INIT');
    expect(result.superLife).toBe(100);
    expect(result.superPlan).toBe(0);
    expect(result.spiderWomanTotal).toBe(100);
    expect(result.ship).toBe(100);
    expect(result.enemy).toBe(100);
    expect(result.exposed).toBe(0);
    expect(result.uatu).toBe(false);
    expect(result.aron).toBe(false);
  });

  it('should handle errors', async () => {
    const error = new Error('Reset error');
    (post as jest.Mock).mockRejectedValueOnce(error);

    await expect(resetService()).rejects.toThrow('Reset error');
  });
});
