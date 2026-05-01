import styled from 'styled-components';

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  min-width: 200px;
  height: 100%;
  gap: 1rem;
  padding: 0 1rem;
`;

export const Players = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  min-width: 200px;
  height: 100%;
  gap: 2rem;
  margin-bottom: 2rem;
`;

export const Text = styled.p`
  color: ${({ theme }) => theme.colors.text.quaternary};
  font-size: ${({ theme }) => theme.typography.sizes.L};
`;
