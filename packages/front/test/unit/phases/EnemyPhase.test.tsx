import React from 'react';
import { render, screen } from '@testing-library/react';
import { ThemeProvider } from 'styled-components';
import { EnemyPhase } from '../../../src/phases/EnemyPhase/EnemyPhase';
import { useEnemy } from '../../../src/hooks/useEnemy';
import { useVeranke } from '../../../src/hooks/useVeranke';
import { theme } from '../../../src/styles/theme';

jest.mock('../../../src/hooks/useEnemy');
jest.mock('../../../src/hooks/useVeranke');
jest.mock('../../../src/components/Panel/Panel', () => ({
  Panel: ({ type, buttons }: { type: string; buttons?: { label: string } }) => (
    <div>
      Panel: {type}
      {buttons && <button>{buttons.label}</button>}
    </div>
  ),
}));

const renderWithTheme = (component: React.ReactElement) => {
  return render(<ThemeProvider theme={theme}>{component}</ThemeProvider>);
};

describe('EnemyPhase', () => {
  const mockChangeEnemy = jest.fn();
  const mockComplete = jest.fn();
  const mockChangeExposed = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    (useEnemy as jest.Mock).mockReturnValue({
      enemy: 50,
      changeEnemy: mockChangeEnemy,
    });
    (useVeranke as jest.Mock).mockReturnValue({
      completed: false,
      complete: mockComplete,
      exposed: 0,
      changeExposed: mockChangeExposed,
    });
  });

  it('should render enemy panel', () => {
    renderWithTheme(<EnemyPhase />);
    expect(screen.getByText('Panel: 8')).toBeInTheDocument();
  });

  it('should render Veranke panel when not completed and not readonly', () => {
    renderWithTheme(<EnemyPhase readOnly={false} />);
    expect(screen.getByText('Panel: 5')).toBeInTheDocument();
    expect(screen.getByText('Completar')).toBeInTheDocument();
  });

  it('should not render Veranke panel when readonly', () => {
    renderWithTheme(<EnemyPhase readOnly={true} />);
    expect(screen.queryByText('Completar')).not.toBeInTheDocument();
  });

  it('should render exposed panel when completed', () => {
    (useVeranke as jest.Mock).mockReturnValue({
      completed: true,
      complete: mockComplete,
      exposed: 30,
      changeExposed: mockChangeExposed,
    });

    renderWithTheme(<EnemyPhase />);
    expect(screen.getByText('Panel: 10')).toBeInTheDocument();
  });

  it('should not render Veranke panel when completed', () => {
    (useVeranke as jest.Mock).mockReturnValue({
      completed: true,
      complete: mockComplete,
      exposed: 30,
      changeExposed: mockChangeExposed,
    });

    renderWithTheme(<EnemyPhase />);
    expect(screen.queryByText('Completar')).not.toBeInTheDocument();
  });
});
