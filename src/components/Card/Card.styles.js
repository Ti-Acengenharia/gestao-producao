import styled from 'styled-components';

export const Card = styled.div`
  background-color: ${({ theme }) => theme.colors.white};
  padding: ${({ theme }) => theme.spacing.lg};
  border-radius: ${({ theme }) => theme.borderRadius.xl};
  border: 1px solid ${({ theme }) => theme.colors.slate[200]};
  box-shadow: ${({ theme }) => theme.shadows.sm};
  border-left: 4px solid ${({ $borderColor, theme }) => $borderColor || theme.colors.primary};
`;

export const CardHeader = styled.div`
  margin-bottom: ${({ theme }) => theme.spacing.md};
`;

export const CardTitle = styled.h2`
  font-weight: bold;
  color: ${({ theme }) => theme.colors.slate[800]};
  margin-bottom: 0.25rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 1.125rem;

  svg {
    color: ${({ theme }) => theme.colors.primary};
  }
`;

export const CardSubtitle = styled.p`
  font-size: 0.75rem;
  color: ${({ theme }) => theme.colors.slate[500]};
  margin-left: 1.75rem;
`;

export const CardContent = styled.div`
  /* Conteúdo do card */
`;
