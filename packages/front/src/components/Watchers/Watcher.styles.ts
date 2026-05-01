import styled from 'styled-components';

export const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: start;
  gap: 1rem;
  width: 100%;
  height: 100%;
  align-items: center;

  @media (min-width: 769px) {
    > * {
      flex: 1 1 0;
      min-width: 0;
    }
  }
`;

export const Heading = styled.h2`
  color: ${({ theme }) => theme.colors.text.quaternary};
  margin: 0;
  font-size: ${({ theme }) => theme.typography.sizes.XXL};
  text-shadow: ${({ theme }) => theme.shadows.primary};
  text-align: center;
`;
