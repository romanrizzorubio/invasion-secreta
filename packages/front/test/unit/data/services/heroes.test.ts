import { heroesService } from '../../../../src/data/services/heroes';
import { get } from '../../../../src/data/core/api';
import { parseOptions } from '../../../../src/utils/parsers';

jest.mock('../../../../src/data/core/api');
jest.mock('../../../../src/utils/parsers');

describe('heroesService', () => {
  const mockOptionService = [
    { value: 'hero1', label: 'Hero 1' },
    { value: 'hero2', label: 'Hero 2' },
    { value: 'hero3', label: 'Hero 3' },
  ];

  const mockParsedOptions = [
    { value: 'hero1', label: 'Hero 1' },
    { value: 'hero2', label: 'Hero 2' },
    { value: 'hero3', label: 'Hero 3' },
  ];

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should call get with correct endpoint', async () => {
    (get as jest.Mock).mockResolvedValueOnce(mockOptionService);
    (parseOptions as jest.Mock).mockReturnValueOnce(mockParsedOptions);

    await heroesService();

    expect(get).toHaveBeenCalledWith('/heroes');
  });

  it('should parse the response data', async () => {
    (get as jest.Mock).mockResolvedValueOnce(mockOptionService);
    (parseOptions as jest.Mock).mockReturnValueOnce(mockParsedOptions);

    await heroesService();

    expect(parseOptions).toHaveBeenCalledWith(mockOptionService);
  });

  it('should return parsed options', async () => {
    (get as jest.Mock).mockResolvedValueOnce(mockOptionService);
    (parseOptions as jest.Mock).mockReturnValueOnce(mockParsedOptions);

    const result = await heroesService();

    expect(result).toEqual(mockParsedOptions);
  });

  it('should handle empty heroes list', async () => {
    (get as jest.Mock).mockResolvedValueOnce([]);
    (parseOptions as jest.Mock).mockReturnValueOnce([]);

    const result = await heroesService();

    expect(result).toEqual([]);
  });

  it('should handle errors', async () => {
    const error = new Error('Network error');
    (get as jest.Mock).mockRejectedValueOnce(error);

    await expect(heroesService()).rejects.toThrow('Network error');
  });
});
