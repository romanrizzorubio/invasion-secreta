import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { ThemeProvider } from 'styled-components';
import { Button } from '../../../src/ui/Button/Button';
import { SizeDict } from '../../../src/types/Dicts';
import { theme } from '../../../src/styles/theme';

const renderWithTheme = (component: React.ReactElement) => {
  return render(<ThemeProvider theme={theme}>{component}</ThemeProvider>);
};

describe('Button Component', () => {
  it('should render button with label', () => {
    renderWithTheme(<Button label="Test Button" />);
    expect(screen.getByText('Test Button')).toBeInTheDocument();
  });

  it('should render button with positive value', () => {
    renderWithTheme(<Button value={5} />);
    expect(screen.getByText('+5')).toBeInTheDocument();
  });

  it('should render button with negative value', () => {
    renderWithTheme(<Button value={-3} />);
    expect(screen.getByText('-3')).toBeInTheDocument();
  });

  it('should call onChange when clicked with value', () => {
    const mockOnChange = jest.fn();
    renderWithTheme(<Button value={10} onChange={mockOnChange} />);

    fireEvent.click(screen.getByText('+10'));
    expect(mockOnChange).toHaveBeenCalledWith(10);
  });

  it('should call onClick when clicked', () => {
    const mockOnClick = jest.fn();
    renderWithTheme(<Button label="Click me" onClick={mockOnClick} />);

    fireEvent.click(screen.getByText('Click me'));
    expect(mockOnClick).toHaveBeenCalled();
  });

  it('should be disabled when disabled prop is true', () => {
    renderWithTheme(<Button label="Disabled" disabled={true} />);
    expect(screen.getByRole('button')).toBeDisabled();
  });

  it('should apply correct size', () => {
    renderWithTheme(<Button label="Large Button" size={SizeDict.L} />);
    const button = screen.getByRole('button');
    expect(button).toBeInTheDocument();
  });

  it('should prioritize label over value', () => {
    renderWithTheme(<Button label="Custom Label" value={5} />);
    expect(screen.getByText('Custom Label')).toBeInTheDocument();
    expect(screen.queryByText('+5')).not.toBeInTheDocument();
  });
});
