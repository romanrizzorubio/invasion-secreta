import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { ThemeProvider } from 'styled-components';
import { CreateTablePhase } from '../../../src/phases/CreateTablePhase/CreateTablePhase';
import { useCreateTable } from '../../../src/hooks/useCreateTable';
import { theme } from '../../../src/styles/theme';

jest.mock('../../../src/hooks/useCreateTable');
jest.mock('../../../src/components/CreatePlayer/CreatePlayer', () => ({
  CreatePlayer: ({ name }: { name: string }) => <div>{name}</div>,
}));
jest.mock('../../../src/components/TablePlayers/TablePlayers', () => ({
  TablePlayers: () => <div>Table Players</div>,
}));

const renderWithTheme = (component: React.ReactElement) => {
  return render(<ThemeProvider theme={theme}>{component}</ThemeProvider>);
};

describe('CreateTablePhase', () => {
  const mockChangePlayer = jest.fn(() => jest.fn());
  const mockChangeExpert = jest.fn();
  const mockCreateTable = jest.fn();
  const mockEditTable = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should render in edit mode when table is saved', () => {
    (useCreateTable as jest.Mock).mockReturnValue({
      currentTable: 0,
      players: [{ hero: 'IronMan' }],
      expert: false,
      heroes: [],
      saved: true,
      changePlayer: mockChangePlayer,
      changeExpert: mockChangeExpert,
      createTable: mockCreateTable,
      editTable: mockEditTable,
    });

    renderWithTheme(<CreateTablePhase />);
    expect(screen.getByText('Editar')).toBeInTheDocument();
    expect(screen.getByText('Table Players')).toBeInTheDocument();
  });

  it('should call editTable when Editar button is clicked', () => {
    (useCreateTable as jest.Mock).mockReturnValue({
      currentTable: 0,
      players: [{ hero: 'IronMan' }],
      expert: false,
      heroes: [],
      saved: true,
      changePlayer: mockChangePlayer,
      changeExpert: mockChangeExpert,
      createTable: mockCreateTable,
      editTable: mockEditTable,
    });

    renderWithTheme(<CreateTablePhase />);
    const button = screen.getByText('Editar');
    fireEvent.click(button);
    expect(mockEditTable).toHaveBeenCalledTimes(1);
  });

  it('should render in create mode when table is not saved', () => {
    (useCreateTable as jest.Mock).mockReturnValue({
      currentTable: 0,
      players: [{ hero: 'IronMan' }],
      expert: false,
      heroes: [],
      saved: false,
      changePlayer: mockChangePlayer,
      changeExpert: mockChangeExpert,
      createTable: mockCreateTable,
      editTable: mockEditTable,
    });

    renderWithTheme(<CreateTablePhase />);
    expect(screen.getByText('Experto')).toBeInTheDocument();
    expect(screen.getByText('Iniciar')).toBeInTheDocument();
    expect(screen.getByText('Jugador 1')).toBeInTheDocument();
    expect(screen.getByText('Jugador 2')).toBeInTheDocument();
  });

  it('should call createTable when Iniciar button is clicked', () => {
    (useCreateTable as jest.Mock).mockReturnValue({
      currentTable: 0,
      players: [{ hero: 'IronMan' }],
      expert: false,
      heroes: [],
      saved: false,
      changePlayer: mockChangePlayer,
      changeExpert: mockChangeExpert,
      createTable: mockCreateTable,
      editTable: mockEditTable,
    });

    renderWithTheme(<CreateTablePhase />);
    const button = screen.getByText('Iniciar');
    fireEvent.click(button);
    expect(mockCreateTable).toHaveBeenCalledTimes(1);
  });

  it('should disable Iniciar button when no players are present', () => {
    (useCreateTable as jest.Mock).mockReturnValue({
      currentTable: 0,
      players: [],
      expert: false,
      heroes: [],
      saved: false,
      changePlayer: mockChangePlayer,
      changeExpert: mockChangeExpert,
      createTable: mockCreateTable,
      editTable: mockEditTable,
    });

    renderWithTheme(<CreateTablePhase />);
    const button = screen.getByText('Iniciar');
    expect(button).toBeDisabled();
  });

  it('should render 4 player slots when 3 players exist', () => {
    (useCreateTable as jest.Mock).mockReturnValue({
      currentTable: 0,
      players: [{ hero: 'IronMan' }, { hero: 'SpiderMan' }, { hero: 'Hulk' }],
      expert: false,
      heroes: [],
      saved: false,
      changePlayer: mockChangePlayer,
      changeExpert: mockChangeExpert,
      createTable: mockCreateTable,
      editTable: mockEditTable,
    });

    renderWithTheme(<CreateTablePhase />);
    expect(screen.getByText('Jugador 1')).toBeInTheDocument();
    expect(screen.getByText('Jugador 2')).toBeInTheDocument();
    expect(screen.getByText('Jugador 3')).toBeInTheDocument();
    expect(screen.getByText('Jugador 4')).toBeInTheDocument();
  });
});
