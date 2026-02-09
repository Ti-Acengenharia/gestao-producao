import styled from 'styled-components';

export const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
`;

export const Label = styled.label`
  font-size: 0.625rem;
  font-weight: bold;
  color: ${({ theme }) => theme.colors.slate[400]};
  text-transform: uppercase;
`;

export const Input = styled.input`
  width: 100%;
  padding: 0.625rem;
  background-color: ${({ theme }) => theme.colors.slate[50]};
  border: 1px solid ${({ theme }) => theme.colors.slate[200]};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  outline: none;
  transition: border-color ${({ theme }) => theme.transitions.normal};
  font-size: 0.875rem;

  &:focus {
    border-color: ${({ theme }) => theme.colors.primary};
  }

  &::placeholder {
    color: ${({ theme }) => theme.colors.slate[400]};
  }
`;

export const Select = styled.select`
  width: 100%;
  padding: 0.625rem;
  background-color: ${({ theme }) => theme.colors.slate[50]};
  border: 1px solid ${({ theme }) => theme.colors.slate[200]};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  outline: none;
  transition: border-color ${({ theme }) => theme.transitions.normal};
  font-size: 0.875rem;
  cursor: pointer;

  &:focus {
    border-color: ${({ theme }) => theme.colors.primary};
  }
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.md};
`;

export const FormGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(${({ $cols }) => $cols || 1}, 1fr);
  gap: ${({ theme }) => theme.spacing.md};

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    grid-template-columns: 1fr;
  }
`;
