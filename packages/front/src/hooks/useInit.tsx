import { useCallback } from 'react';
import { resetService } from '../data/services/reset';
import { startTablesService } from '../data/services/startTables';
import { initService } from '../data/services/init';
import { useGameContext } from '../contexts/GameContext';

export const useInit = () => {
  const { data, setData } = useGameContext();

  const resetData = useCallback(async () => {
    try {
      const data = await resetService();
      setData({
        ...data,
        end: undefined,
      });
      return data;
    } catch (error) {
      console.error('Error al cargar los datos', error);
      return false;
    }
  }, [setData]);

  const initGame = useCallback(async () => {
    try {
      if (!data.end) {
        return false;
      }
      await initService(data.end);

      return true;
    } catch (error) {
      console.error('Error al cargar los datos', error);
      return false;
    }
  }, [data.end]);

  const startTables = useCallback(async () => {
    try {
      await startTablesService();

      return true;
    } catch (error) {
      console.error('Error al cargar los datos', error);
      return false;
    }
  }, []);

  const changeEnd = useCallback(
    (value: string | Date) => {
      setData((prevData) => ({
        ...prevData,
        end: value instanceof Date ? value : new Date(value),
      }));
    },
    [setData],
  );

  return {
    end: data.end,
    changeEnd,
    resetData,
    initGame,
    startTables,
  };
};
