import React from 'react';
import { render, waitFor } from '@testing-library/react';
import { GameProvider, useGameContext } from '../../src/contexts/GameContext';
import { loadService } from '../../src/data/services/load';
import { loadSocket } from '../../src/data/sockets/load';

jest.mock('../../src/data/services/load');
jest.mock('../../src/data/sockets/load');

describe('Game Flow Integration Tests', () => {
  const mockInitialData = {
    tables: [],
    phase: 'INIT',
    superLife: 0,
    superPlan: 0,
    spiderWomanTotal: 0,
    ship: 0,
    enemy: 0,
    exposed: 0,
  };

  const mockGameData = {
    tables: [
      {
        id: 1,
        name: 'Table 1',
        players: [
          { id: 1, name: 'Player 1', life: 10 },
          { id: 2, name: 'Player 2', life: 8 },
        ],
      },
    ],
    phase: 'PLAYING',
    superLife: 15,
    superPlan: 10,
    spiderWomanTotal: 5,
    ship: 20,
    enemy: 12,
    exposed: 3,
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should load initial game state', async () => {
    (loadService as jest.Mock).mockResolvedValue(mockInitialData);
    (loadSocket as jest.Mock).mockReturnValue(() => {});

    const TestComponent = () => {
      const { data } = useGameContext();
      return <div data-testid="phase">{data.phase}</div>;
    };

    const { getByTestId } = render(
      <GameProvider>
        <TestComponent />
      </GameProvider>
    );

    await waitFor(() => {
      expect(loadService).toHaveBeenCalledWith(-1);
    });

    await waitFor(() => {
      expect(getByTestId('phase')).toHaveTextContent('INIT');
    });
  });

  it('should update game state when data changes', async () => {
    (loadService as jest.Mock).mockResolvedValue(mockInitialData);
    (loadSocket as jest.Mock).mockReturnValue(() => {});

    const TestComponent = () => {
      const { data, setData } = useGameContext();

      React.useEffect(() => {
        setTimeout(() => {
          setData(mockGameData);
        }, 100);
      }, [setData]);

      return (
        <div>
          <div data-testid="phase">{data.phase}</div>
          <div data-testid="ship">{data.ship}</div>
        </div>
      );
    };

    const { getByTestId } = render(
      <GameProvider>
        <TestComponent />
      </GameProvider>
    );

    await waitFor(() => {
      expect(getByTestId('phase')).toHaveTextContent('PLAYING');
      expect(getByTestId('ship')).toHaveTextContent('20');
    });
  });

  it('should handle table selection', async () => {
    (loadService as jest.Mock).mockResolvedValue(mockGameData);
    (loadSocket as jest.Mock).mockReturnValue(() => {});

    const TestComponent = () => {
      const { currentTable, setCurrentTable } = useGameContext();

      React.useEffect(() => {
        setCurrentTable(1);
      }, [setCurrentTable]);

      return <div data-testid="table">{currentTable}</div>;
    };

    const { getByTestId } = render(
      <GameProvider>
        <TestComponent />
      </GameProvider>
    );

    await waitFor(() => {
      expect(getByTestId('table')).toHaveTextContent('1');
    });
  });

  it('should reset current table when phase is INIT', async () => {
    (loadService as jest.Mock).mockResolvedValue(mockGameData);
    (loadSocket as jest.Mock).mockReturnValue(() => {});

    const TestComponent = () => {
      const { data, setData, currentTable, setCurrentTable } = useGameContext();

      React.useEffect(() => {
        setCurrentTable(2);
        setTimeout(() => {
          setData({ ...data, phase: 'INIT' });
        }, 100);
      }, [setCurrentTable, setData, data]);

      return <div data-testid="table">{currentTable}</div>;
    };

    const { getByTestId } = render(
      <GameProvider>
        <TestComponent />
      </GameProvider>
    );

    await waitFor(
      () => {
        expect(getByTestId('table')).toHaveTextContent('-1');
      },
      { timeout: 3000 }
    );
  });

  it('should establish socket connection on mount', async () => {
    const mockSocketCleanup = jest.fn();
    (loadService as jest.Mock).mockResolvedValue(mockInitialData);
    (loadSocket as jest.Mock).mockReturnValue(mockSocketCleanup);

    const TestComponent = () => {
      return <div>Test</div>;
    };

    const { unmount } = render(
      <GameProvider>
        <TestComponent />
      </GameProvider>
    );

    await waitFor(() => {
      expect(loadSocket).toHaveBeenCalled();
    });

    unmount();

    expect(mockSocketCleanup).toHaveBeenCalled();
  });
});
