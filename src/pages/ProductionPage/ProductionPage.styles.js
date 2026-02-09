import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.lg};
`;

export const Header = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-end;
  gap: ${({ theme }) => theme.spacing.md};
  border-bottom: 1px solid ${({ theme }) => theme.colors.slate[200]};
  padding-bottom: 0.5rem;

  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    flex-direction: row;
    align-items: center;
  }
`;

export const HeaderInfo = styled.div``;

export const HeaderTitle = styled.h3`
  font-weight: bold;
  color: ${({ theme }) => theme.colors.slate[800]};
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 0.25rem;

  svg {
    color: ${({ theme }) => theme.colors.slate[400]};
  }
`;

export const HeaderSubtitle = styled.p`
  font-size: 0.75rem;
  color: ${({ theme }) => theme.colors.slate[500]};

  span {
    font-weight: 600;
    color: ${({ theme }) => theme.colors.primary};
  }
`;

export const EmptyState = styled.div`
  padding: 3rem;
  text-align: center;
  background-color: ${({ theme }) => theme.colors.white};
  border-radius: ${({ theme }) => theme.borderRadius.xl};
  border: 2px dashed ${({ theme }) => theme.colors.slate[300]};

  p {
    color: ${({ theme }) => theme.colors.slate[400]};
    font-weight: 500;
  }
`;

export const ProductionList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
`;

export const ProductionItem = styled.div`
  background-color: ${({ theme }) => theme.colors.white};
  padding: ${({ theme }) => theme.spacing.md};
  border-radius: ${({ theme }) => theme.borderRadius.xl};
  border: 1px solid ${({ theme }) => theme.colors.slate[200]};
  box-shadow: ${({ theme }) => theme.shadows.sm};
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;
  gap: ${({ theme }) => theme.spacing.md};
  transition: border-color ${({ theme }) => theme.transitions.normal};

  &:hover {
    border-color: ${({ theme }) => theme.colors.primary}4d;
  }

  @media (min-width: ${({ theme }) => theme.breakpoints.sm}) {
    flex-direction: row;
    align-items: center;
  }
`;

export const ItemContent = styled.div`
  flex: 1;
`;

export const ItemBadges = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 0.25rem;
  flex-wrap: wrap;
`;

export const Badge = styled.span`
  font-size: 0.75rem;
  font-weight: bold;
  padding: 0.125rem 0.5rem;
  border-radius: ${({ theme }) => theme.borderRadius.sm};
  border: 1px solid;
  background-color: ${({ $type, theme }) =>
    $type === 'date'
      ? theme.colors.slate[100]
      : theme.colors.primaryLight};
  color: ${({ $type, theme }) =>
    $type === 'date'
      ? theme.colors.slate[500]
      : theme.colors.primary};
  border-color: ${({ $type, theme }) =>
    $type === 'date'
      ? theme.colors.slate[200]
      : theme.colors.primary}33;
`;

export const ItemTitle = styled.p`
  font-weight: bold;
  color: ${({ theme }) => theme.colors.slate[800]};
  font-size: 0.875rem;
  margin-bottom: 0.125rem;
`;

export const ItemDetails = styled.p`
  font-size: 0.75rem;
  color: ${({ theme }) => theme.colors.slate[500]};
  margin-top: 0.125rem;
`;

export const ItemActions = styled.div`
  text-align: right;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-end;
  width: 100%;
  border-top: 1px solid ${({ theme }) => theme.colors.slate[100]};
  padding-top: 0.5rem;
  gap: 0.25rem;

  @media (min-width: ${({ theme }) => theme.breakpoints.sm}) {
    flex-direction: column;
    width: auto;
    border-top: none;
    padding-top: 0;
  }
`;

export const ItemTotal = styled.p`
  font-weight: bold;
  color: ${({ theme }) => theme.colors.success};
  font-size: 1rem;
`;

export const DeleteButton = styled.button`
  font-size: 0.75rem;
  color: ${({ theme }) => theme.colors.danger}66;
  background: none;
  border: none;
  padding: 0.25rem 0;
  cursor: pointer;
  transition: all ${({ theme }) => theme.transitions.normal};
  opacity: 0;

  ${ProductionItem}:hover & {
    opacity: 1;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    opacity: 1;
  }

  &:hover {
    color: ${({ theme }) => theme.colors.danger};
  }
`;

export const WarningBox = styled.div`
  text-align: center;
  padding: ${({ theme }) => theme.spacing.md};
  background-color: ${({ theme }) => theme.colors.warningLight};
  color: #92400e;
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  font-size: 0.875rem;
`;
