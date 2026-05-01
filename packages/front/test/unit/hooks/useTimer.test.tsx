import { renderHook, act, waitFor } from '@testing-library/react';
import { useTimer } from '../../../src/hooks/useTimer';
import { useGameContext } from '../../../src/contexts/GameContext';
import { useSendData } from '../../../src/hooks/useSendData';
import { PhaseDict } from '../../../src/types/Dicts';

jest.mock('../../../src/contexts/GameContext');
jest.mock('../../../src/hooks/useSendData');

describe('useTimer', () => {
  const mockSendEndTime = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    jest.useFakeTimers();
    (useSendData as jest.Mock).mockReturnValue({
      sendEndTime: mockSendEndTime,
    });
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it('should initialize timer with correct format', () => {
    const futureDate = new Date();
    futureDate.setHours(futureDate.getHours() + 2);
    futureDate.setMinutes(futureDate.getMinutes() + 30);
    futureDate.setSeconds(futureDate.getSeconds() + 45);

    (useGameContext as jest.Mock).mockReturnValue({
      data: {
        end: futureDate,
        phase: PhaseDict.SUPER,
      },
    });

    const { result } = renderHook(() => useTimer());

    expect(result.current.timer).toMatch(/\d+:\d{2}:\d{2}/);
    expect(result.current.end).toEqual(futureDate);
  });

  it('should update timer every second', async () => {
    const futureDate = new Date();
    futureDate.setHours(futureDate.getHours() + 1);
    futureDate.setMinutes(futureDate.getMinutes() + 5);

    (useGameContext as jest.Mock).mockReturnValue({
      data: {
        end: futureDate,
        phase: PhaseDict.SUPER,
      },
    });

    const { result } = renderHook(() => useTimer());
    const initialTimer = result.current.timer;

    act(() => {
      jest.advanceTimersByTime(1000);
    });

    await waitFor(() => {
      expect(result.current.timer).not.toBe(initialTimer);
    });
  });

  it('should call sendEndTime when time expires in valid phase', async () => {
    const pastDate = new Date();
    pastDate.setHours(pastDate.getHours() - 1);

    (useGameContext as jest.Mock).mockReturnValue({
      data: {
        end: pastDate,
        phase: PhaseDict.SUPER,
      },
    });

    renderHook(() => useTimer());

    act(() => {
      jest.advanceTimersByTime(1000);
    });

    await waitFor(() => {
      expect(mockSendEndTime).toHaveBeenCalled();
    });
  });

  it('should not call sendEndTime when phase is below SUPER', () => {
    const pastDate = new Date();
    pastDate.setHours(pastDate.getHours() - 1);

    (useGameContext as jest.Mock).mockReturnValue({
      data: {
        end: pastDate,
        phase: PhaseDict.SUPER - 1,
      },
    });

    renderHook(() => useTimer());

    act(() => {
      jest.advanceTimersByTime(1000);
    });

    expect(mockSendEndTime).not.toHaveBeenCalled();
  });

  it('should not call sendEndTime when phase is VERANKE_WIN or above', () => {
    const pastDate = new Date();
    pastDate.setHours(pastDate.getHours() - 1);

    (useGameContext as jest.Mock).mockReturnValue({
      data: {
        end: pastDate,
        phase: PhaseDict.VERANKE_WIN,
      },
    });

    renderHook(() => useTimer());

    act(() => {
      jest.advanceTimersByTime(1000);
    });

    expect(mockSendEndTime).not.toHaveBeenCalled();
  });

  it('should format minutes and seconds with leading zeros', () => {
    const futureDate = new Date();
    futureDate.setHours(futureDate.getHours() + 1);
    futureDate.setMinutes(futureDate.getMinutes() + 5);
    futureDate.setSeconds(futureDate.getSeconds() + 3);

    (useGameContext as jest.Mock).mockReturnValue({
      data: {
        end: futureDate,
        phase: PhaseDict.SUPER,
      },
    });

    const { result } = renderHook(() => useTimer());

    expect(result.current.timer).toMatch(/\d+:\d{2}:\d{2}/);
  });

  it('should clear interval on unmount', () => {
    const clearIntervalSpy = jest.spyOn(window, 'clearInterval');
    
    (useGameContext as jest.Mock).mockReturnValue({
      data: {
        end: new Date(),
        phase: PhaseDict.SUPER,
      },
    });

    const { unmount } = renderHook(() => useTimer());

    unmount();

    expect(clearIntervalSpy).toHaveBeenCalled();

    clearIntervalSpy.mockRestore();
  });
});
