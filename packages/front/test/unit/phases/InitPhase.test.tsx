import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { ThemeProvider } from 'styled-components';
import { InitPhase } from '../../../src/phases/InitPhase/InitPhase';
import { useInit } from '../../../src/hooks/useInit';
import { theme } from '../../../src/styles/theme';

jest.mock('../../../src/hooks/useInit');

const renderWithTheme = (component: React.ReactElement) => {
  return render(<ThemeProvider theme={theme}>{component}</ThemeProvider>);
};

describe('InitPhase', () => {
  const mockChangeEnd = jest.fn();
  const mockInitGame = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    (useInit as jest.Mock).mockReturnValue({
      end: new Date('2024-12-31T23:59:59'),
      changeEnd: mockChangeEnd,
      initGame: mockInitGame,
    });
  });

  it('should render the InitPhase component', () => {
    renderWithTheme(<InitPhase />);
    expect(screen.getByText('Hora de finalización')).toBeInTheDocument();
    expect(screen.getByText('Iniciar')).toBeInTheDocument();
  });

  it('should call initGame when Iniciar button is clicked', () => {
    renderWithTheme(<InitPhase />);
    const button = screen.getByText('Iniciar');
    fireEvent.click(button);
    expect(mockInitGame).toHaveBeenCalledTimes(1);
  });

  it('should display the correct end time value', () => {
    renderWithTheme(<InitPhase />);
    const input = screen.getByLabelText('Hora de finalización');
    expect(input).toBeInTheDocument();
  });

  it('should call changeEnd when time input changes and blurs', () => {
    renderWithTheme(<InitPhase />);
    const input = screen.getByLabelText('Hora de finalización');
    fireEvent.change(input, { target: { value: '12:00' } });
    fireEvent.blur(input);
    expect(mockChangeEnd).toHaveBeenCalled();
  });
});
