import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { ThemeProvider } from 'styled-components';
import { Select } from '../../../src/ui/Select/Select';
import { theme } from '../../../src/styles/theme';
import { SizeDict } from '../../../src/types/Dicts';

const renderWithTheme = (component: React.ReactElement) => {
  return render(<ThemeProvider theme={theme}>{component}</ThemeProvider>);
};

describe('Select', () => {
  const mockOptions = [
    { value: '1', children: 'Option 1' },
    { value: '2', children: 'Option 2' },
    { value: '3', children: 'Option 3' },
  ];

  it('should render select without label', () => {
    renderWithTheme(<Select options={mockOptions} />);
    expect(screen.getByRole('combobox')).toBeInTheDocument();
  });

  it('should render select with label', () => {
    renderWithTheme(<Select label="Choose option" options={mockOptions} />);
    expect(screen.getByText('Choose option')).toBeInTheDocument();
    expect(screen.getByRole('combobox')).toBeInTheDocument();
  });

  it('should render all options plus empty option', () => {
    renderWithTheme(<Select options={mockOptions} />);
    const select = screen.getByRole('combobox');
    const options = select.querySelectorAll('option');
    
    expect(options).toHaveLength(4); // 3 options + 1 empty
    expect(options[0]).toHaveValue('');
    expect(options[1]).toHaveValue('1');
    expect(options[2]).toHaveValue('2');
    expect(options[3]).toHaveValue('3');
  });

  it('should call onChange when option is selected', () => {
    const mockOnChange = jest.fn();
    renderWithTheme(<Select options={mockOptions} onChange={mockOnChange} />);

    const select = screen.getByRole('combobox');
    fireEvent.change(select, { target: { value: '2' } });

    expect(mockOnChange).toHaveBeenCalledWith('2');
    expect(mockOnChange).toHaveBeenCalledTimes(1);
  });

  it('should update value when prop changes', () => {
    const { rerender } = renderWithTheme(<Select options={mockOptions} value="1" />);
    expect(screen.getByRole('combobox')).toHaveValue('1');

    rerender(
      <ThemeProvider theme={theme}>
        <Select options={mockOptions} value="2" />
      </ThemeProvider>,
    );
    expect(screen.getByRole('combobox')).toHaveValue('2');
  });

  it('should handle empty options array', () => {
    renderWithTheme(<Select options={[]} />);
    const select = screen.getByRole('combobox');
    const options = select.querySelectorAll('option');
    
    expect(options).toHaveLength(1); // Only empty option
  });

  it('should use custom id when provided', () => {
    renderWithTheme(<Select id="custom-id" label="Test" options={mockOptions} />);
    const select = screen.getByRole('combobox');
    expect(select).toHaveAttribute('id', 'custom-id');
  });

  it('should render with different sizes', () => {
    const { rerender } = renderWithTheme(<Select options={mockOptions} size={SizeDict.S} />);
    expect(screen.getByRole('combobox')).toBeInTheDocument();

    rerender(
      <ThemeProvider theme={theme}>
        <Select options={mockOptions} size={SizeDict.M} />
      </ThemeProvider>,
    );
    expect(screen.getByRole('combobox')).toBeInTheDocument();

    rerender(
      <ThemeProvider theme={theme}>
        <Select options={mockOptions} size={SizeDict.L} />
      </ThemeProvider>,
    );
    expect(screen.getByRole('combobox')).toBeInTheDocument();
  });

  it('should pass through additional HTML attributes', () => {
    renderWithTheme(<Select options={mockOptions} disabled />);
    expect(screen.getByRole('combobox')).toBeDisabled();
  });

  it('should render option attributes correctly', () => {
    const optionsWithAttributes = [
      { value: '1', children: 'Option 1', disabled: true },
      { value: '2', children: 'Option 2' },
    ];

    renderWithTheme(<Select options={optionsWithAttributes} />);
    const select = screen.getByRole('combobox');
    const options = select.querySelectorAll('option');
    
    expect(options[1]).toBeDisabled();
    expect(options[2]).not.toBeDisabled();
  });
});
