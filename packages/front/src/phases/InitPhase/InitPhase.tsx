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

  const inputValue = useMemo(() => end?.getTime(), [end]);

  return (
    <Wrapper>
      <Input type="time" label="Hora de finalización" value={inputValue} onChange={changeEnd} />
      <Button label="Iniciar" onClick={handleStart} />
    </Wrapper>
  );
};
