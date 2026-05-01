import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { ThemeProvider } from 'styled-components';
import { Input } from '../../../src/ui/Input/Input';
import { theme } from '../../../src/styles/theme';
import { SizeDict } from '../../../src/types/Dicts';

const renderWithTheme = (component: React.ReactElement) => {
  return render(<ThemeProvider theme={theme}>{component}</ThemeProvider>);
};

describe('Input', () => {
  describe('text input', () => {
    it('should render text input', () => {
      renderWithTheme(<Input type="text" />);
      expect(screen.getByRole('textbox')).toBeInTheDocument();
    });

    it('should render text input with label', () => {
      renderWithTheme(<Input type="text" label="Username" />);
      expect(screen.getByText('Username')).toBeInTheDocument();
      expect(screen.getByRole('textbox')).toBeInTheDocument();
    });

    it('should call onChange with string value on blur', () => {
      const mockOnChange = jest.fn();
      renderWithTheme(<Input type="text" onChange={mockOnChange} />);

      const input = screen.getByRole('textbox');
      fireEvent.change(input, { target: { value: 'test value' } });
      fireEvent.blur(input);

      expect(mockOnChange).toHaveBeenCalledWith('test value');
    });

    it('should update value when prop changes', () => {
      const { rerender } = renderWithTheme(<Input type="text" value="initial" />);
      expect(screen.getByRole('textbox')).toHaveValue('initial');

      rerender(
        <ThemeProvider theme={theme}>
          <Input type="text" value="updated" />
        </ThemeProvider>,
      );
      expect(screen.getByRole('textbox')).toHaveValue('updated');
    });
  });

  describe('number input', () => {
    it('should render number input', () => {
      renderWithTheme(<Input type="number" />);
      expect(screen.getByRole('spinbutton')).toBeInTheDocument();
    });

    it('should call onChange with number value on blur', () => {
      const mockOnChange = jest.fn();
      renderWithTheme(<Input type="number" onChange={mockOnChange} />);

      const input = screen.getByRole('spinbutton');
      fireEvent.change(input, { target: { value: '42' } });
      fireEvent.blur(input);

      expect(mockOnChange).toHaveBeenCalledWith(42);
    });

    it('should call onChange with undefined for invalid number', () => {
      const mockOnChange = jest.fn();
      renderWithTheme(<Input type="number" onChange={mockOnChange} />);

      const input = screen.getByRole('spinbutton');
      fireEvent.change(input, { target: { value: 'abc' } });
      fireEvent.blur(input);

      expect(mockOnChange).toHaveBeenCalledWith(undefined);
    });

    it('should handle zero value', () => {
      const mockOnChange = jest.fn();
      renderWithTheme(<Input type="number" onChange={mockOnChange} />);

      const input = screen.getByRole('spinbutton');
      fireEvent.change(input, { target: { value: '0' } });
      fireEvent.blur(input);

      expect(mockOnChange).toHaveBeenCalledWith(0);
    });

    it('should handle negative numbers', () => {
      const mockOnChange = jest.fn();
      renderWithTheme(<Input type="number" onChange={mockOnChange} />);

      const input = screen.getByRole('spinbutton');
      fireEvent.change(input, { target: { value: '-15' } });
      fireEvent.blur(input);

      expect(mockOnChange).toHaveBeenCalledWith(-15);
    });
  });

  describe('time input', () => {
    it('should render time input', () => {
      renderWithTheme(<Input type="time" />);
      const input = screen.getByDisplayValue('');
      expect(input).toBeInTheDocument();
      expect(input).toHaveAttribute('type', 'time');
    });

    it('should call onChange with Date object on blur', () => {
      const mockOnChange = jest.fn();
      renderWithTheme(<Input type="time" onChange={mockOnChange} />);

      const input = screen.getByDisplayValue('');
      fireEvent.change(input, { target: { value: '14:30' } });
      fireEvent.blur(input);

      expect(mockOnChange).toHaveBeenCalledTimes(1);
      const calledValue = mockOnChange.mock.calls[0][0];
      expect(calledValue).toBeInstanceOf(Date);
      expect(calledValue.getHours()).toBe(14);
      expect(calledValue.getMinutes()).toBe(30);
    });
  });

  describe('common props', () => {
    it('should use custom id when provided', () => {
      renderWithTheme(<Input type="text" id="custom-id" label="Test" />);
      const input = screen.getByRole('textbox');
      expect(input).toHaveAttribute('id', 'custom-id');
    });

    it('should render with different sizes', () => {
      const { rerender } = renderWithTheme(<Input type="text" size={SizeDict.S} />);
      expect(screen.getByRole('textbox')).toBeInTheDocument();

      rerender(
        <ThemeProvider theme={theme}>
          <Input type="text" size={SizeDict.M} />
        </ThemeProvider>,
      );
      expect(screen.getByRole('textbox')).toBeInTheDocument();

      rerender(
        <ThemeProvider theme={theme}>
          <Input type="text" size={SizeDict.L} />
        </ThemeProvider>,
      );
      expect(screen.getByRole('textbox')).toBeInTheDocument();
    });

    it('should pass through additional HTML attributes', () => {
      renderWithTheme(<Input type="text" placeholder="Enter text" disabled />);
      const input = screen.getByRole('textbox');
      expect(input).toHaveAttribute('placeholder', 'Enter text');
      expect(input).toBeDisabled();
    });
  });
});
