import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { ThemeProvider } from 'styled-components';
import { WaitingTablesPhase } from '../../../src/phases/WaitingTablesPhase/WaitingTablesPhase';
import { useInit } from '../../../src/hooks/useInit';
import { useGameContext } from '../../../src/contexts/GameContext';
import { theme } from '../../../src/styles/theme';

jest.mock('../../../src/hooks/useInit');
jest.mock('../../../src/contexts/GameContext');
jest.mock('../../../src/components/TablePlayers/TablePlayers', () => ({
  TablePlayers: ({ currentTable }: { currentTable: number }) => <div>Table {currentTable}</div>,
}));

const renderWithTheme = (component: React.ReactElement) => {
  return render(<ThemeProvider theme={theme}>{component}</ThemeProvider>);
};

describe('WaitingTablesPhase', () => {
  const mockStartTables = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    (useInit as jest.Mock).mockReturnValue({
      startTables: mockStartTables,
    });
  });

  it('should render Iniciar button', () => {
    (useGameContext as jest.Mock).mockReturnValue({
      data: { tables: [] },
    });

    renderWithTheme(<WaitingTablesPhase />);
    expect(screen.getByText('Iniciar')).toBeInTheDocument();
  });

  it('should disable Iniciar button when no tables are present', () => {
    (useGameContext as jest.Mock).mockReturnValue({
      data: { tables: [] },
    });

    renderWithTheme(<WaitingTablesPhase />);
    const button = screen.getByText('Iniciar');
    expect(button).toBeDisabled();
  });

  it('should enable Iniciar button when tables are present', () => {
    (useGameContext as jest.Mock).mockReturnValue({
      data: {
        tables: [
          { players: [{ hero: 'IronMan' }], expert: false },
        ],
      },
    });

    renderWithTheme(<WaitingTablesPhase />);
    const button = screen.getByText('Iniciar');
    expect(button).not.toBeDisabled();
  });

  it('should call startTables when Iniciar button is clicked', () => {
    (useGameContext as jest.Mock).mockReturnValue({
      data: {
        tables: [
          { players: [{ hero: 'IronMan' }], expert: false },
        ],
      },
    });

    renderWithTheme(<WaitingTablesPhase />);
    const button = screen.getByText('Iniciar');
    fireEvent.click(button);
    expect(mockStartTables).toHaveBeenCalledTimes(1);
  });

  it('should render tables when present', () => {
    (useGameContext as jest.Mock).mockReturnValue({
      data: {
        tables: [
          { players: [{ hero: 'IronMan' }], expert: false },
          { players: [{ hero: 'SpiderMan' }], expert: true },
        ],
      },
    });

    renderWithTheme(<WaitingTablesPhase />);
    expect(screen.getByText('Table 0')).toBeInTheDocument();
    expect(screen.getByText('Table 1')).toBeInTheDocument();
  });

  it('should not render null tables', () => {
    (useGameContext as jest.Mock).mockReturnValue({
      data: {
        tables: [
          { players: [{ hero: 'IronMan' }], expert: false },
          null,
          { players: [{ hero: 'SpiderMan' }], expert: true },
        ],
      },
    });

    renderWithTheme(<WaitingTablesPhase />);
    expect(screen.getByText('Table 0')).toBeInTheDocument();
    expect(screen.getByText('Table 2')).toBeInTheDocument();
  });
});
