import styled, { keyframes } from 'styled-components';

const spin = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

export const LoaderContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  width: 100%;
`;

export const SpinnerIcon = styled.div`
  color: ${({ theme }) => theme.colors.primary};
  animation: ${spin} 1s linear infinite;
  
  svg {
    width: 48px;
    height: 48px;
  }
`;
