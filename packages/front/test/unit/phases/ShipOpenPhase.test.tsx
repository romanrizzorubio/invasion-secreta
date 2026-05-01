import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { ThemeProvider } from 'styled-components';
import { ShipOpenPhase } from '../../../src/phases/ShipOpenPhase/ShipOpenPhase';
import { useAdvance } from '../../../src/hooks/useAdvance';
import { theme } from '../../../src/styles/theme';

jest.mock('../../../src/hooks/useAdvance');
jest.mock('../../../src/components/Panel/Panel', () => ({
  Panel: ({ type, msg, buttons }: { type: string; msg?: string; buttons?: { label: string; onClick: () => void } }) => (
    <div>
      Panel: {type}
      {msg && <p>{msg}</p>}
      {buttons && <button onClick={buttons.onClick}>{buttons.label}</button>}
    </div>
  ),
}));

const renderWithTheme = (component: React.ReactElement) => {
  return render(<ThemeProvider theme={theme}>{component}</ThemeProvider>);
};

describe('ShipOpenPhase', () => {
  const mockAdvance = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    (useAdvance as jest.Mock).mockReturnValue({
      advance: mockAdvance,
    });
  });

  it('should render Ship Open panel with message', () => {
    renderWithTheme(<ShipOpenPhase />);
    expect(screen.getByText('Panel: 7')).toBeInTheDocument();
    expect(screen.getByText(/¡La extraña nave se ha abierto!/i)).toBeInTheDocument();
  });

  it('should render Avanzar button when not readonly', () => {
    renderWithTheme(<ShipOpenPhase readOnly={false} />);
    expect(screen.getByText('Avanzar')).toBeInTheDocument();
  });

  it('should not render Avanzar button when readonly', () => {
    renderWithTheme(<ShipOpenPhase readOnly={true} />);
    expect(screen.queryByText('Avanzar')).not.toBeInTheDocument();
  });

  it('should call advance when Avanzar button is clicked', () => {
    renderWithTheme(<ShipOpenPhase readOnly={false} />);
    const button = screen.getByText('Avanzar');
    fireEvent.click(button);
    expect(mockAdvance).toHaveBeenCalledTimes(1);
  });
});
