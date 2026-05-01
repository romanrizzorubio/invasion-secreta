import { resetService } from '../../src/data/services/reset';
import { initService } from '../../src/data/services/init';
import { loadService } from '../../src/data/services/load';
import { post, get } from '../../src/data/core/api';

jest.mock('../../src/data/core/api');

describe('Services Integration Tests', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('resetService', () => {
    it('should call reset endpoint and return parsed data', async () => {
      const mockApiResponse = {
        tables: [],
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

      (post as jest.Mock).mockResolvedValue(mockApiResponse);

      const result = await resetService();

      expect(post).toHaveBeenCalledWith(expect.any(String));
      expect(result.phase).toBe('INIT');
      expect(result.tables).toEqual([]);
    });

    it('should handle reset service errors', async () => {
      (post as jest.Mock).mockRejectedValue(new Error('Network error'));

      await expect(resetService()).rejects.toThrow('Network error');
    });
  });

  describe('initService', () => {
    it('should call init endpoint with end date', async () => {
      const endDate = new Date('2026-12-31');
      const mockApiResponse = {
        tables: [],
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

      (post as jest.Mock).mockResolvedValue(mockApiResponse);

      await initService(endDate);

      expect(post).toHaveBeenCalledWith(expect.any(String), {
        end: expect.any(Number),
      });
    });

    it('should handle init service errors', async () => {
      const endDate = new Date('2026-12-31');
      (post as jest.Mock).mockRejectedValue(new Error('Invalid date'));

      await expect(initService(endDate)).rejects.toThrow('Invalid date');
    });
  });

  describe('loadService', () => {
    it('should call load endpoint with table id', async () => {
      const mockApiResponse = {
        tables: [
          {
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
          },
        ],
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

      (get as jest.Mock).mockResolvedValue(mockApiResponse);

      const result = await loadService(1);

      expect(get).toHaveBeenCalled();
      expect(result.phase).toBe('PLAYING');
      expect(result.tables).toHaveLength(1);
    });

    it('should load all tables when no id provided', async () => {
      const mockApiResponse = {
        tables: [],
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

      (get as jest.Mock).mockResolvedValue(mockApiResponse);

      const result = await loadService(-1);

      expect(get).toHaveBeenCalled();
      expect(result.tables).toEqual([]);
    });
  });
});
