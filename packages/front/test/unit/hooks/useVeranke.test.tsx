import { renderHook, act, waitFor } from '@testing-library/react';
import { useVeranke } from '../../../src/hooks/useVeranke';
import { useSendData } from '../../../src/hooks/useSendData';
import { useGameContext } from '../../../src/contexts/GameContext';

jest.mock('../../../src/hooks/useSendData');
jest.mock('../../../src/contexts/GameContext');

describe('useVeranke', () => {
  const mockSendComplete = jest.fn();
  const mockSendExposed = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    (useSendData as jest.Mock).mockReturnValue({
      sendComplete: mockSendComplete,
      sendExposed: mockSendExposed,
    });
  });

  it('should initialize values from context data when currentTable is 0', () => {
    (useGameContext as jest.Mock).mockReturnValue({
      data: {
        exposed: 5,
        tables: [
          { completeVeranke: true },
          { completeVeranke: false },
        ],
      },
      currentTable: 0,
    });

    const { result } = renderHook(() => useVeranke());

    waitFor(() => {
      expect(result.current.exposed).toBe(5);
      expect(result.current.completed).toBe(true);
    });
  });

  it('should initialize completed as false when no tables have completeVeranke', () => {
    (useGameContext as jest.Mock).mockReturnValue({
      data: {
        exposed: 3,
        tables: [
          { completeVeranke: false },
          { completeVeranke: false },
        ],
      },
      currentTable: 0,
    });

    const { result } = renderHook(() => useVeranke());

    waitFor(() => {
      expect(result.current.completed).toBe(false);
    });
  });

  it('should initialize values from specific table when currentTable is set', () => {
    (useGameContext as jest.Mock).mockReturnValue({
      data: {
        exposed: 5,
        tables: [
          { completeVeranke: false },
          { completeVeranke: true },
        ],
      },
      currentTable: 2,
    });

    const { result } = renderHook(() => useVeranke());

    waitFor(() => {
      expect(result.current.completed).toBe(true);
    });
  });

  it('should update exposed when context data changes', () => {
    (useGameContext as jest.Mock).mockReturnValue({
      data: {
        exposed: 5,
        tables: [],
      },
      currentTable: 0,
    });

    const { result, rerender } = renderHook(() => useVeranke());

    (useGameContext as jest.Mock).mockReturnValue({
      data: {
        exposed: 10,
        tables: [],
      },
      currentTable: 0,
    });

    rerender();

    waitFor(() => {
      expect(result.current.exposed).toBe(10);
    });
  });

  it('should complete veranke and return true on success', async () => {
    (useGameContext as jest.Mock).mockReturnValue({
      data: {
        exposed: 5,
        tables: [],
      },
      currentTable: 1,
    });

    mockSendComplete.mockResolvedValue(true);

    const { result } = renderHook(() => useVeranke());

    let returnValue;
    await act(async () => {
      returnValue = await result.current.complete();
    });

    expect(mockSendComplete).toHaveBeenCalledTimes(1);
    expect(result.current.completed).toBe(true);
    expect(returnValue).toBe(true);
  });

  it('should return false and log error on complete failure', async () => {
    const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation();
    const error = new Error('Test error');
    
    (useGameContext as jest.Mock).mockReturnValue({
      data: {
        exposed: 5,
        tables: [],
      },
      currentTable: 1,
    });

    mockSendComplete.mockRejectedValue(error);

    const { result } = renderHook(() => useVeranke());

    let returnValue;
    await act(async () => {
      returnValue = await result.current.complete();
    });

    expect(returnValue).toBe(false);
    expect(consoleErrorSpy).toHaveBeenCalledWith('Error al cargar los datos', error);

    consoleErrorSpy.mockRestore();
  });

  it('should change exposed and return true on success', async () => {
    (useGameContext as jest.Mock).mockReturnValue({
      data: {
        exposed: 5,
        tables: [],
      },
      currentTable: 1,
    });

    mockSendExposed.mockResolvedValue({ exposed: 8 });

    const { result } = renderHook(() => useVeranke());

    let returnValue;
    await act(async () => {
      returnValue = await result.current.changeExposed(8);
    });

    expect(mockSendExposed).toHaveBeenCalledWith(8);
    expect(result.current.exposed).toBe(8);
    expect(returnValue).toBe(true);
  });

  it('should return false and log error on changeExposed failure', async () => {
    const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation();
    const error = new Error('Test error');
    
    (useGameContext as jest.Mock).mockReturnValue({
      data: {
        exposed: 5,
        tables: [],
      },
      currentTable: 1,
    });

    mockSendExposed.mockRejectedValue(error);

    const { result } = renderHook(() => useVeranke());

    let returnValue;
    await act(async () => {
      returnValue = await result.current.changeExposed(10);
    });

    expect(returnValue).toBe(false);
    expect(consoleErrorSpy).toHaveBeenCalledWith('Error al cargar los datos', error);

    consoleErrorSpy.mockRestore();
  });
});
