import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.lg};
`;

export const ListCard = styled.div`
  background-color: ${({ theme }) => theme.colors.white};
  border-radius: ${({ theme }) => theme.borderRadius.xl};
  border: 1px solid ${({ theme }) => theme.colors.slate[200]};
  overflow: hidden;
`;

export const ListHeader = styled.div`
  padding: ${({ theme }) => theme.spacing.md};
  background-color: ${({ theme }) => theme.colors.slate[50]};
  font-weight: bold;
  font-size: 0.875rem;
  color: ${({ theme }) => theme.colors.slate[700]};
  border-bottom: 1px solid ${({ theme }) => theme.colors.slate[200]};
`;

export const ListContent = styled.div`
  max-height: 500px;
  overflow-y: auto;
`;

export const ListItem = styled.div`
  padding: ${({ theme }) => theme.spacing.md};
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;
  gap: ${({ theme }) => theme.spacing.md};
  border-bottom: 1px solid ${({ theme }) => theme.colors.slate[100]};
  transition: background-color ${({ theme }) => theme.transitions.fast};

  &:hover {
    background-color: ${({ theme }) => theme.colors.slate[50]};
  }

  &:last-child {
    border-bottom: none;
  }

  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    flex-direction: row;
    align-items: center;
  }
`;

export const ItemInfo = styled.div`
  flex: 1;
`;

export const ItemName = styled.p`
  font-weight: bold;
  font-size: 0.875rem;
  color: ${({ theme }) => theme.colors.slate[800]};
  margin-bottom: 0.25rem;
`;

export const ItemRole = styled.p`
  font-size: 0.75rem;
  font-weight: bold;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.primary};
  margin-bottom: 0.25rem;
`;

export const ItemDetails = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 0.25rem 1rem;
  font-size: 0.625rem;
  color: ${({ theme }) => theme.colors.slate[500]};
`;

export const DeleteIconButton = styled.button`
  background: none;
  border: none;
  padding: 0.5rem;
  cursor: pointer;
  color: ${({ theme }) => theme.colors.slate[300]};
  transition: color ${({ theme }) => theme.transitions.normal};

  &:hover {
    color: ${({ theme }) => theme.colors.danger};
  }
`;
