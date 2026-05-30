import { renderHook, act } from '@testing-library/react';
import { useAdvance } from '../../../src/hooks/useAdvance';
import { useSendData } from '../../../src/hooks/useSendData';
import { useGameContext } from '../../../src/contexts/GameContext';

jest.mock('../../../src/hooks/useSendData');
jest.mock('../../../src/contexts/GameContext');

describe('useAdvance', () => {
  const mockSendAdvance = jest.fn();
  const mockSetData = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    (useSendData as jest.Mock).mockReturnValue({
      sendAdvance: mockSendAdvance,
    });
    (useGameContext as jest.Mock).mockReturnValue({
      setData: mockSetData,
    });
  });

  it('should call sendAdvance, update data and return true on success', async () => {
    const mockData = { phase: 9 };
    mockSendAdvance.mockResolvedValue(mockData);

    const { result } = renderHook(() => useAdvance());

    let returnValue;
    await act(async () => {
      returnValue = await result.current.advance();
    });

    expect(mockSendAdvance).toHaveBeenCalledTimes(1);
    expect(mockSetData).toHaveBeenCalledWith(mockData);
    expect(returnValue).toBe(true);
  });

  it('should return false and log error on failure', async () => {
    const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation();
    const error = new Error('Test error');
    mockSendAdvance.mockRejectedValue(error);

    const { result } = renderHook(() => useAdvance());

    let returnValue;
    await act(async () => {
      returnValue = await result.current.advance();
    });

    expect(mockSendAdvance).toHaveBeenCalledTimes(1);
    expect(returnValue).toBe(false);
    expect(consoleErrorSpy).toHaveBeenCalledWith('Error al cargar los datos', error);

    consoleErrorSpy.mockRestore();
  });
});
