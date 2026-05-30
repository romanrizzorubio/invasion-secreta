import { useMemo } from 'react';
import { Bar, Container, Content, Value } from './Progress.styles';
import { StatusBarDict } from '../../types/Dicts';

export type ProgressProps = {
  percentage: number;
  value?: number;
  invert?: boolean;
  label?: string;
  hasBackground?: boolean;
};

export const Progress = ({
  percentage,
  value,
  label,
  invert = false,
  hasBackground = false,
}: ProgressProps) => {
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
    <Container $hasBackground={hasBackground}>
      <Bar $percentage={percentage} $status={status} />
      <Content>
        <Value>
          {value !== undefined ? value : percentage}
          {label && ` (${label})`}
        </Value>
      </Content>
    </Container>
  );
};
