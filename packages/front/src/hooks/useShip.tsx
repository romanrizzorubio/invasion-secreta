import { useCallback, useEffect, useState } from 'react';
import { useSendData } from './useSendData';
import { useGameContext } from '../contexts/GameContext';

export const useShip = () => {
  const [ship, setShip] = useState(0);
  const [shipValue, setShipValue] = useState(0);

  const { data } = useGameContext();
  const { sendShip } = useSendData();

  const addShipCounter = useCallback(async () => {
    try {
      const data = await sendShip();
      if (data) {
        setShip(data.ship);
        setShipValue(data.shipValue);
      }
      return true;
    } catch (error) {
      console.error('Error al cargar los datos', error);
      return false;
    }
  }, [sendShip]);

  useEffect(() => {
    setShip(data.ship);
    setShipValue(data.shipValue);
  }, [data, setShip]);

  return {
    ship,
    shipValue,
    addShipCounter,
  };
};
