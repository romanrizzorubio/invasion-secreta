import { Heading } from './Timer.styles';
import { useTimer } from '../../hooks/useTimer';

export const Timer = () => {
  const { timer, end } = useTimer();

  if (!end) return null;

  return <Heading>{timer}</Heading>;
};
