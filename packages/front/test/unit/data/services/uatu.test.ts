import { uatuService } from '../../../../src/data/services/uatu';
import { post } from '../../../../src/data/core/api';

jest.mock('../../../../src/data/core/api');

describe('uatuService', () => {
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

    await uatuService(true, 1);

    expect(post).toHaveBeenCalledWith('/uatu', {
      next: true,
      table: 1,
    });
  });

  it('should call post with next=false', async () => {
    (post as jest.Mock).mockResolvedValueOnce(mockDataService);

    await uatuService(false, 2);

    expect(post).toHaveBeenCalledWith('/uatu', {
      next: false,
      table: 2,
    });
  });

  it('should parse and return the response data', async () => {
    (post as jest.Mock).mockResolvedValueOnce(mockDataService);

    const result = await uatuService(true, 1);

    expect(result.end).toBeInstanceOf(Date);
    expect(result.phase).toBe('PLAYING');
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
    const error = new Error('Uatu error');
    (post as jest.Mock).mockRejectedValueOnce(error);

    await expect(uatuService(true, 1)).rejects.toThrow('Uatu error');
  });
});
