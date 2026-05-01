import styled from 'styled-components';
import { Size, SizeDict } from '../../types/Dicts';

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

export const Heading = styled.h2<{ $size: Size }>`
  color: ${({ theme }) => theme.colors.text.quaternary};
  margin: 0;
  text-shadow: ${({ theme }) => theme.shadows.primary};
  font-size: ${({ theme, $size }) => {
    switch ($size) {
      case SizeDict.S:
        return theme.typography.sizes.XL;
      case SizeDict.M:
        return theme.typography.sizes.XXL;
      case SizeDict.L:
        return theme.typography.sizes.XXXL;
    }
  }};

  @media (max-width: 425px) {
    font-size: ${({ theme, $size }) => {
      switch ($size) {
        case SizeDict.S:
          return theme.typography.sizes.L;
        case SizeDict.M:
          return theme.typography.sizes.XL;
        case SizeDict.L:
          return theme.typography.sizes.XXL;
      }
    }};
  }
`;

export const Subtitle = styled.h2<{ $size: Size }>`
  color: ${({ theme }) => theme.colors.text.quaternary};
  margin: 0;
  text-shadow: ${({ theme }) => theme.shadows.primary};
  font-size: ${({ theme, $size }) => {
    switch ($size) {
      case SizeDict.S:
        return theme.typography.sizes.L;
      case SizeDict.M:
        return theme.typography.sizes.XL;
      case SizeDict.L:
        return theme.typography.sizes.XXL;
    }
  }};

  @media (max-width: 425px) {
    font-size: ${({ theme, $size }) => {
      switch ($size) {
        case SizeDict.S:
          return theme.typography.sizes.L;
        case SizeDict.M:
          return theme.typography.sizes.XL;
        case SizeDict.L:
          return theme.typography.sizes.XXL;
      }
    }};
  }
`;

export const StyledTable = styled.table`
  background-color: ${({ theme }) => theme.colors.background.tertiary};
  color: ${({ theme }) => theme.colors.text.tertiary};
  margin: 0 auto;
  border-collapse: collapse;
  border: none;
  font-size: ${({ theme }) => theme.typography.sizes.XL};
`;

export const StyledTableHead = styled.thead`
  color: ${({ theme }) => theme.colors.text.primary};
  border-bottom: 1px solid ${({ theme }) => theme.colors.border.tertiary};
`;

export const StyledTableHeadCell = styled.th`
  padding: 0.5rem;
`;

export const StyledTableCell = styled.td`
  padding: 0.5rem 1rem;
  text-align: left;
`;
