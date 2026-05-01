import styled from 'styled-components';
import { Size, SizeDict } from '../../types/Dicts';

export const StyledButton = styled.button<{ $size: Size; disabled: boolean }>`
  border-radius: 16px;
  background-color: ${({ theme }) => theme.colors.background.tertiary};
  color: ${({ theme }) => theme.colors.text.tertiary};
  opacity: ${({ disabled }) => (disabled ? 0.5 : 1)};
  margin: 8px;
  min-width: 40px;
  text-decoration: none;
  text-align: center;
  display: inline-block;
  vertical-align: baseline;
  font-weight: bolder;
  border: none;
  cursor: pointer;
  padding: ${({ $size }) => ($size === SizeDict.S ? '0.5rem' : '1rem')};
  font-size: ${({ $size, theme }) => {
    const sizes: Record<Size, string> = {
      [SizeDict.S]: theme.typography.sizes.M,
      [SizeDict.M]: theme.typography.sizes.L,
      [SizeDict.L]: theme.typography.sizes.XL,
    };

    return sizes[$size];
  }};
`;
