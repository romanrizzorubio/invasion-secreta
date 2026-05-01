import styled from 'styled-components';
import { Size, SizeDict } from '../../types/Dicts';

export const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: start;
  gap: 1rem;
`;

export const StyledInput = styled.input<{ $size: Size }>`
  border-radius: 4px;
  background-color: ${({ theme }) => theme.colors.background.primary};
  color: ${({ theme }) => theme.colors.text.primary};
  border: none;
  padding: 0.5rem;
  width: ${({ $size }) => {
    const scales: Record<Size, string> = {
      [SizeDict.S]: '8px',
      [SizeDict.M]: '16px',
      [SizeDict.L]: '32px',
    };

    return scales[$size];
  }};
  height: ${({ $size }) => {
    const scales: Record<Size, string> = {
      [SizeDict.S]: '8px',
      [SizeDict.M]: '16px',
      [SizeDict.L]: '32px',
    };

    return scales[$size];
  }};
  transform: ${({ $size }) => {
    const scales: Record<Size, string> = {
      [SizeDict.S]: 'scale(1)',
      [SizeDict.M]: 'scale(1.5)',
      [SizeDict.L]: 'scale(2)',
    };

    return scales[$size];
  }};
  transform-origin: left center;
`;
