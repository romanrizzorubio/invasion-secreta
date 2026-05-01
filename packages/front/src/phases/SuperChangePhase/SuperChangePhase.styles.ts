import styled from 'styled-components';

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  gap: 1rem;
  width: 100%;

  @media (min-width: 769px) {
    height: 100%;
    padding: 1rem;
  }
`;
