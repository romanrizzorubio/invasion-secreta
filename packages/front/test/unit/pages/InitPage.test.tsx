import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { ThemeProvider } from 'styled-components';
import { BrowserRouter } from 'react-router-dom';
import InitPage from '../../../src/pages/InitPage/InitPage';
import { theme } from '../../../src/styles/theme';

const mockNavigate = jest.fn();
const mockResetData = jest.fn();

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate,
}));

jest.mock('../../../src/hooks/useInit', () => ({
  useInit: () => ({
    resetData: mockResetData,
  }),
}));

const renderWithProviders = () => {
  return render(
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <InitPage />
      </BrowserRouter>
    </ThemeProvider>
  );
};

describe('InitPage Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should render the Iniciar button', () => {
    renderWithProviders();
    expect(screen.getByText('Iniciar')).toBeInTheDocument();
  });

  it('should call resetData when button is clicked', async () => {
    mockResetData.mockResolvedValue(true);
    renderWithProviders();

    const button = screen.getByText('Iniciar');
    fireEvent.click(button);

    await waitFor(() => {
      expect(mockResetData).toHaveBeenCalledTimes(1);
    });
  });

  it('should navigate to home when resetData succeeds', async () => {
    mockResetData.mockResolvedValue(true);
    renderWithProviders();

    const button = screen.getByText('Iniciar');
    fireEvent.click(button);

    await waitFor(() => {
      expect(mockNavigate).toHaveBeenCalledWith('/');
    });
  });

  it('should not navigate when resetData fails', async () => {
    mockResetData.mockResolvedValue(false);
    renderWithProviders();

    const button = screen.getByText('Iniciar');
    fireEvent.click(button);

    await waitFor(() => {
      expect(mockResetData).toHaveBeenCalled();
    });

    expect(mockNavigate).not.toHaveBeenCalled();
  });

  it('should render button with large size', () => {
    renderWithProviders();
    const button = screen.getByRole('button');
    expect(button).toBeInTheDocument();
  });
});
