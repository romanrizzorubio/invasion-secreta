import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import AppRouter from '../../../src/routes/AppRouter';
import { theme } from '../../../src/styles/theme';
import { PhaseDict } from '../../../src/types/Dicts';

jest.mock('../../../src/pages/HomePage/HomePage', () => ({
  __esModule: true,
  default: () => <div data-testid="home-page">Home Page</div>,
}));

jest.mock('../../../src/pages/InitPage/InitPage', () => ({
  __esModule: true,
  default: () => <div data-testid="init-page">Init Page</div>,
}));

jest.mock('../../../src/pages/TablePage/TablePage', () => ({
  __esModule: true,
  default: () => <div data-testid="table-page">Table Page</div>,
}));

jest.mock('../../../src/components/Layout/Layout', () => ({
  __esModule: true,
  default: () => {
    const { Outlet } = require('react-router-dom');
    return (
      <div data-testid="layout">
        <Outlet />
      </div>
    );
  },
}));

jest.mock('../../../src/data/services/load', () => ({
  loadService: jest.fn().mockResolvedValue({
    tables: [],
    phase: 0,
    superLife: 0,
    superPlan: 0,
    spiderWomanTotal: 0,
    ship: 0,
    enemy: 0,
    exposed: 0,
  }),
}));

jest.mock('../../../src/data/sockets/load', () => ({
  loadSocket: jest.fn(() => () => {}),
}));

jest.mock('../../../src/contexts/GameContext', () => {
  const actual = jest.requireActual('../../../src/contexts/GameContext');
  return {
    ...actual,
    useGameContext: () => ({
      data: {
        tables: [],
        phase: 0,
        superLife: 0,
        superPlan: 0,
        spiderWomanTotal: 0,
        ship: 0,
        enemy: 0,
        exposed: 0,
      },
      setData: jest.fn(),
      currentTable: -1,
      setCurrentTable: jest.fn(),
    }),
  };
});

const renderWithRouter = (initialRoute = '/') => {
  return render(
    <ThemeProvider theme={theme}>
      <MemoryRouter initialEntries={[initialRoute]}>
        <AppRouter />
      </MemoryRouter>
    </ThemeProvider>,
  );
};

describe('AppRouter', () => {
  it('should render HomePage at root path', () => {
    renderWithRouter('/');
    expect(screen.getByTestId('layout')).toBeInTheDocument();
    expect(screen.getByTestId('home-page')).toBeInTheDocument();
  });

  it('should render InitPage at /init path', () => {
    renderWithRouter('/init');
    expect(screen.getByTestId('layout')).toBeInTheDocument();
    expect(screen.getByTestId('init-page')).toBeInTheDocument();
  });

  it('should render TablePage at /table path', () => {
    renderWithRouter('/table');
    expect(screen.getByTestId('layout')).toBeInTheDocument();
    expect(screen.getByTestId('table-page')).toBeInTheDocument();
  });

  it('should wrap all routes with Layout', () => {
    renderWithRouter('/');
    expect(screen.getByTestId('layout')).toBeInTheDocument();
  });
});
