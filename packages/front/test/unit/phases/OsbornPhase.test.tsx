import React from 'react';
import { render, screen } from '@testing-library/react';
import { ThemeProvider } from 'styled-components';
import { OsbornPhase } from '../../../src/phases/OsbornPhase/OsbornPhase';
import { theme } from '../../../src/styles/theme';

jest.mock('../../../src/components/Panel/Panel', () => ({
  Panel: ({ type, msg }: { type: string; msg?: string }) => (
    <div>
      Panel: {type}
      {msg && <p>{msg}</p>}
    </div>
  ),
}));

const renderWithTheme = (component: React.ReactElement) => {
  return render(<ThemeProvider theme={theme}>{component}</ThemeProvider>);
};

describe('OsbornPhase', () => {
  it('should render Osborn panel', () => {
    renderWithTheme(<OsbornPhase />);
    expect(screen.getByText('Panel: 11')).toBeInTheDocument();
  });

  it('should render victory message when hasWin is true', () => {
    renderWithTheme(<OsbornPhase hasWin={true} />);
    expect(screen.getByText(/Los Skrulls han logrado sus planes/i)).toBeInTheDocument();
  });

  it('should render defeat message when hasWin is false', () => {
    renderWithTheme(<OsbornPhase hasWin={false} />);
    expect(screen.getByText(/La Reina Skrull está acorralada/i)).toBeInTheDocument();
  });

  it('should render Norman Osborn reference in both messages', () => {
    const { rerender } = renderWithTheme(<OsbornPhase hasWin={true} />);
    expect(screen.getByText(/Norman Osborn/i)).toBeInTheDocument();

    rerender(
      <ThemeProvider theme={theme}>
        <OsbornPhase hasWin={false} />
      </ThemeProvider>
    );
    expect(screen.getByText(/Norman Osborn/i)).toBeInTheDocument();
  });
});
