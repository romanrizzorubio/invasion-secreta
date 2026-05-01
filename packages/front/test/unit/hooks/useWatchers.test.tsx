import { renderHook, act, waitFor } from '@testing-library/react';
import { useWatchers } from '../../../src/hooks/useWatchers';
import { useSendData } from '../../../src/hooks/useSendData';
import { useGameContext } from '../../../src/contexts/GameContext';

jest.mock('../../../src/hooks/useSendData');
jest.mock('../../../src/contexts/GameContext');

describe('useWatchers', () => {
  const mockSendUatu = jest.fn();
  const mockSendAron = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    (useSendData as jest.Mock).mockReturnValue({
      sendUatu: mockSendUatu,
      sendAron: mockSendAron,
    });
  });

  it('should initialize values from context data', () => {
    (useGameContext as jest.Mock).mockReturnValue({
      data: {
        uatu: 2,
        aron: 3,
        tables: [{}, {}, {}],
      },
      currentTable: 1,
    });

    const { result } = renderHook(() => useWatchers());

    waitFor(() => {
      expect(result.current.uatu).toBe(2);
      expect(result.current.aron).toBe(3);
      expect(result.current.currentTable).toBe(1);
    });
  });

  it('should update values when context data changes', () => {
    (useGameContext as jest.Mock).mockReturnValue({
      data: {
        uatu: 2,
        aron: 3,
        tables: [{}, {}, {}],
      },
      currentTable: 1,
    });

    const { result, rerender } = renderHook(() => useWatchers());

    (useGameContext as jest.Mock).mockReturnValue({
      data: {
        uatu: 5,
        aron: 6,
        tables: [{}, {}, {}, {}, {}, {}],
      },
      currentTable: 2,
    });

    rerender();

    waitFor(() => {
      expect(result.current.uatu).toBe(5);
      expect(result.current.aron).toBe(6);
    });
  });

  it('should change uatu and return true on success', async () => {
    (useGameContext as jest.Mock).mockReturnValue({
      data: {
        uatu: 2,
        aron: 3,
        tables: [{}, {}, {}],
      },
      currentTable: 1,
    });

    mockSendUatu.mockResolvedValue({ uatu: 3 });

    const { result } = renderHook(() => useWatchers());

    let returnValue;
    await act(async () => {
      returnValue = await result.current.changeUatu(true);
    });

    expect(mockSendUatu).toHaveBeenCalledWith(true);
    expect(result.current.uatu).toBe(3);
    expect(returnValue).toBe(true);
  });

  it('should return false and log error on changeUatu failure', async () => {
    const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation();
    const error = new Error('Test error');
    
    (useGameContext as jest.Mock).mockReturnValue({
      data: {
        uatu: 2,
        aron: 3,
        tables: [{}, {}, {}],
      },
      currentTable: 1,
    });

    mockSendUatu.mockRejectedValue(error);

    const { result } = renderHook(() => useWatchers());

    let returnValue;
    await act(async () => {
      returnValue = await result.current.changeUatu(true);
    });

    expect(returnValue).toBe(false);
    expect(consoleErrorSpy).toHaveBeenCalledWith('Error al cargar los datos', error);

    consoleErrorSpy.mockRestore();
  });

  it('should change aron and return true on success', async () => {
    (useGameContext as jest.Mock).mockReturnValue({
      data: {
        uatu: 2,
        aron: 3,
        tables: [{}, {}, {}],
      },
      currentTable: 1,
    });

    mockSendAron.mockResolvedValue({ aron: 2 });

    const { result } = renderHook(() => useWatchers());

    let returnValue;
    await act(async () => {
      returnValue = await result.current.changeAron(false);
    });

    expect(mockSendAron).toHaveBeenCalledWith(false);
    expect(result.current.aron).toBe(2);
    expect(returnValue).toBe(true);
  });

  it('should return false and log error on changeAron failure', async () => {
    const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation();
    const error = new Error('Test error');
    
    (useGameContext as jest.Mock).mockReturnValue({
      data: {
        uatu: 2,
        aron: 3,
        tables: [{}, {}, {}],
      },
      currentTable: 1,
    });

    mockSendAron.mockRejectedValue(error);

    const { result } = renderHook(() => useWatchers());

    let returnValue;
    await act(async () => {
      returnValue = await result.current.changeAron(true);
    });

    expect(returnValue).toBe(false);
    expect(consoleErrorSpy).toHaveBeenCalledWith('Error al cargar los datos', error);

    consoleErrorSpy.mockRestore();
  });

  it('should set uatuDisabled to true when uatu and aron are adjacent', () => {
    (useGameContext as jest.Mock).mockReturnValue({
      data: {
        uatu: 2,
        aron: 3,
        tables: [{}, {}, {}],
      },
      currentTable: 1,
    });

    const { result } = renderHook(() => useWatchers());

    waitFor(() => {
      expect(result.current.uatuDisabled).toBe(true);
    });
  });

  it('should set uatuDisabled to false when uatu and aron are not adjacent', () => {
    (useGameContext as jest.Mock).mockReturnValue({
      data: {
        uatu: 1,
        aron: 5,
        tables: [{}, {}, {}, {}, {}],
      },
      currentTable: 1,
    });

    const { result } = renderHook(() => useWatchers());

    waitFor(() => {
      expect(result.current.uatuDisabled).toBe(false);
    });
  });

  it('should set uatuDisabled to true when uatu=1 and aron=tables.length', () => {
    (useGameContext as jest.Mock).mockReturnValue({
      data: {
        uatu: 1,
        aron: 5,
        tables: [{}, {}, {}, {}, {}],
      },
      currentTable: 1,
    });

    const { result } = renderHook(() => useWatchers());

    waitFor(() => {
      expect(result.current.uatuDisabled).toBe(true);
    });
  });

  it('should set uatuDisabled to true when uatu=tables.length and aron=1', () => {
    (useGameContext as jest.Mock).mockReturnValue({
      data: {
        uatu: 5,
        aron: 1,
        tables: [{}, {}, {}, {}, {}],
      },
      currentTable: 1,
    });

    const { result } = renderHook(() => useWatchers());

    waitFor(() => {
      expect(result.current.uatuDisabled).toBe(true);
    });
  });
});
