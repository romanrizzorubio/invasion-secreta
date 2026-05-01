import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { ThemeProvider } from 'styled-components';
import { SuperChangePhase } from '../../../src/phases/SuperChangePhase/SuperChangePhase';
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

describe('SuperChangePhase', () => {
  const mockAdvance = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    (useAdvance as jest.Mock).mockReturnValue({
      advance: mockAdvance,
    });
  });

  it('should render Super Winner panel when hasWin is true', () => {
    renderWithTheme(<SuperChangePhase hasWin={true} />);
    expect(screen.getByText('Panel: 3')).toBeInTheDocument();
  });

  it('should render Super Defeated panel when hasWin is false', () => {
    renderWithTheme(<SuperChangePhase hasWin={false} />);
    expect(screen.getByText('Panel: 2')).toBeInTheDocument();
  });

  it('should render victory message when hasWin is true', () => {
    renderWithTheme(<SuperChangePhase hasWin={true} />);
    expect(screen.getByText(/El Súper Skrull ha logrado sus planes/i)).toBeInTheDocument();
  });

  it('should render defeat message when hasWin is false', () => {
    renderWithTheme(<SuperChangePhase hasWin={false} />);
    expect(screen.getByText(/El Súper Skrull ha perdido la batalla/i)).toBeInTheDocument();
  });

  it('should render Avanzar button when not readonly', () => {
    renderWithTheme(<SuperChangePhase readOnly={false} />);
    expect(screen.getByText('Avanzar')).toBeInTheDocument();
  });

  it('should not render Avanzar button when readonly', () => {
    renderWithTheme(<SuperChangePhase readOnly={true} />);
    expect(screen.queryByText('Avanzar')).not.toBeInTheDocument();
  });

  it('should call advance when Avanzar button is clicked', () => {
    renderWithTheme(<SuperChangePhase readOnly={false} />);
    const button = screen.getByText('Avanzar');
    fireEvent.click(button);
    expect(mockAdvance).toHaveBeenCalledTimes(1);
  });
});
