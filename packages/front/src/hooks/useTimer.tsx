import { useEffect, useRef, useState } from 'react';
import { useGameContext } from '../contexts/GameContext';
import { useSendData } from './useSendData';
import { PhaseDict } from '../types/Dicts';

export const useTimer = () => {
  const [timer, setTimer] = useState('');
  const interval = useRef<number | null>(null);
  const [now, setNow] = useState(() => new Date());

  const {
    data: { end, phase },
  } = useGameContext();

  const { sendEndTime } = useSendData();

  useEffect(() => {
    interval.current = window.setInterval(() => {
      setNow(new Date());
    }, 1000);

    return () => (interval.current ? window.clearInterval(interval.current) : undefined);
  }, []);

  useEffect(() => {
    const time = end ? new Date(end) : new Date();

    if (
      phase >= PhaseDict.SUPER &&
      phase < PhaseDict.OSBORN_REVEAL &&
      time.getTime() < now.getTime()
    ) {
      sendEndTime();
      interval.current && window.clearInterval(interval.current);
    }

    let hour = time.getHours() - now.getHours();
    let minutesValue = time.getMinutes() - now.getMinutes();
    let secondsValue = time.getSeconds() - now.getSeconds();

    if (secondsValue < 0) {
      secondsValue = 60 + secondsValue;
      minutesValue--;
    }

    if (minutesValue < 0) {
      minutesValue = 60 + minutesValue;
      hour--;
    }

    const minutes = minutesValue < 10 ? `0${minutesValue}` : `${minutesValue}`;
    const seconds = secondsValue < 10 ? `0${secondsValue}` : `${secondsValue}`;

    setTimer(`${hour}:${minutes}:${seconds}`);
  }, [end, now, phase, sendEndTime]);

  return { timer, end };
};
