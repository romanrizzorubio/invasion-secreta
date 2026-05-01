import { renderHook, act } from '@testing-library/react';
import { useSendData } from '../../../src/hooks/useSendData';
import { superLifeService } from '../../../src/data/services/superLife';
import { superPlanService } from '../../../src/data/services/superPlan';
import { advanceService } from '../../../src/data/services/advance';
import { shipService } from '../../../src/data/services/ship';
import { enemyService } from '../../../src/data/services/enemy';
import { spiderWomanService } from '../../../src/data/services/spiderWoman';
import { completeService } from '../../../src/data/services/complete';
import { exposedService } from '../../../src/data/services/exposed';
import { endTimeService } from '../../../src/data/services/endTime';
import { uatuService } from '../../../src/data/services/uatu';
import { aronService } from '../../../src/data/services/aron';
import { useGameContext } from '../../../src/contexts/GameContext';

jest.mock('../../../src/data/services/superLife');
jest.mock('../../../src/data/services/superPlan');
jest.mock('../../../src/data/services/advance');
jest.mock('../../../src/data/services/ship');
jest.mock('../../../src/data/services/enemy');
jest.mock('../../../src/data/services/spiderWoman');
jest.mock('../../../src/data/services/complete');
jest.mock('../../../src/data/services/exposed');
jest.mock('../../../src/data/services/endTime');
jest.mock('../../../src/data/services/uatu');
jest.mock('../../../src/data/services/aron');
jest.mock('../../../src/contexts/GameContext');

describe('useSendData', () => {
  const mockCurrentTable = 1;

  beforeEach(() => {
    jest.clearAllMocks();
    (useGameContext as jest.Mock).mockReturnValue({
      currentTable: mockCurrentTable,
    });
  });

  it('should send end time successfully', async () => {
    const mockData = { phase: 5 };
    (endTimeService as jest.Mock).mockResolvedValue(mockData);

    const { result } = renderHook(() => useSendData());

    let returnValue;
    await act(async () => {
      returnValue = await result.current.sendEndTime();
    });

    expect(endTimeService).toHaveBeenCalledTimes(1);
    expect(returnValue).toEqual(mockData);
  });

  it('should send advance successfully', async () => {
    const mockData = { phase: 2 };
    (advanceService as jest.Mock).mockResolvedValue(mockData);

    const { result } = renderHook(() => useSendData());

    let returnValue;
    await act(async () => {
      returnValue = await result.current.sendAdvance();
    });

    expect(advanceService).toHaveBeenCalledTimes(1);
    expect(returnValue).toEqual(mockData);
  });

  it('should send spider woman successfully', async () => {
    const mockData = { spiderWomanTotal: 5 };
    (spiderWomanService as jest.Mock).mockResolvedValue(mockData);

    const { result } = renderHook(() => useSendData());

    let returnValue;
    await act(async () => {
      returnValue = await result.current.sendSpiderWoman(5);
    });

    expect(spiderWomanService).toHaveBeenCalledWith(5, mockCurrentTable);
    expect(returnValue).toEqual(mockData);
  });

  it('should send super life successfully', async () => {
    const mockData = { superLife: 3 };
    (superLifeService as jest.Mock).mockResolvedValue(mockData);

    const { result } = renderHook(() => useSendData());

    let returnValue;
    await act(async () => {
      returnValue = await result.current.sendSuperLife(3);
    });

    expect(superLifeService).toHaveBeenCalledWith(3, mockCurrentTable);
    expect(returnValue).toEqual(mockData);
  });

  it('should send super plan successfully', async () => {
    const mockData = { superPlan: 7 };
    (superPlanService as jest.Mock).mockResolvedValue(mockData);

    const { result } = renderHook(() => useSendData());

    let returnValue;
    await act(async () => {
      returnValue = await result.current.sendSuperPlan(7);
    });

    expect(superPlanService).toHaveBeenCalledWith(7, mockCurrentTable);
    expect(returnValue).toEqual(mockData);
  });

  it('should send ship successfully', async () => {
    const mockData = { ship: 2 };
    (shipService as jest.Mock).mockResolvedValue(mockData);

    const { result } = renderHook(() => useSendData());

    let returnValue;
    await act(async () => {
      returnValue = await result.current.sendShip();
    });

    expect(shipService).toHaveBeenCalledWith(mockCurrentTable);
    expect(returnValue).toEqual(mockData);
  });

  it('should send complete successfully', async () => {
    const mockData = { completeVeranke: true };
    (completeService as jest.Mock).mockResolvedValue(mockData);

    const { result } = renderHook(() => useSendData());

    let returnValue;
    await act(async () => {
      returnValue = await result.current.sendComplete();
    });

    expect(completeService).toHaveBeenCalledWith(mockCurrentTable);
    expect(returnValue).toEqual(mockData);
  });

  it('should send exposed successfully', async () => {
    const mockData = { exposed: 4 };
    (exposedService as jest.Mock).mockResolvedValue(mockData);

    const { result } = renderHook(() => useSendData());

    let returnValue;
    await act(async () => {
      returnValue = await result.current.sendExposed(4);
    });

    expect(exposedService).toHaveBeenCalledWith(4, mockCurrentTable);
    expect(returnValue).toEqual(mockData);
  });

  it('should send enemy successfully', async () => {
    const mockData = { enemy: 6 };
    (enemyService as jest.Mock).mockResolvedValue(mockData);

    const { result } = renderHook(() => useSendData());

    let returnValue;
    await act(async () => {
      returnValue = await result.current.sendEnemy(6);
    });

    expect(enemyService).toHaveBeenCalledWith(6, mockCurrentTable);
    expect(returnValue).toEqual(mockData);
  });

  it('should send uatu successfully', async () => {
    const mockData = { uatu: 2 };
    (uatuService as jest.Mock).mockResolvedValue(mockData);

    const { result } = renderHook(() => useSendData());

    let returnValue;
    await act(async () => {
      returnValue = await result.current.sendUatu(true);
    });

    expect(uatuService).toHaveBeenCalledWith(true, mockCurrentTable);
    expect(returnValue).toEqual(mockData);
  });

  it('should send aron successfully', async () => {
    const mockData = { aron: 3 };
    (aronService as jest.Mock).mockResolvedValue(mockData);

    const { result } = renderHook(() => useSendData());

    let returnValue;
    await act(async () => {
      returnValue = await result.current.sendAron(false);
    });

    expect(aronService).toHaveBeenCalledWith(false, mockCurrentTable);
    expect(returnValue).toEqual(mockData);
  });

  it('should return false and log error on failure', async () => {
    const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation();
    const error = new Error('Service error');
    (advanceService as jest.Mock).mockRejectedValue(error);

    const { result } = renderHook(() => useSendData());

    let returnValue;
    await act(async () => {
      returnValue = await result.current.sendAdvance();
    });

    expect(returnValue).toBe(false);
    expect(consoleErrorSpy).toHaveBeenCalledWith('Error al cargar los datos', error);

    consoleErrorSpy.mockRestore();
  });
});
