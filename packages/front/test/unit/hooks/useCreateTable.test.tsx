import { renderHook, act, waitFor } from '@testing-library/react';
import { useCreateTable } from '../../../src/hooks/useCreateTable';
import { heroesService } from '../../../src/data/services/heroes';
import { createTableService } from '../../../src/data/services/createTable';
import { resetTableService } from '../../../src/data/services/resetTable';
import { useGameContext } from '../../../src/contexts/GameContext';

jest.mock('../../../src/data/services/heroes');
jest.mock('../../../src/data/services/createTable');
jest.mock('../../../src/data/services/resetTable');
jest.mock('../../../src/contexts/GameContext');

describe('useCreateTable', () => {
  const mockHeroes = [
    { label: 'Spider-Man', value: 1 },
    { label: 'Iron Man', value: 2 },
  ];

  const mockGameContext = {
    data: {
      tables: [
        {
          players: [{ name: 'Player 1', hero: 1 }],
          expert: true,
          saved: true,
        },
      ],
    },
    currentTable: 0,
  };

  beforeEach(() => {
    jest.clearAllMocks();
    (heroesService as jest.Mock).mockResolvedValue(mockHeroes);
    (useGameContext as jest.Mock).mockReturnValue(mockGameContext);
  });

  it('should load heroes on mount', async () => {
    const { result } = renderHook(() => useCreateTable());

    await waitFor(() => {
      expect(result.current.heroes).toHaveLength(2);
    });

    expect(heroesService).toHaveBeenCalledTimes(1);
    expect(result.current.heroes[0].label).toBe('Iron Man');
    expect(result.current.heroes[1].label).toBe('Spider-Man');
  });

  it('should handle heroes service error', async () => {
    const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation();
    (heroesService as jest.Mock).mockRejectedValue(new Error('Service error'));

    const { result } = renderHook(() => useCreateTable());

    await waitFor(() => {
      expect(consoleErrorSpy).toHaveBeenCalled();
    });

    expect(result.current.heroes).toHaveLength(0);

    consoleErrorSpy.mockRestore();
  });

  it('should change player at specific index', async () => {
    const { result } = renderHook(() => useCreateTable());

    await waitFor(() => {
      expect(result.current.heroes).toHaveLength(2);
    });

    const newPlayer = { name: 'New Player', hero: 2 };

    act(() => {
      result.current.changePlayer(0)(newPlayer);
    });

    expect(result.current.players[0]).toEqual(newPlayer);
  });

  it('should change expert mode', async () => {
    (useGameContext as jest.Mock).mockReturnValue({
      ...mockGameContext,
      currentTable: -1,
    });

    const { result } = renderHook(() => useCreateTable());

    await waitFor(() => {
      expect(result.current.heroes).toHaveLength(2);
    });

    act(() => {
      result.current.changeExpert(true);
    });

    expect(result.current.expert).toBe(true);
  });

  it('should create table successfully', async () => {
    (createTableService as jest.Mock).mockResolvedValue(true);

    const { result } = renderHook(() => useCreateTable());

    let returnValue;
    await act(async () => {
      returnValue = await result.current.createTable();
    });

    expect(createTableService).toHaveBeenCalledWith(
      mockGameContext.currentTable,
      expect.any(Array),
      expect.any(Boolean),
    );
    expect(returnValue).toBe(true);
  });

  it('should handle create table error', async () => {
    const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation();
    (createTableService as jest.Mock).mockRejectedValue(new Error('Create error'));

    const { result } = renderHook(() => useCreateTable());

    let returnValue;
    await act(async () => {
      returnValue = await result.current.createTable();
    });

    expect(returnValue).toBe(false);
    expect(consoleErrorSpy).toHaveBeenCalledWith('Error al crear la mesa', expect.any(Error));

    consoleErrorSpy.mockRestore();
  });

  it('should edit table successfully', async () => {
    (resetTableService as jest.Mock).mockResolvedValue(true);

    const { result } = renderHook(() => useCreateTable());

    let returnValue;
    await act(async () => {
      returnValue = await result.current.editTable();
    });

    expect(resetTableService).toHaveBeenCalledWith(mockGameContext.currentTable);
    expect(returnValue).toBe(true);
  });

  it('should handle edit table error', async () => {
    const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation();
    (resetTableService as jest.Mock).mockRejectedValue(new Error('Reset error'));

    const { result } = renderHook(() => useCreateTable());

    let returnValue;
    await act(async () => {
      returnValue = await result.current.editTable();
    });

    expect(returnValue).toBe(false);
    expect(consoleErrorSpy).toHaveBeenCalledWith('Error al reiniciar la mesa', expect.any(Error));

    consoleErrorSpy.mockRestore();
  });

  it('should load table data when currentTable is set', async () => {
    const { result } = renderHook(() => useCreateTable());

    await waitFor(() => {
      expect(result.current.players).toHaveLength(1);
      expect(result.current.expert).toBe(true);
      expect(result.current.saved).toBe(true);
    });
  });
});
