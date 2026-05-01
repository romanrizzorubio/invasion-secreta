import { loadService } from '../../../../src/data/services/load';
import { get } from '../../../../src/data/core/api';

jest.mock('../../../../src/data/core/api');

describe('loadService', () => {
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

  it('should call get with correct endpoint', async () => {
    (get as jest.Mock).mockResolvedValueOnce(mockDataService);

    await loadService(1);

    expect(get).toHaveBeenCalledWith('/data');
  });

  it('should parse and return the response data', async () => {
    (get as jest.Mock).mockResolvedValueOnce(mockDataService);

    const result = await loadService(1);

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
    const error = new Error('Load error');
    (get as jest.Mock).mockRejectedValueOnce(error);

    await expect(loadService(1)).rejects.toThrow('Load error');
  });
});
