import { useCallback, useEffect, useState } from 'react';
import { useSendData } from './useSendData';
import { useGameContext } from '../contexts/GameContext';

export const useSuper = () => {
  const [spiderWomanTotal, setSpiderWomanTotal] = useState(0);
  const [spiderWomanOwn, setSpiderWomanOwn] = useState<number | undefined>(undefined);
  const [superLife, setSuperLife] = useState(0);
  const [superPlan, setSuperPlan] = useState(0);

  const { data } = useGameContext();
  const { sendSuperPlan, sendSuperLife, sendSpiderWoman } = useSendData();

  const changeSpiderWoman = useCallback(
    async (value: number) => {
      try {
        const data = await sendSpiderWoman(value);
        if (data) {
          setSpiderWomanTotal(data.spiderWomanTotal);
          data.spiderWomanOwn && setSpiderWomanOwn(data.spiderWomanOwn);
        }
        return true;
      } catch (error) {
        console.error('Error al cargar los datos', error);
        return false;
      }
    },
    [setSpiderWomanTotal, setSpiderWomanOwn, sendSpiderWoman],
  );

  const changeSuperLife = useCallback(
    async (value: number) => {
      try {
        const data = await sendSuperLife(value);
        if (data) {
          setSuperLife(data.superLife);
        }
        return true;
      } catch (error) {
        console.error('Error al cargar los datos', error);
        return false;
      }
    },
    [setSuperLife, sendSuperLife],
  );

  const changeSuperPlan = useCallback(
    async (value: number) => {
      try {
        const data = await sendSuperPlan(value);
        if (data) {
          setSuperPlan(data.superPlan);
        }
        return true;
      } catch (error) {
        console.error('Error al cargar los datos', error);
        return false;
      }
    },
    [sendSuperPlan, setSuperPlan],
  );

  useEffect(() => {
    setSpiderWomanTotal(data.spiderWomanTotal);
    data.spiderWomanOwn && setSpiderWomanOwn(data.spiderWomanOwn);
    setSuperLife(data.superLife);
    setSuperPlan(data.superPlan);
  }, [
    data.spiderWomanTotal,
    data.spiderWomanOwn,
    data.superLife,
    data.superPlan,
    setSpiderWomanTotal,
    setSpiderWomanOwn,
    setSuperLife,
    setSuperPlan,
  ]);

  return {
    spiderWomanTotal,
    spiderWomanOwn,
    superLife,
    superPlan,
    changeSpiderWoman,
    changeSuperLife,
    changeSuperPlan,
  };
};
