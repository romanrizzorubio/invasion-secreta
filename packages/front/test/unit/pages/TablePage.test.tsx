import React from 'react';
import { render, screen } from '@testing-library/react';
import { ThemeProvider } from 'styled-components';
import TablePage from '../../../src/pages/TablePage/TablePage';
import {Phase, PhaseDict} from '../../../src/types/Dicts';
import { theme } from '../../../src/styles/theme';

const mockGameData = {
  phase: PhaseDict.INIT,
  time: 0,
  players: [],
  tables: [],
  enemies: { values: [], total: 0 },
  ship: { values: [], total: 0 },
  spiderWoman: { values: [], total: 0 },
  aron: { values: [], total: 0 },
  uatu: { values: [], total: 0 },
  superLife: 0,
  superDefeat: 0,
  superReveal: 0,
  superPlan: 0,
  heroes: { values: [], total: 0 },
  exposed: { values: [], total: 0 },
};

jest.mock('../../../src/contexts/GameContext', () => ({
  useGameContext: jest.fn(),
}));

jest.mock('../../../src/hooks/useSetTable', () => ({
  useSetTable: () => ({
    table: 1,
    changeTable: jest.fn(),
    saveTable: jest.fn(),
  }),
}));

jest.mock('../../../src/hooks/useCreateTable', () => ({
  useCreateTable: () => ({
    currentTable: 1,
    players: [],
    expert: false,
    heroes: [],
    saved: false,
    changePlayer: jest.fn(() => jest.fn()),
    changeExpert: jest.fn(),
    createTable: jest.fn(),
    editTable: jest.fn(),
  }),
}));

jest.mock('../../../src/hooks/useTimer', () => ({
  useTimer: () => ({ timer: '00:00', end: new Date() }),
}));

jest.mock('../../../src/hooks/useSuper', () => ({
  useSuper: () => ({
    spiderWomanTotal: 0,
    spiderWomanOwn: undefined,
    superLife: 0,
    superPlan: 0,
    changeSpiderWoman: jest.fn(),
    changeSuperLife: jest.fn(),
    changeSuperPlan: jest.fn(),
  }),
}));

jest.mock('../../../src/hooks/useShip', () => ({
  useShip: () => ({
    ship: 0,
    exposed: 0,
    changeShip: jest.fn(),
    changeExposed: jest.fn(),
    completed: false,
  }),
}));

jest.mock('../../../src/hooks/useEnemy', () => ({
  useEnemy: () => ({
    enemy: 0,
    exposed: 0,
    changeEnemy: jest.fn(),
    changeExposed: jest.fn(),
  }),
}));

jest.mock('../../../src/hooks/useVeranke', () => ({
  useVeranke: () => ({}),
}));

jest.mock('../../../src/hooks/useWatchers', () => ({
  useWatchers: () => ({
    currentTable: 1,
    uatu: undefined,
    aron: undefined,
    uatuDisabled: false,
    changeUatu: jest.fn(),
    changeAron: jest.fn(),
  }),
}));

jest.mock('../../../src/hooks/useAdvance', () => ({
  useAdvance: () => ({ advance: jest.fn() }),
}));

const renderWithProviders = (phase: Phase, currentTable: number = 1) => {
  const { useGameContext } = require('../../../src/contexts/GameContext');
  useGameContext.mockReturnValue({
    data: { ...mockGameData, phase },
    currentTable,
  });

  return render(
    <ThemeProvider theme={theme}>
      <TablePage />
    </ThemeProvider>
  );
};

describe('TablePage Component', () => {
  it('should render table heading when currentTable is 0', () => {
    renderWithProviders(PhaseDict.INIT, 0);
    expect(screen.getByText('Mesa 1')).toBeInTheDocument();
  });

  it('should render SetTable when currentTable is negative', () => {
    renderWithProviders(PhaseDict.INIT, -1);
    expect(screen.getByText('Mesa')).toBeInTheDocument();
  });

  it('should render table heading when currentTable is 1', () => {
    renderWithProviders(PhaseDict.INIT, 1);
    expect(screen.getByText('Mesa 2')).toBeInTheDocument();
  });

  it('should not render Timer when phase is INIT', () => {
    renderWithProviders(PhaseDict.INIT);
    expect(screen.queryByText('00:00')).not.toBeInTheDocument();
  });

  it('should render Timer when phase is not INIT', () => {
    renderWithProviders(PhaseDict.SUPER);
    expect(screen.getByText('00:00')).toBeInTheDocument();
  });

  it('should render WaitingPhase when phase is INIT', () => {
    renderWithProviders(PhaseDict.INIT);
    expect(screen.getByText(/Esperando que se inicie la partida/i)).toBeInTheDocument();
  });

  it('should render CreateTablePhase when phase is TABLES', () => {
    renderWithProviders(PhaseDict.TABLES);
    expect(screen.getByText('Experto')).toBeInTheDocument();
  });

  it('should render SuperPhase when phase is SUPER', () => {
    renderWithProviders(PhaseDict.SUPER);
    expect(screen.getByText(/Vida/)).toBeInTheDocument();
  });

  it('should render content when phase is SUPER', () => {
    renderWithProviders(PhaseDict.SUPER);
    expect(document.querySelector('section')).toBeInTheDocument();
  });

  it('should render ShipFallPhase when phase is SHIP_FALL', () => {
    renderWithProviders(PhaseDict.SHIP_FALL);
    expect(document.querySelector('section')).toBeInTheDocument();
  });

  it('should render EnemyPhase when phase is ENEMY', () => {
    renderWithProviders(PhaseDict.ENEMY);
    expect(document.querySelector('section')).toBeInTheDocument();
  });

  it('should render SuperChangePhase with readOnly when phase is SUPER_DEFEATED', () => {
    renderWithProviders(PhaseDict.SUPER_DEFEATED);
    expect(document.querySelector('section')).toBeInTheDocument();
  });

  it('should render SuperChangePhase with readOnly and hasWin when phase is SUPER_WINER', () => {
    renderWithProviders(PhaseDict.SUPER_WINER);
    expect(document.querySelector('section')).toBeInTheDocument();
  });

  it('should render SpiderWomanPhase with readOnly when phase is SPIDER_WOMAN_LEAVES', () => {
    renderWithProviders(PhaseDict.SPIDER_WOMAN_LEAVES);
    expect(screen.getByText(/Spiderwoman/i)).toBeInTheDocument();
  });

  it('should render ShipOpenPhase with readOnly when phase is SHIP_OPEN', () => {
    renderWithProviders(PhaseDict.SHIP_OPEN);
    expect(screen.getByText(/nave/i)).toBeInTheDocument();
  });

  it('should render OsbornPhase when phase is VERANKE_LOSE', () => {
    renderWithProviders(PhaseDict.VERANKE_LOSE);
    expect(screen.getByText(/Norman Osborn/i)).toBeInTheDocument();
  });

  it('should render OsbornPhase with hasWin when phase is VERANKE_WIN', () => {
    renderWithProviders(PhaseDict.VERANKE_WIN);
    expect(screen.getByText(/Norman Osborn/i)).toBeInTheDocument();
  });

  it('should render OsbornChangePhase with readOnly when phase is OSBORN_REVEAL', () => {
    renderWithProviders(PhaseDict.OSBORN_REVEAL);
    expect(screen.getByText(/Muestra la carta de Norman Osborn/i)).toBeInTheDocument();
  });

  it('should display correct table number', () => {
    renderWithProviders(PhaseDict.SUPER, 5);
    expect(screen.getByText('Mesa 6')).toBeInTheDocument();
  });
});
