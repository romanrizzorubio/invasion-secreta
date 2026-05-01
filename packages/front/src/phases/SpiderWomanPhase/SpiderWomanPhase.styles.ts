import styled from 'styled-components';

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  gap: 1rem;
  width: 100%;

  @media (min-width: 769px) {
    height: 100%;
  }
`;

export const Text = styled.p`
  text-align: left;
  line-height: 1.5;
  padding: 0 1rem;
`;
