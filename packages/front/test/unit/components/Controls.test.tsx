import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { ThemeProvider } from 'styled-components';
import { Controls } from '../../../src/components/Controls/Controls';
import { theme } from '../../../src/styles/theme';

const renderWithTheme = (component: React.ReactElement) => {
  return render(<ThemeProvider theme={theme}>{component}</ThemeProvider>);
};

describe('Controls Component', () => {
  const mockOnChange = jest.fn();

  beforeEach(() => {
    mockOnChange.mockClear();
  });

  it('should render all buttons when maxValue is 10', () => {
    renderWithTheme(<Controls maxValue={10} onChange={mockOnChange} />);
    expect(screen.getByText('-10')).toBeInTheDocument();
    expect(screen.getByText('-5')).toBeInTheDocument();
    expect(screen.getByText('-3')).toBeInTheDocument();
    expect(screen.getByText('-1')).toBeInTheDocument();
    expect(screen.getByText('+1')).toBeInTheDocument();
    expect(screen.getByText('+3')).toBeInTheDocument();
    expect(screen.getByText('+5')).toBeInTheDocument();
    expect(screen.getByText('+10')).toBeInTheDocument();
  });

  it('should render only buttons up to maxValue 5', () => {
    renderWithTheme(<Controls maxValue={5} onChange={mockOnChange} />);
    expect(screen.queryByText('-10')).not.toBeInTheDocument();
    expect(screen.getByText('-5')).toBeInTheDocument();
    expect(screen.getByText('-3')).toBeInTheDocument();
    expect(screen.getByText('-1')).toBeInTheDocument();
    expect(screen.getByText('+1')).toBeInTheDocument();
    expect(screen.getByText('+3')).toBeInTheDocument();
    expect(screen.getByText('+5')).toBeInTheDocument();
    expect(screen.queryByText('+10')).not.toBeInTheDocument();
  });

  it('should render only buttons up to maxValue 3', () => {
    renderWithTheme(<Controls maxValue={3} onChange={mockOnChange} />);
    expect(screen.queryByText('-10')).not.toBeInTheDocument();
    expect(screen.queryByText('-5')).not.toBeInTheDocument();
    expect(screen.getByText('-3')).toBeInTheDocument();
    expect(screen.getByText('-1')).toBeInTheDocument();
    expect(screen.getByText('+1')).toBeInTheDocument();
    expect(screen.getByText('+3')).toBeInTheDocument();
    expect(screen.queryByText('+5')).not.toBeInTheDocument();
    expect(screen.queryByText('+10')).not.toBeInTheDocument();
  });

  it('should render only +1/-1 buttons when maxValue is 1', () => {
    renderWithTheme(<Controls maxValue={1} onChange={mockOnChange} />);
    expect(screen.queryByText('-10')).not.toBeInTheDocument();
    expect(screen.queryByText('-5')).not.toBeInTheDocument();
    expect(screen.queryByText('-3')).not.toBeInTheDocument();
    expect(screen.getByText('-1')).toBeInTheDocument();
    expect(screen.getByText('+1')).toBeInTheDocument();
    expect(screen.queryByText('+3')).not.toBeInTheDocument();
    expect(screen.queryByText('+5')).not.toBeInTheDocument();
    expect(screen.queryByText('+10')).not.toBeInTheDocument();
  });

  it('should call onChange with correct value when button is clicked', () => {
    renderWithTheme(<Controls maxValue={10} onChange={mockOnChange} />);

    fireEvent.click(screen.getByText('+5'));
    expect(mockOnChange).toHaveBeenCalledWith(5);

    fireEvent.click(screen.getByText('-3'));
    expect(mockOnChange).toHaveBeenCalledWith(-3);
  });

  it('should use default maxValue of 10 when not provided', () => {
    renderWithTheme(<Controls onChange={mockOnChange} />);
    expect(screen.getByText('+10')).toBeInTheDocument();
    expect(screen.getByText('-10')).toBeInTheDocument();
  });
});
