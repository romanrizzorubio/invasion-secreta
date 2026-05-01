import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { ThemeProvider } from 'styled-components';
import { SpiderWomanPhase } from '../../../src/phases/SpiderWomanPhase/SpiderWomanPhase';
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

describe('SpiderWomanPhase', () => {
  const mockAdvance = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    (useAdvance as jest.Mock).mockReturnValue({
      advance: mockAdvance,
    });
  });

  it('should render Veranke panel with message', () => {
    renderWithTheme(<SpiderWomanPhase />);
    expect(screen.getByText('Panel: 5')).toBeInTheDocument();
    expect(screen.getByText(/¡Nadie es quien parece!/i)).toBeInTheDocument();
  });

  it('should render Avanzar button when not readonly', () => {
    renderWithTheme(<SpiderWomanPhase readOnly={false} />);
    expect(screen.getByText('Avanzar')).toBeInTheDocument();
  });

  it('should not render Avanzar button when readonly', () => {
    renderWithTheme(<SpiderWomanPhase readOnly={true} />);
    expect(screen.queryByText('Avanzar')).not.toBeInTheDocument();
  });

  it('should call advance when Avanzar button is clicked', () => {
    renderWithTheme(<SpiderWomanPhase readOnly={false} />);
    const button = screen.getByText('Avanzar');
    fireEvent.click(button);
    expect(mockAdvance).toHaveBeenCalledTimes(1);
  });
});
