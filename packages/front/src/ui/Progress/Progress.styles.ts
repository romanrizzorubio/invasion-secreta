import styled from 'styled-components';
import { StatusBar, StatusBarDict } from '../../types/Dicts';

export const Bar = styled.div<{ $percentage: number; $status: StatusBar; $hasChildren: boolean }>`
  background-color: ${({ theme, $status }) =>
    $status === StatusBarDict.LOW
      ? theme.progress.low
      : $status === StatusBarDict.MEDIUM
        ? theme.progress.medium
        : theme.progress.high};
  color: ${({ theme }) => theme.colors.text.secondary};
  pointer-events: none;
  border: 2px solid ${({ theme }) => theme.colors.border};
  width: ${({ $percentage }) => $percentage}%;
  line-height: 1.5;
  font-size: ${({ theme }) => theme.typography.sizes.XXL};
`;
