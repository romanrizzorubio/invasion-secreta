import { useCallback, useEffect, useState } from 'react';
import { useSendData } from './useSendData';
import { useGameContext } from '../contexts/GameContext';

export const useSuper = () => {
  const [spiderWomanTotal, setSpiderWomanTotal] = useState(0);
  const [spiderWomanTotalValue, setSpiderWomanTotalValue] = useState(0);
  const [spiderWomanOwn, setSpiderWomanOwn] = useState<number | undefined>(undefined);
  const [spiderWomanOwnValue, setSpiderWomanOwnValue] = useState<number | undefined>(undefined);
  const [superLife, setSuperLife] = useState(0);
  const [superLifeValue, setSuperLifeValue] = useState(0);
  const [superPlan, setSuperPlan] = useState(0);
  const [superPlanValue, setSuperPlanValue] = useState(0);

  const { data } = useGameContext();
  const { sendSuperPlan, sendSuperLife, sendSpiderWoman } = useSendData();

  const changeSpiderWoman = useCallback(
    async (value: number) => {
      try {
        const data = await sendSpiderWoman(value);
        if (data) {
          setSpiderWomanTotal(data.spiderWomanTotal);
          setSpiderWomanTotalValue(data.spiderWomanTotalValue);
          if (data.spiderWomanOwn) {
            setSpiderWomanOwn(data.spiderWomanOwn);
            setSpiderWomanOwnValue(data.spiderWomanOwnValue);
          }
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
          setSuperLifeValue(data.superLifeValue);
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
          setSuperPlanValue(data.superPlanValue);
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
    setSpiderWomanTotalValue(data.spiderWomanTotalValue);
    data.spiderWomanOwn && setSpiderWomanOwn(data.spiderWomanOwn);
    data.spiderWomanOwnValue && setSpiderWomanOwnValue(data.spiderWomanOwnValue);
    setSuperLife(data.superLife);
    setSuperLifeValue(data.superLifeValue);
    setSuperPlan(data.superPlan);
    setSuperPlanValue(data.superPlanValue);
  }, [
    data.spiderWomanTotal,
    data.spiderWomanTotalValue,
    data.spiderWomanOwn,
    data.spiderWomanOwnValue,
    data.superLife,
    data.superLifeValue,
    data.superPlan,
    data.superPlanValue,
    setSpiderWomanTotal,
    setSpiderWomanTotalValue,
    setSpiderWomanOwn,
    setSpiderWomanOwnValue,
    setSuperLife,
    setSuperLifeValue,
    setSuperPlan,
    setSuperPlanValue,
  ]);

  return {
    spiderWomanTotal,
    spiderWomanTotalValue,
    spiderWomanOwn,
    spiderWomanOwnValue,
    superLife,
    superLifeValue,
    superPlan,
    superPlanValue,
    changeSpiderWoman,
    changeSuperLife,
    changeSuperPlan,
  };
};
