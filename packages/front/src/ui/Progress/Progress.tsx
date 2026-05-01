import { useMemo } from 'react';
import { Bar } from './Progress.styles';
import { StatusBarDict } from '../../types/Dicts';

export type ProgressProps = {
  percentage: number;
  invert?: boolean;
  label?: string;
};

export const Progress = ({ percentage, label, invert = false }: ProgressProps) => {
  const status = useMemo(() => {
    if (invert) {
      if (percentage < 33) {
        return StatusBarDict.HIGH;
      } else if (percentage < 66) {
        return StatusBarDict.MEDIUM;
      }
    } else {
      if (percentage > 66) {
        return StatusBarDict.HIGH;
      } else if (percentage > 33) {
        return StatusBarDict.MEDIUM;
      }
    }

    return StatusBarDict.LOW;
  }, [percentage, invert]);

  return (
    <Bar $percentage={percentage} $status={status} $hasChildren={!!label}>
      {label}
    </Bar>
  );
};
