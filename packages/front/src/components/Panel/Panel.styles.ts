import styled, { css } from 'styled-components';

export const Wrapper = styled.div<{ $img: string }>`
  height: 100%;

  @media (min-width: 769px) {
    background-image: url(${({ $img }) => $img});
    background-size: cover;
    padding: 1rem;
  }
`;

export const ProgressPanel = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
`;

export const Text = styled.p`
  text-align: left;
  font-size: ${({ theme }) => theme.typography.sizes.L};
  line-height: 1.5;
  padding: 1rem;
  margin: 0;
  color: ${({ theme }) => theme.colors.text.quaternary};
  width: 100%;

  @media (min-width: 769px) {
    width: 50%;
    background-color: rgba(0, 0, 0, 0.5);
  }
`;

export const Img = styled.img<{ disabled: boolean }>`
  height: auto;
  width: 100%;

  ${({ disabled }) =>
    disabled &&
    css`
      opacity: 0.5;
    `};

  @media (min-width: 769px) {
    display: none;
    width: auto;
    max-height: 100%;
  }
`;
