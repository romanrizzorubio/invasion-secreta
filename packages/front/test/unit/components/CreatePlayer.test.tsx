import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { ThemeProvider } from 'styled-components';
import { CreatePlayer } from '../../../src/components/CreatePlayer/CreatePlayer';
import { Player } from '../../../src/types/Player';
import { Option } from '../../../src/types/Option';
import { theme } from '../../../src/styles/theme';

const renderWithTheme = (component: React.ReactElement) => {
  return render(<ThemeProvider theme={theme}>{component}</ThemeProvider>);
};

describe('CreatePlayer Component', () => {
  const mockHeroes: Option[] = [
    { label: 'Iron Man', value: 'iron-man' },
    { label: 'Spider-Man', value: 'spider-man' },
    { label: 'Captain America', value: 'captain-america' },
  ];

  const mockPlayer: Player = {
    hero: mockHeroes[0],
    life: 20,
    plan: 0,
  };

  const mockOnChangePlayer = jest.fn();

  beforeEach(() => {
    mockOnChangePlayer.mockClear();
  });

  it('should render with player name as label', () => {
    renderWithTheme(
      <CreatePlayer
        name="Jugador 1"
        player={mockPlayer}
        heroes={mockHeroes}
        onChangePlayer={mockOnChangePlayer}
      />
    );
    expect(screen.getByText('Jugador 1')).toBeInTheDocument();
  });

  it('should display current hero value', () => {
    renderWithTheme(
      <CreatePlayer
        name="Jugador 1"
        player={mockPlayer}
        heroes={mockHeroes}
        onChangePlayer={mockOnChangePlayer}
      />
    );
    const select = screen.getByRole('combobox');
    expect(select).toHaveValue('iron-man');
  });

  it('should call onChangePlayer when hero is changed', () => {
    renderWithTheme(
      <CreatePlayer
        name="Jugador 1"
        player={mockPlayer}
        heroes={mockHeroes}
        onChangePlayer={mockOnChangePlayer}
      />
    );

    const select = screen.getByRole('combobox');
    fireEvent.change(select, { target: { value: 'spider-man' } });

    expect(mockOnChangePlayer).toHaveBeenCalledWith({
      ...mockPlayer,
      hero: mockHeroes[1],
    });
  });

  it('should render all hero options', () => {
    renderWithTheme(
      <CreatePlayer
        name="Jugador 1"
        player={mockPlayer}
        heroes={mockHeroes}
        onChangePlayer={mockOnChangePlayer}
      />
    );

    const options = screen.getAllByRole('option');
    expect(options).toHaveLength(mockHeroes.length + 1); // +1 for empty option

    // Check options by their labels
    const ironManOption = options.find(opt => opt.getAttribute('label') === 'Iron Man');
    const spiderManOption = options.find(opt => opt.getAttribute('label') === 'Spider-Man');
    const captainAmericaOption = options.find(opt => opt.getAttribute('label') === 'Captain America');

    expect(ironManOption).toBeInTheDocument();
    expect(spiderManOption).toBeInTheDocument();
    expect(captainAmericaOption).toBeInTheDocument();
  });

  it('should update when player prop changes', () => {
    const { unmount } = renderWithTheme(
      <CreatePlayer
        name="Jugador 1"
        player={mockPlayer}
        heroes={mockHeroes}
        onChangePlayer={mockOnChangePlayer}
      />
    );

    let select = screen.getByRole('combobox');
    expect(select).toHaveValue('iron-man');

    // Unmount and render with new player
    unmount();
    const newPlayer = { ...mockPlayer, hero: mockHeroes[1] };
    renderWithTheme(
      <CreatePlayer
        name="Jugador 1"
        player={newPlayer}
        heroes={mockHeroes}
        onChangePlayer={mockOnChangePlayer}
      />
    );

    select = screen.getByRole('combobox');
    expect(select).toHaveValue('spider-man');
  });
});
