import { useCallback, useEffect, useState } from 'react';
import { useSendData } from './useSendData';
import { useGameContext } from '../contexts/GameContext';

export const useEnemy = () => {
  const [enemy, setEnemy] = useState(0);
  const [enemyValue, setEnemyValue] = useState(0);

  const { data } = useGameContext();
  const { sendEnemy } = useSendData();

  const changeEnemy = useCallback(
    async (value: number) => {
      try {
        const data = await sendEnemy(value);
        if (data) {
          setEnemy(data.enemy);
          setEnemyValue(data.enemyValue);
        }
        return true;
      } catch (error) {
        console.error('Error al cargar los datos', error);
        return false;
      }
    },
    [setEnemy, sendEnemy],
  );

  useEffect(() => {
    setEnemy(data.enemy);
    setEnemyValue(data.enemyValue);
  }, [data]);

  return {
    enemy,
    enemyValue,
    changeEnemy,
  };
};
