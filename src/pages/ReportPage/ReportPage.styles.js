import styled from 'styled-components';

export const ReportRoot = styled.div`
  min-height: 100vh;
  background-color: ${({ theme }) => theme.colors.slate[100]};
  padding: ${({ theme }) => theme.spacing.md};

  @media print {
    background-color: white;
    padding: 0;
  }
`;

export const Toolbar = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${({ theme }) => theme.spacing.lg};
  gap: ${({ theme }) => theme.spacing.md};

  @media print {
    display: none;
  }
`;

export const Paper = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  background-color: white;
  padding: ${({ theme }) => theme.spacing['2xl']};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  box-shadow: ${({ theme }) => theme.shadows.xl};

  @media print {
    box-shadow: none;
    border-radius: 0;
    padding: 0;
  }
`;

export const ReportHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: ${({ theme }) => theme.spacing['2xl']};
  padding-bottom: ${({ theme }) => theme.spacing.lg};
  border-bottom: 2px solid ${({ theme }) => theme.colors.slate[200]};
`;

export const ReportTitle = styled.h1`
  font-size: 1.875rem;
  font-weight: bold;
  color: ${({ theme }) => theme.colors.slate[900]};
  margin-bottom: ${({ theme }) => theme.spacing.sm};
`;

export const ReportMeta = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

export const MetaLine = styled.p`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: ${({ theme }) => theme.colors.slate[600]};
  font-size: 0.875rem;

  svg {
    color: ${({ theme }) => theme.colors.primary};
  }
`;

export const ProjectName = styled.span`
  font-weight: bold;
  color: ${({ theme }) => theme.colors.primary};
`;

export const Muted = styled.span`
  color: ${({ theme }) => theme.colors.slate[500]};
  font-size: 0.875rem;
`;

export const Section = styled.div`
  margin-bottom: ${({ theme }) => theme.spacing['2xl']};

  @media print {
    page-break-inside: avoid;
  }
`;

export const SectionTitle = styled.h2`
  font-size: 1.25rem;
  font-weight: bold;
  color: ${({ theme }) => theme.colors.slate[800]};
  margin-bottom: ${({ theme }) => theme.spacing.lg};
  padding-bottom: 0.5rem;
  border-bottom: 1px solid ${({ theme }) => theme.colors.slate[200]};
`;

export const ReportTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  font-size: 0.875rem;

  thead {
    background-color: ${({ theme }) => theme.colors.slate[50]};
  }

  th {
    padding: 0.75rem;
    text-align: left;
    font-weight: 600;
    color: ${({ theme }) => theme.colors.slate[700]};
    border-bottom: 2px solid ${({ theme }) => theme.colors.slate[200]};
    text-transform: uppercase;
    font-size: 0.75rem;
  }

  td {
    padding: 0.75rem;
    border-bottom: 1px solid ${({ theme }) => theme.colors.slate[100]};
    color: ${({ theme }) => theme.colors.slate[700]};
  }

  tbody tr:hover {
    background-color: ${({ theme }) => theme.colors.slate[50]};
  }

  tbody tr:last-child td {
    border-bottom: none;
  }
`;

export const TableRow = styled.tr`
  &:nth-child(even) {
    background-color: ${({ theme }) => theme.colors.slate[50]};
  }
`;

export const TextRight = styled.div`
  text-align: right;
`;

export const FontSemibold = styled.span`
  font-weight: 600;
`;

export const FontBold = styled.span`
  font-weight: bold;
`;

export const SignatureSection = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: ${({ theme }) => theme.spacing['2xl']};
  margin-top: 4rem;

  @media print {
    page-break-inside: avoid;
  }
`;

export const SignatureBox = styled.div`
  text-align: center;
`;

export const SignatureLine = styled.div`
  border-top: 1px solid ${({ theme }) => theme.colors.slate[900]};
  width: 75%;
  margin: 0 auto ${({ theme }) => theme.spacing.sm};
`;

export const SignatureLabel = styled.p`
  font-size: 0.875rem;
  font-weight: 500;
  color: ${({ theme }) => theme.colors.slate[700]};
`;

export const TotalRow = styled.tr`
  background-color: ${({ theme }) => theme.colors.slate[100]} !important;
  font-weight: bold;
  font-size: 0.875rem;

  td {
    padding: 1rem 0.75rem;
    text-transform: uppercase;
    border-top: 2px solid ${({ theme }) => theme.colors.slate[300]};
  }
`;

export const BankInfo = styled.div`
  font-size: 0.625rem;
  line-height: 1.4;
`;
