import { useCallback, useState } from 'react';
import { useGameContext } from '../contexts/GameContext';

export const useSetTable = () => {
  const [table, setTable] = useState<number | undefined>();

  const { setCurrentTable } = useGameContext();

  const changeTable = useCallback(
    (value: number | undefined) => {
      setTable(value);
    },
    [setTable],
  );

  const saveTable = useCallback(async () => {
    table && setCurrentTable(table - 1);
  }, [table, setCurrentTable]);

  return {
    table,
    changeTable,
    saveTable,
  };
};
