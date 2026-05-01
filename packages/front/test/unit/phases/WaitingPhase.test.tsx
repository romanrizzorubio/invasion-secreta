import React from 'react';
import { render, screen } from '@testing-library/react';
import { ThemeProvider } from 'styled-components';
import { WaitingPhase } from '../../../src/phases/WaitingPhase/WaitingPhase';
import { theme } from '../../../src/styles/theme';

const renderWithTheme = (component: React.ReactElement) => {
  return render(<ThemeProvider theme={theme}>{component}</ThemeProvider>);
};

describe('WaitingPhase', () => {
  it('should render the waiting message', () => {
    renderWithTheme(<WaitingPhase />);
    expect(screen.getByText('Esperando que se inicie la partida...')).toBeInTheDocument();
  });
});
