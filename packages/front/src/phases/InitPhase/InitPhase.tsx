import { Wrapper } from './InitPhase.styles';
import { Button } from '../../ui/Button/Button';
import { useCallback, useMemo } from 'react';
import { Input } from '../../ui/Input/Input';
import { useInit } from '../../hooks/useInit';

export const InitPhase = () => {
  const { end, changeEnd, initGame } = useInit();

  const handleStart = useCallback(() => {
    initGame();
  }, [initGame]);

  const timeValue = useMemo(() => {
    if (!end) return '';
    const hours = end.getHours().toString().padStart(2, '0');
    const minutes = end.getMinutes().toString().padStart(2, '0');
    return `${hours}:${minutes}`;
  }, [end]);

  return (
    <Wrapper>
      <Input type="time" label="Hora de finalización" value={timeValue} onChange={changeEnd} />
      <Button label="Iniciar" onClick={handleStart} />
    </Wrapper>
  );
};
