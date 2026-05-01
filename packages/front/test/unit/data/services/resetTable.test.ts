import { resetTableService } from '../../../../src/data/services/resetTable';
import { post } from '../../../../src/data/core/api';

jest.mock('../../../../src/data/core/api');

describe('resetTableService', () => {
  const mockTable = {
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
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should call post with correct endpoint and table parameter', async () => {
    (post as jest.Mock).mockResolvedValueOnce(mockTable);

    await resetTableService(1);

    expect(post).toHaveBeenCalledWith('/reset-table', {
      table: 1,
    });
  });

  it('should call post with different table number', async () => {
    (post as jest.Mock).mockResolvedValueOnce(mockTable);

    await resetTableService(5);

    expect(post).toHaveBeenCalledWith('/reset-table', {
      table: 5,
    });
  });

  it('should return table data', async () => {
    (post as jest.Mock).mockResolvedValueOnce(mockTable);

    const result = await resetTableService(1);

    expect(result).toEqual(mockTable);
  });

  it('should handle errors', async () => {
    const error = new Error('Reset table error');
    (post as jest.Mock).mockRejectedValueOnce(error);

    await expect(resetTableService(1)).rejects.toThrow('Reset table error');
  });
});
