import { renderHook, act, waitFor } from '@testing-library/react';
import { useShip } from '../../../src/hooks/useShip';
import { useSendData } from '../../../src/hooks/useSendData';
import { useGameContext } from '../../../src/contexts/GameContext';

jest.mock('../../../src/hooks/useSendData');
jest.mock('../../../src/contexts/GameContext');

describe('useShip', () => {
  const mockSendShip = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    (useSendData as jest.Mock).mockReturnValue({
      sendShip: mockSendShip,
    });
    (useGameContext as jest.Mock).mockReturnValue({
      data: { ship: 3 },
    });
  });

  it('should initialize ship from context data', () => {
    const { result } = renderHook(() => useShip());

    expect(result.current.ship).toBe(3);
  });

  it('should update ship when context data changes', () => {
    const { result, rerender } = renderHook(() => useShip());

    expect(result.current.ship).toBe(3);

    (useGameContext as jest.Mock).mockReturnValue({
      data: { ship: 7 },
    });

    rerender();

    waitFor(() => {
      expect(result.current.ship).toBe(7);
    });
  });

  it('should add ship counter and return true on success', async () => {
    mockSendShip.mockResolvedValue({ ship: 4 });

    const { result } = renderHook(() => useShip());

    let returnValue;
    await act(async () => {
      returnValue = await result.current.addShipCounter();
    });

    expect(mockSendShip).toHaveBeenCalledTimes(1);
    expect(result.current.ship).toBe(4);
    expect(returnValue).toBe(true);
  });

  it('should return false and log error on failure', async () => {
    const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation();
    const error = new Error('Test error');
    mockSendShip.mockRejectedValue(error);

    const { result } = renderHook(() => useShip());

    let returnValue;
    await act(async () => {
      returnValue = await result.current.addShipCounter();
    });

    expect(returnValue).toBe(false);
    expect(consoleErrorSpy).toHaveBeenCalledWith('Error al cargar los datos', error);

    consoleErrorSpy.mockRestore();
  });
});
