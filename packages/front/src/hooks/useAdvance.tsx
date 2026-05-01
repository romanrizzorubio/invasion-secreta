import { useCallback } from 'react';
import { useSendData } from './useSendData';

export const useAdvance = () => {
  const { sendAdvance } = useSendData();

  const advance = useCallback(async () => {
    try {
      await sendAdvance();

      return true;
    } catch (error) {
      console.error('Error al cargar los datos', error);
      return false;
    }
  }, [sendAdvance]);

  return {
    advance,
  };
};
