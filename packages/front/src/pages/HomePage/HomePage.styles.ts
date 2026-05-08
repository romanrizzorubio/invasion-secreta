import styled from 'styled-components';

export const Wrapper = styled.section`
  text-align: center;
  display: flex;
  flex-direction: column;
  height: calc(100vh - 2rem);
`;

export const Container = styled.div`
  box-sizing: border-box;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  flex-direction: column;
  gap: 1rem;
  width: 100%;
  flex-grow: 1;
`;
