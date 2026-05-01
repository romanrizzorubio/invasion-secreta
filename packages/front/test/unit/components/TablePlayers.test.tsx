import React from 'react';
import { render, screen } from '@testing-library/react';
import { ThemeProvider } from 'styled-components';
import { TablePlayers } from '../../../src/components/TablePlayers/TablePlayers';
import { Player } from '../../../src/types/Player';
import { SizeDict } from '../../../src/types/Dicts';
import { theme } from '../../../src/styles/theme';

const renderWithTheme = (component: React.ReactElement) => {
  return render(<ThemeProvider theme={theme}>{component}</ThemeProvider>);
};

describe('TablePlayers Component', () => {
  const mockPlayers: Player[] = [
    { hero: { label: 'Iron Man', value: 'iron-man' }, life: 20, plan: 0 },
    { hero: { label: 'Spider-Man', value: 'spider-man' }, life: 18, plan: 2 },
    { hero: { label: 'Captain America', value: 'captain-america' }, life: 15, plan: 3 },
  ];

  it('should render table with player heroes', () => {
    renderWithTheme(<TablePlayers currentTable={0} players={mockPlayers} />);
    expect(screen.getByText('Iron Man')).toBeInTheDocument();
    expect(screen.getByText('Spider-Man')).toBeInTheDocument();
    expect(screen.getByText('Captain America')).toBeInTheDocument();
  });

  it('should render table header "Héroe"', () => {
    renderWithTheme(<TablePlayers currentTable={0} players={mockPlayers} />);
    expect(screen.getByText('Héroe')).toBeInTheDocument();
  });

  it('should render table name with correct table number', () => {
    renderWithTheme(<TablePlayers currentTable={0} players={mockPlayers} />);
    expect(screen.getByText('Mesa 1')).toBeInTheDocument();
  });

  it('should render table name with incremented table number', () => {
    renderWithTheme(<TablePlayers currentTable={2} players={mockPlayers} />);
    expect(screen.getByText('Mesa 3')).toBeInTheDocument();
  });

  it('should hide table name when hideName is true', () => {
    renderWithTheme(<TablePlayers currentTable={0} players={mockPlayers} hideName={true} />);
    expect(screen.queryByText('Mesa 1')).not.toBeInTheDocument();
  });

  it('should show "Normal" subtitle when expert is false', () => {
    renderWithTheme(<TablePlayers currentTable={0} players={mockPlayers} expert={false} />);
    expect(screen.getByText('Normal')).toBeInTheDocument();
  });

  it('should show "Experto" subtitle when expert is true', () => {
    renderWithTheme(<TablePlayers currentTable={0} players={mockPlayers} expert={true} />);
    expect(screen.getByText('Experto')).toBeInTheDocument();
  });

  it('should render empty table when no players', () => {
    renderWithTheme(<TablePlayers currentTable={0} players={[]} />);
    expect(screen.getByText('Héroe')).toBeInTheDocument();
    expect(screen.queryByText('Iron Man')).not.toBeInTheDocument();
  });

  it('should render table with custom size', () => {
    renderWithTheme(
      <TablePlayers currentTable={0} players={mockPlayers} size={SizeDict.S} />
    );
    expect(screen.getByText('Iron Man')).toBeInTheDocument();
  });

  it('should render correct number of players', () => {
    const { container } = renderWithTheme(
      <TablePlayers currentTable={0} players={mockPlayers} />
    );
    const rows = container.querySelectorAll('tbody tr');
    expect(rows).toHaveLength(mockPlayers.length);
  });

  it('should update when players prop changes', () => {
    const { rerender } = renderWithTheme(
      <TablePlayers currentTable={0} players={mockPlayers} />
    );
    expect(screen.getByText('Iron Man')).toBeInTheDocument();

    const newPlayers: Player[] = [
      { hero: { label: 'Thor', value: 'thor' }, life: 25, plan: 1 },
    ];

    rerender(
      <ThemeProvider theme={theme}>
        <TablePlayers currentTable={0} players={newPlayers} />
      </ThemeProvider>
    );

    expect(screen.queryByText('Iron Man')).not.toBeInTheDocument();
    expect(screen.getByText('Thor')).toBeInTheDocument();
  });
});
