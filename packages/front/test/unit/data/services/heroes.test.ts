import { heroesService } from '../../../../src/data/services/heroes';
import { get } from '../../../../src/data/core/api';

jest.mock('../../../../src/data/core/api');

describe('heroesService', () => {
  const mockHeroesFromApi = [
    { id: 'hero1', name: 'Hero 1' },
    { id: 'hero2', name: 'Hero 2' },
    { id: 'hero3', name: 'Hero 3' },
  ];

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should call get with correct endpoint', async () => {
    (get as jest.Mock).mockResolvedValueOnce(mockHeroesFromApi);

    await heroesService();

    expect(get).toHaveBeenCalledWith('/heroes');
  });

  it('should parse and return options', async () => {
    (get as jest.Mock).mockResolvedValueOnce(mockHeroesFromApi);

    const result = await heroesService();

    expect(result).toEqual([
      { value: 'hero1', label: 'Hero 1' },
      { value: 'hero2', label: 'Hero 2' },
      { value: 'hero3', label: 'Hero 3' },
    ]);
  });

  it('should handle empty heroes list', async () => {
    (get as jest.Mock).mockResolvedValueOnce([]);

    const result = await heroesService();

    expect(result).toEqual([]);
  });

  it('should handle errors', async () => {
    const error = new Error('Network error');
    (get as jest.Mock).mockRejectedValueOnce(error);

    await expect(heroesService()).rejects.toThrow('Network error');
  });
});
