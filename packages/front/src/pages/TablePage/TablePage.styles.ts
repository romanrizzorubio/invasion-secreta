import styled from 'styled-components';

export const Wrapper = styled.section`
  text-align: center;
  padding: 0 1rem;
`;

export const Heading = styled.h2`
  color: ${({ theme }) => theme.colors.text.quaternary};
  margin: 0;
  font-size: ${({ theme }) => theme.typography.sizes.XXL};
  text-shadow: ${({ theme }) => theme.shadows.primary};
`;

export const Container = styled.div`
  display: flex;
  justify-content: flex-start;
  flex-direction: column;
  width: 100%;
`;
