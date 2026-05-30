import styled from 'styled-components';
import { StatusBar, StatusBarDict } from '../../types/Dicts';

export const Container = styled.div<{ $hasBackground?: boolean }>`
  position: relative;
  width: 100%;
  min-height: 2rem;
  background-color: ${({ $hasBackground }) => ($hasBackground ? 'rgba(0, 0, 0, 0.5)' : 'transparent')};
  border: 2px solid ${({ theme }) => theme.colors.border};
  box-sizing: border-box;
  display: flex;
  align-items: center;
  overflow: hidden;
`;

export const Bar = styled.div<{ $percentage: number; $status: StatusBar }>`
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  background-color: ${({ theme, $status }) =>
    $status === StatusBarDict.LOW
      ? theme.progress.low
      : $status === StatusBarDict.MEDIUM
        ? theme.progress.medium
        : theme.progress.high};
  width: ${({ $percentage }) => $percentage}%;
  transition: width 0.3s ease;
  z-index: 1;
`;

export const Content = styled.div`
  position: relative;
  z-index: 2;
  width: 100%;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  color: ${({ theme }) => theme.colors.text.secondary};
  font-size: ${({ theme }) => theme.typography.sizes.XXL};
  white-space: nowrap;
  padding: 0 8px;
  pointer-events: none;
  line-height: 1.5;
`;

export const Value = styled.span``;
