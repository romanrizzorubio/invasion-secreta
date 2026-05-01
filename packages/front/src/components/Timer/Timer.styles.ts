import styled from 'styled-components';

export const Heading = styled.h2`
  color: ${({ theme }) => theme.colors.text.quaternary};
  margin: 0;
  font-size: ${({ theme }) => theme.typography.sizes.XXXL};
  text-shadow: ${({ theme }) => theme.shadows.primary};

  @media (max-width: 425px) {
    font-size: ${({ theme }) => theme.typography.sizes.XXL};
  }
`;
