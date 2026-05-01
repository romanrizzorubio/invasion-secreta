import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { ThemeProvider } from 'styled-components';
import { Button } from '../../../src/ui/Button/Button';
import { theme } from '../../../src/styles/theme';
import { SizeDict } from '../../../src/types/Dicts';

const renderWithTheme = (component: React.ReactElement) => {
  return render(<ThemeProvider theme={theme}>{component}</ThemeProvider>);
};

describe('Button', () => {
  it('should render button with positive value', () => {
    renderWithTheme(<Button value={5} />);
    expect(screen.getByText('+5')).toBeInTheDocument();
  });

  it('should render button with negative value', () => {
    renderWithTheme(<Button value={-3} />);
    expect(screen.getByText('-3')).toBeInTheDocument();
  });

  it('should render button with label instead of value', () => {
    renderWithTheme(<Button value={5} label="Custom Label" />);
    expect(screen.getByText('Custom Label')).toBeInTheDocument();
    expect(screen.queryByText('+5')).not.toBeInTheDocument();
  });

  it('should render button with label only', () => {
    renderWithTheme(<Button label="Click Me" />);
    expect(screen.getByText('Click Me')).toBeInTheDocument();
  });

  it('should call onChange with value when clicked', () => {
    const mockOnChange = jest.fn();
    renderWithTheme(<Button value={10} onChange={mockOnChange} />);

    fireEvent.click(screen.getByText('+10'));

    expect(mockOnChange).toHaveBeenCalledWith(10);
    expect(mockOnChange).toHaveBeenCalledTimes(1);
  });

  it('should call onClick when clicked', () => {
    const mockOnClick = jest.fn();
    renderWithTheme(<Button label="Click" onClick={mockOnClick} />);

    fireEvent.click(screen.getByText('Click'));

    expect(mockOnClick).toHaveBeenCalledTimes(1);
  });

  it('should call both onChange and onClick when clicked', () => {
    const mockOnChange = jest.fn();
    const mockOnClick = jest.fn();
    renderWithTheme(<Button value={7} onChange={mockOnChange} onClick={mockOnClick} />);

    fireEvent.click(screen.getByText('+7'));

    expect(mockOnChange).toHaveBeenCalledWith(7);
    expect(mockOnClick).toHaveBeenCalledTimes(1);
  });

  it('should not call onChange when value is not provided', () => {
    const mockOnChange = jest.fn();
    renderWithTheme(<Button label="Test" onChange={mockOnChange} />);

    fireEvent.click(screen.getByText('Test'));

    expect(mockOnChange).not.toHaveBeenCalled();
  });

  it('should render as disabled', () => {
    renderWithTheme(<Button label="Disabled" disabled />);
    expect(screen.getByText('Disabled')).toBeDisabled();
  });

  it('should not call handlers when disabled', () => {
    const mockOnChange = jest.fn();
    const mockOnClick = jest.fn();
    renderWithTheme(
      <Button value={5} onChange={mockOnChange} onClick={mockOnClick} disabled />,
    );

    fireEvent.click(screen.getByText('+5'));

    expect(mockOnChange).not.toHaveBeenCalled();
    expect(mockOnClick).not.toHaveBeenCalled();
  });

  it('should render with different sizes', () => {
    const { rerender } = renderWithTheme(<Button label="Small" size={SizeDict.S} />);
    expect(screen.getByText('Small')).toBeInTheDocument();

    rerender(
      <ThemeProvider theme={theme}>
        <Button label="Medium" size={SizeDict.M} />
      </ThemeProvider>,
    );
    expect(screen.getByText('Medium')).toBeInTheDocument();

    rerender(
      <ThemeProvider theme={theme}>
        <Button label="Large" size={SizeDict.L} />
      </ThemeProvider>,
    );
    expect(screen.getByText('Large')).toBeInTheDocument();
  });

  it('should render empty button when no value or label', () => {
    renderWithTheme(<Button />);
    const button = screen.getByRole('button');
    expect(button).toBeInTheDocument();
    expect(button.textContent).toBe('');
  });
});
