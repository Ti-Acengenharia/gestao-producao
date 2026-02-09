import styled from 'styled-components';

export const AppContainer = styled.div`
  min-height: 100vh;
  background-color: ${({ theme }) => theme.colors.background};
  font-family: system-ui, -apple-system, sans-serif;
  color: ${({ theme }) => theme.colors.text};
`;

export const MainContent = styled.main`
  max-width: 1152px;
  margin: 0 auto;
  padding: ${({ theme }) => theme.spacing.md};
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.lg};
`;
