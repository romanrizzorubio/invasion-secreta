import React from 'react';
import { renderHook, waitFor } from '@testing-library/react';
import { GameProvider, useGameContext } from '../../../src/contexts/GameContext';
import { loadService } from '../../../src/data/services/load';
import { loadSocket } from '../../../src/data/sockets/load';

jest.mock('../../../src/data/services/load');
jest.mock('../../../src/data/sockets/load');

describe('GameContext', () => {
  const mockLoadData = {
    tables: [],
    phase: 'INIT',
    superLife: 0,
    superPlan: 0,
    spiderWomanTotal: 0,
    ship: 0,
    enemy: 0,
    exposed: 0,
  };

  beforeEach(() => {
    jest.clearAllMocks();
    (loadService as jest.Mock).mockResolvedValue(mockLoadData);
    (loadSocket as jest.Mock).mockReturnValue(() => {});
  });

  it('should throw error when useGameContext is used outside provider', () => {
    const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation();

    expect(() => {
      renderHook(() => useGameContext());
    }).toThrow('useGameContext must be used within a GameProvider');

    consoleErrorSpy.mockRestore();
  });

  it('should provide game context values', () => {
    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <GameProvider>{children}</GameProvider>
    );

    const { result } = renderHook(() => useGameContext(), { wrapper });

    expect(result.current.data).toBeDefined();
    expect(result.current.setData).toBeDefined();
    expect(result.current.currentTable).toBe(-1);
    expect(result.current.setCurrentTable).toBeDefined();
  });

  it('should load data on mount', async () => {
    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <GameProvider>{children}</GameProvider>
    );

    renderHook(() => useGameContext(), { wrapper });

    await waitFor(() => {
      expect(loadService).toHaveBeenCalledWith(-1);
    });
  });

  it('should setup socket connection', async () => {
    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <GameProvider>{children}</GameProvider>
    );

    renderHook(() => useGameContext(), { wrapper });

    await waitFor(() => {
      expect(loadSocket).toHaveBeenCalled();
    });
  });

  it('should handle load service errors', async () => {
    const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation();
    (loadService as jest.Mock).mockRejectedValue(new Error('Load failed'));

    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <GameProvider>{children}</GameProvider>
    );

    renderHook(() => useGameContext(), { wrapper });

    await waitFor(() => {
      expect(consoleErrorSpy).toHaveBeenCalledWith(
        'Error al cargar los datos',
        expect.any(Error)
      );
    });

    consoleErrorSpy.mockRestore();
  });
});
