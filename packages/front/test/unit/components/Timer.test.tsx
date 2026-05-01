import React from 'react';
import { render, screen } from '@testing-library/react';
import { ThemeProvider } from 'styled-components';
import { Timer } from '../../../src/components/Timer/Timer';
import { theme } from '../../../src/styles/theme';
import * as useTimerHook from '../../../src/hooks/useTimer';

const renderWithTheme = (component: React.ReactElement) => {
  return render(<ThemeProvider theme={theme}>{component}</ThemeProvider>);
};

jest.mock('../../../src/hooks/useTimer');

describe('Timer Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should render timer when end is defined', () => {
    jest.spyOn(useTimerHook, 'useTimer').mockReturnValue({
      timer: '05:30',
      end: new Date(),
    });

    renderWithTheme(<Timer />);
    expect(screen.getByText('05:30')).toBeInTheDocument();
  });

  it('should not render when end is undefined', () => {
    jest.spyOn(useTimerHook, 'useTimer').mockReturnValue({
      timer: '00:00',
      end: undefined,
    });

    const { container } = renderWithTheme(<Timer />);
    expect(container.firstChild).toBeNull();
  });

  it('should not render when end is null', () => {
    jest.spyOn(useTimerHook, 'useTimer').mockReturnValue({
      timer: '00:00',
      end: null,
    });

    const { container } = renderWithTheme(<Timer />);
    expect(container.firstChild).toBeNull();
  });

  it('should display correct timer value', () => {
    jest.spyOn(useTimerHook, 'useTimer').mockReturnValue({
      timer: '12:45',
      end: new Date(),
    });

    renderWithTheme(<Timer />);
    expect(screen.getByText('12:45')).toBeInTheDocument();
  });

  it('should update when timer value changes', () => {
    const { rerender } = render(
      <ThemeProvider theme={theme}>
        <Timer />
      </ThemeProvider>
    );

    jest.spyOn(useTimerHook, 'useTimer').mockReturnValue({
      timer: '10:00',
      end: new Date(),
    });

    rerender(
      <ThemeProvider theme={theme}>
        <Timer />
      </ThemeProvider>
    );

    expect(screen.getByText('10:00')).toBeInTheDocument();
  });

  it('should render heading element', () => {
    jest.spyOn(useTimerHook, 'useTimer').mockReturnValue({
      timer: '03:20',
      end: new Date(),
    });

    renderWithTheme(<Timer />);
    const heading = screen.getByRole('heading');
    expect(heading).toBeInTheDocument();
    expect(heading.textContent).toBe('03:20');
  });
});
