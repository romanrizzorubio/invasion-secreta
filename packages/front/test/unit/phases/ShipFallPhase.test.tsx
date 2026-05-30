import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { ThemeProvider } from 'styled-components';
import { ShipFallPhase } from '../../../src/phases/ShipFallPhase/ShipFallPhase';
import { useShip } from '../../../src/hooks/useShip';
import { useVeranke } from '../../../src/hooks/useVeranke';
import { theme } from '../../../src/styles/theme';

jest.mock('../../../src/hooks/useShip');
jest.mock('../../../src/hooks/useVeranke');
jest.mock('../../../src/components/Panel/Panel', () => ({
  Panel: ({ type, buttons }: { type: string; buttons?: { label: string; onClick: () => void } }) => (
    <div>
      Panel: {type}
      {buttons && <button onClick={buttons.onClick}>{buttons.label}</button>}
    </div>
  ),
}));

const renderWithTheme = (component: React.ReactElement) => {
  return render(<ThemeProvider theme={theme}>{component}</ThemeProvider>);
};

describe('ShipFallPhase', () => {
  const mockAddShipCounter = jest.fn();
  const mockComplete = jest.fn();
  const mockChangeExposed = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    (useShip as jest.Mock).mockReturnValue({
      ship: 3,
      addShipCounter: mockAddShipCounter,
    });
    (useVeranke as jest.Mock).mockReturnValue({
      completed: false,
      complete: mockComplete,
      exposed: 0,
      changeExposed: mockChangeExposed,
    });
  });

  it('should render Ship Fall panel', () => {
    renderWithTheme(<ShipFallPhase />);
    expect(screen.getByText('Panel: 6')).toBeInTheDocument();
  });

  it('should render Quitar contador button when not readonly', () => {
    renderWithTheme(<ShipFallPhase readOnly={false} />);
    expect(screen.getByText('Quitar contador')).toBeInTheDocument();
  });

  it('should not render Quitar contador button when readonly', () => {
    renderWithTheme(<ShipFallPhase readOnly={true} />);
    expect(screen.queryByText('Quitar contador')).not.toBeInTheDocument();
  });

  it('should call addShipCounter when button is clicked', () => {
    renderWithTheme(<ShipFallPhase readOnly={false} />);
    const button = screen.getByText('Quitar contador');
    fireEvent.click(button);
    expect(mockAddShipCounter).toHaveBeenCalledTimes(1);
  });

  it('should render Veranke panel when not completed and not readonly', () => {
    renderWithTheme(<ShipFallPhase readOnly={false} />);
    expect(screen.getByText('Panel: 5')).toBeInTheDocument();
    expect(screen.getByText('Completar')).toBeInTheDocument();
  });

  it('should not render Veranke panel when readonly', () => {
    renderWithTheme(<ShipFallPhase readOnly={true} />);
    expect(screen.queryByText('Completar')).not.toBeInTheDocument();
  });

  it('should render Exposed panel when completed', () => {
    (useVeranke as jest.Mock).mockReturnValue({
      completed: true,
      complete: mockComplete,
      exposed: 30,
      changeExposed: mockChangeExposed,
    });

    renderWithTheme(<ShipFallPhase />);
    expect(screen.getByText('Panel: 10')).toBeInTheDocument();
  });

  it('should not render Veranke panel when completed', () => {
    (useVeranke as jest.Mock).mockReturnValue({
      completed: true,
      complete: mockComplete,
      exposed: 30,
      changeExposed: mockChangeExposed,
    });

    renderWithTheme(<ShipFallPhase />);
    expect(screen.queryByText('Completar')).not.toBeInTheDocument();
  });
});
