import { renderHook, act } from '@testing-library/react';
import { useInit } from '../../../src/hooks/useInit';
import { resetService } from '../../../src/data/services/reset';
import { startTablesService } from '../../../src/data/services/startTables';
import { initService } from '../../../src/data/services/init';
import { useGameContext } from '../../../src/contexts/GameContext';

jest.mock('../../../src/data/services/reset');
jest.mock('../../../src/data/services/startTables');
jest.mock('../../../src/data/services/init');
jest.mock('../../../src/contexts/GameContext');

describe('useInit', () => {
  const mockSetData = jest.fn();
  const mockDate = new Date('2024-12-31T23:59:59');

  beforeEach(() => {
    jest.clearAllMocks();
    (useGameContext as jest.Mock).mockReturnValue({
      data: { end: mockDate },
      setData: mockSetData,
    });
  });

  it('should reset data successfully', async () => {
    const resetData = { phase: 1, enemy: 0 };
    (resetService as jest.Mock).mockResolvedValue(resetData);

    const { result } = renderHook(() => useInit());

    let returnValue;
    await act(async () => {
      returnValue = await result.current.resetData();
    });

    expect(resetService).toHaveBeenCalledTimes(1);
    expect(mockSetData).toHaveBeenCalledWith({
      ...resetData,
      end: undefined,
    });
    expect(returnValue).toEqual(resetData);
  });

  it('should return false and log error on reset failure', async () => {
    const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation();
    const error = new Error('Reset error');
    (resetService as jest.Mock).mockRejectedValue(error);

    const { result } = renderHook(() => useInit());

    let returnValue;
    await act(async () => {
      returnValue = await result.current.resetData();
    });

    expect(returnValue).toBe(false);
    expect(consoleErrorSpy).toHaveBeenCalledWith('Error al cargar los datos', error);

    consoleErrorSpy.mockRestore();
  });

  it('should initialize game successfully when end is set', async () => {
    (initService as jest.Mock).mockResolvedValue(true);

    const { result } = renderHook(() => useInit());

    let returnValue;
    await act(async () => {
      returnValue = await result.current.initGame();
    });

    expect(initService).toHaveBeenCalledWith(mockDate);
    expect(returnValue).toBe(true);
  });

  it('should return false when end is not set', async () => {
    (useGameContext as jest.Mock).mockReturnValue({
      data: { end: undefined },
      setData: mockSetData,
    });

    const { result } = renderHook(() => useInit());

    let returnValue;
    await act(async () => {
      returnValue = await result.current.initGame();
    });

    expect(initService).not.toHaveBeenCalled();
    expect(returnValue).toBe(false);
  });

  it('should return false and log error on init failure', async () => {
    const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation();
    const error = new Error('Init error');
    (initService as jest.Mock).mockRejectedValue(error);

    const { result } = renderHook(() => useInit());

    let returnValue;
    await act(async () => {
      returnValue = await result.current.initGame();
    });

    expect(returnValue).toBe(false);
    expect(consoleErrorSpy).toHaveBeenCalledWith('Error al cargar los datos', error);

    consoleErrorSpy.mockRestore();
  });

  it('should start tables successfully', async () => {
    (startTablesService as jest.Mock).mockResolvedValue(true);

    const { result } = renderHook(() => useInit());

    let returnValue;
    await act(async () => {
      returnValue = await result.current.startTables();
    });

    expect(startTablesService).toHaveBeenCalledTimes(1);
    expect(returnValue).toBe(true);
  });

  it('should return false and log error on start tables failure', async () => {
    const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation();
    const error = new Error('Start tables error');
    (startTablesService as jest.Mock).mockRejectedValue(error);

    const { result } = renderHook(() => useInit());

    let returnValue;
    await act(async () => {
      returnValue = await result.current.startTables();
    });

    expect(returnValue).toBe(false);
    expect(consoleErrorSpy).toHaveBeenCalledWith('Error al cargar los datos', error);

    consoleErrorSpy.mockRestore();
  });

  it('should change end with Date object', () => {
    const { result } = renderHook(() => useInit());

    const newDate = new Date('2025-01-01T00:00:00');

    act(() => {
      result.current.changeEnd(newDate);
    });

    expect(mockSetData).toHaveBeenCalledWith(expect.any(Function));
    const updater = mockSetData.mock.calls[0][0];
    const prevData = { some: 'data' };
    expect(updater(prevData)).toEqual({
      ...prevData,
      end: newDate,
    });
  });

  it('should change end with string and convert to Date', () => {
    const { result } = renderHook(() => useInit());

    const dateString = '2025-01-01T00:00:00';

    act(() => {
      result.current.changeEnd(dateString);
    });

    expect(mockSetData).toHaveBeenCalledWith(expect.any(Function));
    const updater = mockSetData.mock.calls[0][0];
    const prevData = { some: 'data' };
    expect(updater(prevData)).toEqual({
      ...prevData,
      end: new Date(dateString),
    });
  });

  it('should return end from context', () => {
    const { result } = renderHook(() => useInit());

    expect(result.current.end).toEqual(mockDate);
  });
});
