import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { ThemeProvider } from 'styled-components';
import { Checkbox } from '../../../src/ui/Checkbox/Checkbox';
import { theme } from '../../../src/styles/theme';
import { SizeDict } from '../../../src/types/Dicts';

const renderWithTheme = (component: React.ReactElement) => {
  return render(<ThemeProvider theme={theme}>{component}</ThemeProvider>);
};

describe('Checkbox', () => {
  beforeEach(() => {
    jest.spyOn(console, 'log').mockImplementation();
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('should render checkbox without label', () => {
    renderWithTheme(<Checkbox />);
    expect(screen.getByRole('checkbox')).toBeInTheDocument();
  });

  it('should render checkbox with label', () => {
    renderWithTheme(<Checkbox label="Accept terms" />);
    expect(screen.getByText('Accept terms')).toBeInTheDocument();
    expect(screen.getByRole('checkbox')).toBeInTheDocument();
  });

  it('should render unchecked by default', () => {
    renderWithTheme(<Checkbox />);
    expect(screen.getByRole('checkbox')).not.toBeChecked();
  });

  it('should render checked when checked prop is true', () => {
    renderWithTheme(<Checkbox checked />);
    expect(screen.getByRole('checkbox')).toBeChecked();
  });

  it('should call onChange with true when checked', () => {
    const mockOnChange = jest.fn();
    renderWithTheme(<Checkbox onChange={mockOnChange} />);

    fireEvent.click(screen.getByRole('checkbox'));

    expect(mockOnChange).toHaveBeenCalledWith(true);
    expect(mockOnChange).toHaveBeenCalledTimes(1);
  });

  it('should call onChange with false when unchecked', () => {
    const mockOnChange = jest.fn();
    renderWithTheme(<Checkbox checked onChange={mockOnChange} />);

    fireEvent.click(screen.getByRole('checkbox'));

    expect(mockOnChange).toHaveBeenCalledWith(false);
    expect(mockOnChange).toHaveBeenCalledTimes(1);
  });

  it('should toggle state on multiple clicks', () => {
    const mockOnChange = jest.fn();
    renderWithTheme(<Checkbox onChange={mockOnChange} />);

    const checkbox = screen.getByRole('checkbox');

    fireEvent.click(checkbox);
    expect(mockOnChange).toHaveBeenCalledWith(true);

    fireEvent.click(checkbox);
    expect(mockOnChange).toHaveBeenCalledWith(false);

    expect(mockOnChange).toHaveBeenCalledTimes(2);
  });

  it('should update checked state when prop changes', () => {
    const { rerender } = renderWithTheme(<Checkbox checked={false} />);
    expect(screen.getByRole('checkbox')).not.toBeChecked();

    rerender(
      <ThemeProvider theme={theme}>
        <Checkbox checked={true} />
      </ThemeProvider>,
    );
    expect(screen.getByRole('checkbox')).toBeChecked();
  });

  it('should use custom id when provided', () => {
    renderWithTheme(<Checkbox id="custom-id" label="Test" />);
    const checkbox = screen.getByRole('checkbox');
    expect(checkbox).toHaveAttribute('id', 'custom-id');
  });

  it('should render with different sizes', () => {
    const { rerender } = renderWithTheme(<Checkbox size={SizeDict.S} />);
    expect(screen.getByRole('checkbox')).toBeInTheDocument();

    rerender(
      <ThemeProvider theme={theme}>
        <Checkbox size={SizeDict.M} />
      </ThemeProvider>,
    );
    expect(screen.getByRole('checkbox')).toBeInTheDocument();

    rerender(
      <ThemeProvider theme={theme}>
        <Checkbox size={SizeDict.L} />
      </ThemeProvider>,
    );
    expect(screen.getByRole('checkbox')).toBeInTheDocument();
  });

  it('should log checked state to console', () => {
    const consoleLogSpy = jest.spyOn(console, 'log');
    renderWithTheme(<Checkbox />);

    fireEvent.click(screen.getByRole('checkbox'));

    expect(consoleLogSpy).toHaveBeenCalledWith('checkbox', true);
  });
});
