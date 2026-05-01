import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { ThemeProvider } from 'styled-components';
import { SetTable } from '../../../src/components/SetTable/SetTable';
import { theme } from '../../../src/styles/theme';
import * as useSetTableHook from '../../../src/hooks/useSetTable';

const renderWithTheme = (component: React.ReactElement) => {
  return render(<ThemeProvider theme={theme}>{component}</ThemeProvider>);
};

jest.mock('../../../src/hooks/useSetTable');

describe('SetTable Component', () => {
  const mockChangeTable = jest.fn();
  const mockSaveTable = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    jest.spyOn(useSetTableHook, 'useSetTable').mockReturnValue({
      table: undefined,
      changeTable: mockChangeTable,
      saveTable: mockSaveTable,
    });
  });

  it('should render input with label "Mesa"', () => {
    renderWithTheme(<SetTable />);
    expect(screen.getByText('Mesa')).toBeInTheDocument();
  });

  it('should render "Iniciar" button', () => {
    renderWithTheme(<SetTable />);
    expect(screen.getByText('Iniciar')).toBeInTheDocument();
  });

  it('should disable button when table is undefined', () => {
    renderWithTheme(<SetTable />);
    const button = screen.getByText('Iniciar');
    expect(button).toBeDisabled();
  });

  it('should disable button when table is 0', () => {
    jest.spyOn(useSetTableHook, 'useSetTable').mockReturnValue({
      table: 0,
      changeTable: mockChangeTable,
      saveTable: mockSaveTable,
    });

    renderWithTheme(<SetTable />);
    const button = screen.getByText('Iniciar');
    expect(button).toBeDisabled();
  });

  it('should disable button when table is negative', () => {
    jest.spyOn(useSetTableHook, 'useSetTable').mockReturnValue({
      table: -1,
      changeTable: mockChangeTable,
      saveTable: mockSaveTable,
    });

    renderWithTheme(<SetTable />);
    const button = screen.getByText('Iniciar');
    expect(button).toBeDisabled();
  });

  it('should enable button when table is valid positive number', () => {
    jest.spyOn(useSetTableHook, 'useSetTable').mockReturnValue({
      table: 5,
      changeTable: mockChangeTable,
      saveTable: mockSaveTable,
    });

    renderWithTheme(<SetTable />);
    const button = screen.getByText('Iniciar');
    expect(button).not.toBeDisabled();
  });

  it('should call changeTable when input value changes', () => {
    renderWithTheme(<SetTable />);
    const input = screen.getByRole('spinbutton');

    fireEvent.blur(input, { target: { value: '3' } });
    expect(mockChangeTable).toHaveBeenCalled();
  });

  it('should call saveTable when button is clicked', () => {
    jest.spyOn(useSetTableHook, 'useSetTable').mockReturnValue({
      table: 5,
      changeTable: mockChangeTable,
      saveTable: mockSaveTable,
    });

    renderWithTheme(<SetTable />);
    const button = screen.getByText('Iniciar');

    fireEvent.click(button);
    expect(mockSaveTable).toHaveBeenCalled();
  });

  it('should display correct table value in input', () => {
    jest.spyOn(useSetTableHook, 'useSetTable').mockReturnValue({
      table: 7,
      changeTable: mockChangeTable,
      saveTable: mockSaveTable,
    });

    renderWithTheme(<SetTable />);
    const input = screen.getByRole('spinbutton');
    expect(input).toHaveValue(7);
  });

  it('should have minimum value of 1 for input', () => {
    renderWithTheme(<SetTable />);
    const input = screen.getByRole('spinbutton');
    expect(input).toHaveAttribute('min', '1');
  });
});
