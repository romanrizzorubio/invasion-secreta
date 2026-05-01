import { renderHook, act, waitFor } from '@testing-library/react';
import { useEnemy } from '../../../src/hooks/useEnemy';
import { useSendData } from '../../../src/hooks/useSendData';
import { useGameContext } from '../../../src/contexts/GameContext';

jest.mock('../../../src/hooks/useSendData');
jest.mock('../../../src/contexts/GameContext');

describe('useEnemy', () => {
  const mockSendEnemy = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    (useSendData as jest.Mock).mockReturnValue({
      sendEnemy: mockSendEnemy,
    });
    (useGameContext as jest.Mock).mockReturnValue({
      data: { enemy: 5 },
    });
  });

  it('should initialize enemy from context data', () => {
    const { result } = renderHook(() => useEnemy());

    expect(result.current.enemy).toBe(5);
  });

  it('should update enemy when context data changes', () => {
    const { result, rerender } = renderHook(() => useEnemy());

    expect(result.current.enemy).toBe(5);

    (useGameContext as jest.Mock).mockReturnValue({
      data: { enemy: 10 },
    });

    rerender();

    waitFor(() => {
      expect(result.current.enemy).toBe(10);
    });
  });

  it('should change enemy and return true on success', async () => {
    mockSendEnemy.mockResolvedValue({ enemy: 8 });

    const { result } = renderHook(() => useEnemy());

    let returnValue;
    await act(async () => {
      returnValue = await result.current.changeEnemy(8);
    });

    expect(mockSendEnemy).toHaveBeenCalledWith(8);
    expect(result.current.enemy).toBe(8);
    expect(returnValue).toBe(true);
  });

  it('should return false and log error on failure', async () => {
    const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation();
    const error = new Error('Test error');
    mockSendEnemy.mockRejectedValue(error);

    const { result } = renderHook(() => useEnemy());

    let returnValue;
    await act(async () => {
      returnValue = await result.current.changeEnemy(10);
    });

    expect(returnValue).toBe(false);
    expect(consoleErrorSpy).toHaveBeenCalledWith('Error al cargar los datos', error);

    consoleErrorSpy.mockRestore();
  });
});
