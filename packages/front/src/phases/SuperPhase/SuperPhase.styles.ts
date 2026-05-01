import styled from 'styled-components';

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  gap: 2rem;
  width: 100%;
  height: 100%;

  @media (min-width: 769px) {
    height: 100%;
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
