import { superLifeService } from '../../../../src/data/services/superLife';
import { post } from '../../../../src/data/core/api';

jest.mock('../../../../src/data/core/api');

describe('superLifeService', () => {
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

  it('should call post with correct endpoint and negated value', async () => {
    (post as jest.Mock).mockResolvedValueOnce(mockDataService);

    await superLifeService(5, 1);

    expect(post).toHaveBeenCalledWith('/super-life', {
      value: -5,
      table: 1,
    });
  });

  it('should negate positive values', async () => {
    (post as jest.Mock).mockResolvedValueOnce(mockDataService);

    await superLifeService(10, 2);

    expect(post).toHaveBeenCalledWith('/super-life', {
      value: -10,
      table: 2,
    });
  });

  it('should handle negative values correctly', async () => {
    (post as jest.Mock).mockResolvedValueOnce(mockDataService);

    await superLifeService(-3, 1);

    expect(post).toHaveBeenCalledWith('/super-life', {
      value: 3,
      table: 1,
    });
  });

  it('should parse and return the response data', async () => {
    (post as jest.Mock).mockResolvedValueOnce(mockDataService);

    const result = await superLifeService(5, 1);

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
    const error = new Error('Super Life error');
    (post as jest.Mock).mockRejectedValueOnce(error);

    await expect(superLifeService(5, 1)).rejects.toThrow('Super Life error');
  });
});
