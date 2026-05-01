import { renderHook, act } from '@testing-library/react';
import { useSetTable } from '../../../src/hooks/useSetTable';
import { useGameContext } from '../../../src/contexts/GameContext';

jest.mock('../../../src/contexts/GameContext');

describe('useSetTable', () => {
  const mockSetCurrentTable = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    (useGameContext as jest.Mock).mockReturnValue({
      setCurrentTable: mockSetCurrentTable,
    });
  });

  it('should initialize table as undefined', () => {
    const { result } = renderHook(() => useSetTable());

    expect(result.current.table).toBeUndefined();
  });

  it('should change table value', () => {
    const { result } = renderHook(() => useSetTable());

    act(() => {
      result.current.changeTable(5);
    });

    expect(result.current.table).toBe(5);
  });

  it('should change table to undefined', () => {
    const { result } = renderHook(() => useSetTable());

    act(() => {
      result.current.changeTable(3);
    });

    expect(result.current.table).toBe(3);

    act(() => {
      result.current.changeTable(undefined);
    });

    expect(result.current.table).toBeUndefined();
  });

  it('should save table when table is set', async () => {
    const { result } = renderHook(() => useSetTable());

    act(() => {
      result.current.changeTable(2);
    });

    await act(async () => {
      await result.current.saveTable();
    });

    expect(mockSetCurrentTable).toHaveBeenCalledWith(1);
  });

  it('should not save table when table is undefined', async () => {
    const { result } = renderHook(() => useSetTable());

    await act(async () => {
      await result.current.saveTable();
    });

    expect(mockSetCurrentTable).not.toHaveBeenCalled();
  });
});
