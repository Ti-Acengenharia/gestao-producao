import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.lg};
`;

export const HeaderRow = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.sm};

  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    flex-direction: row;
    align-items: center;
  }
`;

export const SearchInput = styled.input`
  flex: 1;
  padding: 0.625rem 0.75rem;
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  border: 1px solid ${({ theme }) => theme.colors.slate[300]};
  font-size: 0.875rem;
  color: ${({ theme }) => theme.colors.slate[800]};

  &::placeholder {
    color: ${({ theme }) => theme.colors.slate[400]};
  }

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.primary};
    box-shadow: 0 0 0 1px ${({ theme }) => theme.colors.primary}33;
  }
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
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid ${({ theme }) => theme.colors.slate[100]};
  transition: background-color ${({ theme }) => theme.transitions.fast};

  &:hover {
    background-color: ${({ theme }) => theme.colors.slate[50]};
  }

  &:last-child {
    border-bottom: none;
  }
`;

export const ItemInfo = styled.div`
  flex: 1;
`;

export const ItemName = styled.p`
  font-weight: bold;
  font-size: 0.875rem;
  color: ${({ theme }) => theme.colors.slate[800]};
  margin-bottom: 0.125rem;
`;

export const ItemUnit = styled.p`
  font-size: 0.75rem;
  color: ${({ theme }) => theme.colors.slate[500]};
`;

export const ItemActions = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.md};
`;

export const ItemPrice = styled.span`
  font-weight: bold;
  font-size: 0.75rem;
  background-color: ${({ theme }) => theme.colors.slate[100]};
  padding: 0.25rem 0.5rem;
  border-radius: ${({ theme }) => theme.borderRadius.sm};
  color: ${({ theme }) => theme.colors.slate[700]};
`;

export const DeleteIconButton = styled.button`
  background: none;
  border: none;
  padding: 0.25rem;
  cursor: pointer;
  color: ${({ theme }) => theme.colors.slate[300]};
  transition: color ${({ theme }) => theme.transitions.normal};

  &:hover {
    color: ${({ theme }) => theme.colors.danger};
  }
`;

export const ModalOverlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(15, 23, 42, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 50;
`;

export const ModalContent = styled.div`
  background-color: ${({ theme }) => theme.colors.white};
  border-radius: ${({ theme }) => theme.borderRadius.xl};
  padding: ${({ theme }) => theme.spacing.lg};
  width: 100%;
  max-width: 640px;
  box-shadow: ${({ theme }) => theme.shadows.lg};
`;
