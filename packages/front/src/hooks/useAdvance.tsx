import { useCallback } from 'react';
import { useSendData } from './useSendData';
import { useGameContext } from '../contexts/GameContext';

export const useAdvance = () => {
  const { data, setData, currentTable } = useGameContext();
  const { sendAdvance } = useSendData();

  const advance = useCallback(async () => {
    try {
      console.log('Enviando petición de avance...');
      const result = await sendAdvance();
      console.log('Resultado del avance:', result);

      if (result) {
        setData(result);
      }

      return true;
    } catch (error) {
      console.error('Error al cargar los datos', error);
      return false;
    }
  }, [sendAdvance, setData]);

  return {
    advance,
  };
};
