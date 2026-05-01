import styled from 'styled-components';

export const Container = styled.div`
  min-height: 100vh;
  color: ${({ theme }) => theme.colors.text};
  overflow: hidden;
`;

export const Main = styled.main`
  height: 100%;
`;
