import { renderHook, act, waitFor } from '@testing-library/react';
import { useSuper } from '../../../src/hooks/useSuper';
import { useSendData } from '../../../src/hooks/useSendData';
import { useGameContext } from '../../../src/contexts/GameContext';

jest.mock('../../../src/hooks/useSendData');
jest.mock('../../../src/contexts/GameContext');

describe('useSuper', () => {
  const mockSendSpiderWoman = jest.fn();
  const mockSendSuperLife = jest.fn();
  const mockSendSuperPlan = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    (useSendData as jest.Mock).mockReturnValue({
      sendSpiderWoman: mockSendSpiderWoman,
      sendSuperLife: mockSendSuperLife,
      sendSuperPlan: mockSendSuperPlan,
    });
    (useGameContext as jest.Mock).mockReturnValue({
      data: {
        spiderWomanTotal: 5,
        spiderWomanOwn: 2,
        superLife: 3,
        superPlan: 4,
      },
    });
  });

  it('should initialize values from context data', () => {
    const { result } = renderHook(() => useSuper());

    waitFor(() => {
      expect(result.current.spiderWomanTotal).toBe(5);
      expect(result.current.spiderWomanOwn).toBe(2);
      expect(result.current.superLife).toBe(3);
      expect(result.current.superPlan).toBe(4);
    });
  });

  it('should update values when context data changes', () => {
    const { result, rerender } = renderHook(() => useSuper());

    (useGameContext as jest.Mock).mockReturnValue({
      data: {
        spiderWomanTotal: 10,
        spiderWomanOwn: 5,
        superLife: 7,
        superPlan: 8,
      },
    });

    rerender();

    waitFor(() => {
      expect(result.current.spiderWomanTotal).toBe(10);
      expect(result.current.spiderWomanOwn).toBe(5);
      expect(result.current.superLife).toBe(7);
      expect(result.current.superPlan).toBe(8);
    });
  });

  it('should change spider woman and return true on success', async () => {
    mockSendSpiderWoman.mockResolvedValue({ spiderWomanTotal: 8, spiderWomanOwn: 3 });

    const { result } = renderHook(() => useSuper());

    let returnValue;
    await act(async () => {
      returnValue = await result.current.changeSpiderWoman(8);
    });

    expect(mockSendSpiderWoman).toHaveBeenCalledWith(8);
    expect(result.current.spiderWomanTotal).toBe(8);
    expect(result.current.spiderWomanOwn).toBe(3);
    expect(returnValue).toBe(true);
  });

  it('should change spider woman without spiderWomanOwn', async () => {
    mockSendSpiderWoman.mockResolvedValue({ spiderWomanTotal: 6 });

    const { result } = renderHook(() => useSuper());

    await act(async () => {
      await result.current.changeSpiderWoman(6);
    });

    expect(result.current.spiderWomanTotal).toBe(6);
  });

  it('should return false and log error on spider woman failure', async () => {
    const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation();
    const error = new Error('Test error');
    mockSendSpiderWoman.mockRejectedValue(error);

    const { result } = renderHook(() => useSuper());

    let returnValue;
    await act(async () => {
      returnValue = await result.current.changeSpiderWoman(5);
    });

    expect(returnValue).toBe(false);
    expect(consoleErrorSpy).toHaveBeenCalledWith('Error al cargar los datos', error);

    consoleErrorSpy.mockRestore();
  });

  it('should change super life and return true on success', async () => {
    mockSendSuperLife.mockResolvedValue({ superLife: 6 });

    const { result } = renderHook(() => useSuper());

    let returnValue;
    await act(async () => {
      returnValue = await result.current.changeSuperLife(6);
    });

    expect(mockSendSuperLife).toHaveBeenCalledWith(6);
    expect(result.current.superLife).toBe(6);
    expect(returnValue).toBe(true);
  });

  it('should return false and log error on super life failure', async () => {
    const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation();
    const error = new Error('Test error');
    mockSendSuperLife.mockRejectedValue(error);

    const { result } = renderHook(() => useSuper());

    let returnValue;
    await act(async () => {
      returnValue = await result.current.changeSuperLife(5);
    });

    expect(returnValue).toBe(false);
    expect(consoleErrorSpy).toHaveBeenCalledWith('Error al cargar los datos', error);

    consoleErrorSpy.mockRestore();
  });

  it('should change super plan and return true on success', async () => {
    mockSendSuperPlan.mockResolvedValue({ superPlan: 9 });

    const { result } = renderHook(() => useSuper());

    let returnValue;
    await act(async () => {
      returnValue = await result.current.changeSuperPlan(9);
    });

    expect(mockSendSuperPlan).toHaveBeenCalledWith(9);
    expect(result.current.superPlan).toBe(9);
    expect(returnValue).toBe(true);
  });

  it('should return false and log error on super plan failure', async () => {
    const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation();
    const error = new Error('Test error');
    mockSendSuperPlan.mockRejectedValue(error);

    const { result } = renderHook(() => useSuper());

    let returnValue;
    await act(async () => {
      returnValue = await result.current.changeSuperPlan(7);
    });

    expect(returnValue).toBe(false);
    expect(consoleErrorSpy).toHaveBeenCalledWith('Error al cargar los datos', error);

    consoleErrorSpy.mockRestore();
  });
});
