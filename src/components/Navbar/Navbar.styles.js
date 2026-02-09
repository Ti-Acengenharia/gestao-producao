import styled from 'styled-components';

export const Nav = styled.nav`
  background-color: ${({ theme }) => theme.colors.slate[900]};
  color: ${({ theme }) => theme.colors.white};
  padding: ${({ theme }) => theme.spacing.sm} ${({ theme }) => theme.spacing.md};
  position: sticky;
  top: 0;
  z-index: 20;
  box-shadow: ${({ theme }) => theme.shadows.lg};
`;

export const NavContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  gap: ${({ theme }) => theme.spacing.md};

  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    flex-direction: row;
  }
`;

export const NavLeft = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: ${({ theme }) => theme.spacing.md};
  width: 100%;

  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    flex-direction: row;
    width: auto;
  }
`;

export const FiltersContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.sm};
  background-color: ${({ theme }) => theme.colors.slate[800]};
  padding: ${({ theme }) => theme.spacing.sm} ${({ theme }) => theme.spacing.md};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  border: 1px solid ${({ theme }) => theme.colors.slate[700]};
`;

export const MonthTotalRow = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.md};
`;

export const LogoContainer = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.md};
`;

export const LogoTitle = styled.h1`
  font-size: 1.5rem;
  font-weight: bold;
  color: ${({ theme }) => theme.colors.white};
  margin: 0;
  white-space: nowrap;

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    font-size: 1.25rem;
  }
`;

export const LogoImage = styled.img`
  height: 65px;
  width: auto;
  object-fit: contain;

  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    height: 80px;
  }
`;

export const LogoIcon = styled.div`
  padding: 6px;
  background-color: ${({ theme }) => theme.colors.primary};
  border-radius: ${({ theme }) => theme.borderRadius.lg};

  svg {
    color: ${({ theme }) => theme.colors.white};
  }
`;

export const LogoText = styled.span`
  font-weight: bold;
  font-size: 1.125rem;
  display: none;

  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    display: block;
  }
`;

export const ProjectSelector = styled.div`
  position: relative;
  width: 100%;

  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    width: 16rem;
  }
`;

export const ProjectIcon = styled.div`
  position: absolute;
  left: 12px;
  top: 10px;
  color: ${({ theme }) => theme.colors.slate[400]};
`;

export const ProjectSelect = styled.select`
  width: 100%;
  background-color: ${({ theme }) => theme.colors.slate[800]};
  color: ${({ theme }) => theme.colors.white};
  border: 1px solid ${({ theme }) => theme.colors.slate[700]};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  padding: 0.5rem 1rem 0.5rem 2.25rem;
  font-size: 0.875rem;
  font-weight: 500;
  outline: none;
  appearance: none;
  cursor: pointer;
  transition: background-color ${({ theme }) => theme.transitions.normal};

  &:focus {
    ring: 2px;
    ring-color: ${({ theme }) => theme.colors.primary};
  }

  &:hover {
    background-color: #273549;
  }
`;

export const MonthInfo = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.md};
  background-color: ${({ theme }) => theme.colors.slate[800]};
  padding: 0.5rem 1rem;
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  width: 100%;
  justify-content: space-between;
  border: 1px solid ${({ theme }) => theme.colors.slate[700]};

  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    width: auto;
  }
`;

export const MonthSelector = styled.div`
  display: flex;
  flex-direction: column;
`;

export const MonthLabel = styled.label`
  font-size: 0.625rem;
  color: ${({ theme }) => theme.colors.slate[400]};
  font-weight: bold;
  text-transform: uppercase;
  margin-bottom: 2px;
  display: flex;
  align-items: center;
  gap: 4px;
`;

export const MonthInput = styled.input`
  background-color: transparent;
  color: ${({ theme }) => theme.colors.white};
  font-size: 0.875rem;
  outline: none;
  font-weight: 500;
  cursor: pointer;
  border: none;
  transition: color ${({ theme }) => theme.transitions.normal};

  &:hover {
    color: #bfdbfe;
  }
`;

export const Divider = styled.div`
  height: 2rem;
  width: 1px;
  background-color: ${({ theme }) => theme.colors.slate[600]};
  margin: 0 0.5rem;
`;

export const TotalInfo = styled.div`
  text-align: right;
`;

export const TotalLabel = styled.p`
  font-size: 0.625rem;
  color: ${({ theme }) => theme.colors.slate[400]};
  text-transform: uppercase;
  font-weight: bold;
`;

export const TotalValue = styled.p`
  font-weight: bold;
  color: ${({ theme }) => theme.colors.success};
  font-size: 0.875rem;

  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    font-size: 1rem;
  }
`;
