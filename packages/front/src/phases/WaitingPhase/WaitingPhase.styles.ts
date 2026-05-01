import styled from 'styled-components';

export const Wrapper = styled.p`
  width: 100%;
  height: 100%;
  padding: 1rem;
  font-size: ${({ theme }) => theme.typography.sizes.XXL};
  font-weight: bolder;
  color: ${({ theme }) => theme.colors.text.quaternary};

  @media (max-width: 425px) {
    font-size: ${({ theme }) => theme.typography.sizes.XL};
  }
`;
