import styled, { css } from 'styled-components';

const buttonVariants = {
  primary: css`
    background-color: ${({ theme }) => theme.colors.primary};
    color: ${({ theme }) => theme.colors.white};
    box-shadow: ${({ theme }) => theme.shadows.lg};

    &:hover:not(:disabled) {
      background-color: ${({ theme }) => theme.colors.primaryHover};
    }
  `,
  secondary: css`
    background-color: ${({ theme }) => theme.colors.slate[900]};
    color: ${({ theme }) => theme.colors.white};

    &:hover:not(:disabled) {
      background-color: ${({ theme }) => theme.colors.slate[800]};
    }
  `,
  danger: css`
    background-color: transparent;
    color: ${({ theme }) => theme.colors.slate[300]};

    &:hover:not(:disabled) {
      color: ${({ theme }) => theme.colors.danger};
    }
  `,
  ghost: css`
    background-color: transparent;
    color: ${({ theme }) => theme.colors.slate[700]};

    &:hover:not(:disabled) {
      background-color: ${({ theme }) => theme.colors.slate[100]};
    }
  `,
};

export const StyledButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  padding: ${({ $size }) => ($size === 'sm' ? '0.5rem 1rem' : '0.75rem 1rem')};
  font-weight: ${({ $size }) => ($size === 'sm' ? '500' : 'bold')};
  font-size: ${({ $size }) => ($size === 'sm' ? '0.875rem' : '1rem')};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  transition: all ${({ theme }) => theme.transitions.normal};
  width: ${({ $fullWidth }) => ($fullWidth ? '100%' : 'auto')};
  cursor: ${({ disabled }) => (disabled ? 'not-allowed' : 'pointer')};
  opacity: ${({ disabled }) => (disabled ? 0.6 : 1)};

  ${({ $variant }) => buttonVariants[$variant || 'primary']}

  &:disabled {
    cursor: not-allowed;
  }
`;
