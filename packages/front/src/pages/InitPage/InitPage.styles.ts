import styled from 'styled-components';

export const Wrapper = styled.section`
  text-align: center;
  height: 100vh;
  color: ${({ theme }) => theme.colors.text};
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: row;
  gap: 1rem;
`;
