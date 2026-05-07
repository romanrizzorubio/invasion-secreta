import { useCallback, useEffect, useState } from 'react';
import { useSendData } from './useSendData';
import { useGameContext } from '../contexts/GameContext';

export const useWatchers = () => {
  const [uatu, setUatu] = useState<number | undefined>(undefined);
  const [aron, setAron] = useState<number | undefined>(undefined);
  const [uatuDisabled, setUatuDisabled] = useState(false);

  const { data, currentTable } = useGameContext();
  const { sendUatu, sendAron } = useSendData();

  const changeUatu = useCallback(
    async (next: boolean) => {
      try {
        const data = await sendUatu(next);
        if (data) {
          setUatu(data.uatu);
        }
        return true;
      } catch (error) {
        console.error('Error al cargar los datos', error);
        return false;
      }
    },
    [setUatu, sendUatu],
  );

  const changeAron = useCallback(
    async (next: boolean) => {
      try {
        const data = await sendAron(next);
        if (data) {
          setAron(data.aron);
        }
        return true;
      } catch (error) {
        console.error('Error al cargar los datos', error);
        return false;
      }
    },
    [setAron, sendAron],
  );

  useEffect(() => {
    setUatu(data.uatu);
    setAron(data.aron);
  }, [data.uatu, data.aron, setUatu, setAron]);

  useEffect(() => {
    if (uatu !== undefined && aron !== undefined) {
      if (uatu === 0 && aron === data.tables.length - 1) {
        setUatuDisabled(true);
      } else if (uatu === data.tables.length - 1 && aron === 0) {
        setUatuDisabled(true);
      } else {
        setUatuDisabled(uatu >= aron - 1 && uatu <= aron + 1);
      }
    }
  }, [uatu, aron, data.tables.length, setUatuDisabled]);

  return {
    currentTable,
    uatu,
    aron,
    uatuDisabled,
    changeUatu,
    changeAron,
  };
};
