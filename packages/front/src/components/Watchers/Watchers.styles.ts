import styled from 'styled-components';

export const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  gap: 2rem;
  width: 100%;
  height: 33%;

  @media (min-width: 769px) {
    flex-direction: row;

    > * {
      flex: 1 1 0;
      min-width: 0;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
    }
  }
`;
