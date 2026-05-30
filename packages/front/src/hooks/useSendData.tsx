import { useCallback } from 'react';
import { superLifeService } from '../data/services/superLife';
import { superPlanService } from '../data/services/superPlan';
import { advanceService } from '../data/services/advance';
import { shipService } from '../data/services/ship';
import { enemyService } from '../data/services/enemy';
import { useGameContext } from '../contexts/GameContext';
import { spiderWomanService } from '../data/services/spiderWoman';
import { completeService } from '../data/services/complete';
import { exposedService } from '../data/services/exposed';
import { endTimeService } from '../data/services/endTime';
import { uatuService } from '../data/services/uatu';
import { aronService } from '../data/services/aron';

export const useSendData = () => {
  const { currentTable } = useGameContext();

  const sendEndTime = useCallback(async () => {
    try {
      return await endTimeService();
    } catch (error) {
      console.error('Error al cargar los datos', error);
      return false;
    }
  }, []);

  const sendAdvance = useCallback(async () => {
    try {
      return await advanceService(currentTable);
    } catch (error) {
      console.error('Error al cargar los datos', error);
      return false;
    }
  }, [currentTable]);

  const sendSpiderWoman = useCallback(
    async (value: number) => {
      try {
        return await spiderWomanService(value, currentTable);
      } catch (error) {
        console.error('Error al cargar los datos', error);
        return false;
      }
    },
    [currentTable],
  );

  const sendSuperLife = useCallback(
    async (value: number) => {
      try {
        return await superLifeService(value, currentTable);
      } catch (error) {
        console.error('Error al cargar los datos', error);
        return false;
      }
    },
    [currentTable],
  );

  const sendSuperPlan = useCallback(
    async (value: number) => {
      try {
        return await superPlanService(value, currentTable);
      } catch (error) {
        console.error('Error al cargar los datos', error);
        return false;
      }
    },
    [currentTable],
  );

  const sendShip = useCallback(async () => {
    try {
      return await shipService(currentTable);
    } catch (error) {
      console.error('Error al cargar los datos', error);
      return false;
    }
  }, [currentTable]);

  const sendComplete = useCallback(async () => {
    try {
      return await completeService(currentTable);
    } catch (error) {
      console.error('Error al cargar los datos', error);
      return false;
    }
  }, [currentTable]);

  const sendExposed = useCallback(
    async (value: number) => {
      try {
        return await exposedService(value, currentTable);
      } catch (error) {
        console.error('Error al cargar los datos', error);
        return false;
      }
    },
    [currentTable],
  );

  const sendEnemy = useCallback(
    async (value: number) => {
      try {
        return await enemyService(value, currentTable);
      } catch (error) {
        console.error('Error al cargar los datos', error);
        return false;
      }
    },
    [currentTable],
  );

  const sendUatu = useCallback(
    async (next: boolean) => {
      try {
        return await uatuService(next, currentTable);
      } catch (error) {
        console.error('Error al cargar los datos', error);
        return false;
      }
    },
    [currentTable],
  );

  const sendAron = useCallback(
    async (next: boolean) => {
      try {
        return await aronService(next, currentTable);
      } catch (error) {
        console.error('Error al cargar los datos', error);
        return false;
      }
    },
    [currentTable],
  );

  return {
    sendAdvance,
    sendEndTime,
    sendSpiderWoman,
    sendSuperLife,
    sendSuperPlan,
    sendShip,
    sendComplete,
    sendExposed,
    sendEnemy,
    sendUatu,
    sendAron,
  };
};
