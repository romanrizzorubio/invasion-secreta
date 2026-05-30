import { useCallback, useEffect, useState } from 'react';
import { useSendData } from './useSendData';
import { useGameContext } from '../contexts/GameContext';

export const useVeranke = () => {
  const [completed, setCompleted] = useState(false);
  const [exposed, setExposed] = useState(0);
  const [exposedValue, setExposedValue] = useState(0);

  const { data, currentTable } = useGameContext();
  const { sendComplete, sendExposed } = useSendData();

  const complete = useCallback(async () => {
    try {
      await sendComplete();
      setCompleted(true);

      return true;
    } catch (error) {
      console.error('Error al cargar los datos', error);
      return false;
    }
  }, [sendComplete]);

  const changeExposed = useCallback(
    async (value: number) => {
      try {
        const data = await sendExposed(value);
        if (data) {
          setExposed(data.exposed);
          setExposedValue(data.exposedValue);
        }
        return true;
      } catch (error) {
        console.error('Error al cargar los datos', error);
        return false;
      }
    },
    [sendExposed, setExposed],
  );

  useEffect(() => {
    if (currentTable >= 0) {
      const table = data.tables[currentTable];
      setCompleted(Boolean(table?.completeVeranke));
    } else {
      setCompleted(data.tables.some((table) => Boolean(table?.completeVeranke)));
    }
  }, [data, data.tables, currentTable, setCompleted]);

  useEffect(() => {
    setExposed(data.exposed);
    setExposedValue(data.exposedValue);
  }, [data.exposed, data.exposedValue, setExposed]);

  return {
    completed,
    exposed,
    exposedValue,
    complete,
    changeExposed,
  };
};
