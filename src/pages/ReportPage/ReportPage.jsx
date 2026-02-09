import React from 'react';
import { ArrowLeft, Printer, Building2 } from 'lucide-react';
import Button from '../../components/Button/Button';
import { formatCurrency, formatDate, formatMonthYear } from '../../utils/formatters';
import * as S from './ReportPage.styles';

const ReportPage = ({
  filteredProduction,
  employeesSummary,
  totalMonth,
  selectedProject,
  selectedMonth,
  onBack,
}) => {
  const handlePrint = () => {
    window.print();
  };

  return (
    <S.ReportRoot>
      <S.Toolbar className="no-print">
        <Button variant="ghost" onClick={onBack} icon={ArrowLeft}>
          Voltar
        </Button>
        <Button variant="primary" onClick={handlePrint} icon={Printer}>
          Imprimir / Salvar PDF
        </Button>
      </S.Toolbar>

      <S.Paper>
        <S.ReportHeader>
          <div>
            <S.ReportTitle>Fechamento de Produção</S.ReportTitle>
            <S.ReportMeta>
              <S.MetaLine>
                <Building2 size={16} />
                Obra: <S.ProjectName>{selectedProject}</S.ProjectName>
              </S.MetaLine>
              <S.Muted>
                Competência:{' '}
                <S.FontBold>{formatMonthYear(selectedMonth)}</S.FontBold>
              </S.Muted>
            </S.ReportMeta>
          </div>

          <S.TextRight>
            <S.Muted style={{ fontSize: '0.75rem' }}>Emissão</S.Muted>
            <S.FontSemibold>
              {new Date().toLocaleDateString('pt-BR')}
            </S.FontSemibold>
          </S.TextRight>
        </S.ReportHeader>

        <S.Section>
          <S.SectionTitle>Detalhamento dos Serviços</S.SectionTitle>
          <S.ReportTable>
            <thead>
              <tr>
                <th>Data</th>
                <th>Colaborador</th>
                <th>Serviço</th>
                <th style={{ textAlign: 'right' }}>Qtd.</th>
                <th style={{ textAlign: 'right' }}>Total</th>
              </tr>
            </thead>
            <tbody>
              {filteredProduction.map((item, index) => (
                <S.TableRow key={item.id}>
                  <td>{formatDate(item.date)}</td>
                  <td>
                    <S.FontSemibold>{item.employeeName}</S.FontSemibold>
                  </td>
                  <td>{item.serviceName}</td>
                  <td style={{ textAlign: 'right' }}>
                    {item.quantity} {item.unit}
                  </td>
                  <td style={{ textAlign: 'right' }}>
                    <S.FontBold>{formatCurrency(item.total)}</S.FontBold>
                  </td>
                </S.TableRow>
              ))}
            </tbody>
          </S.ReportTable>
        </S.Section>

        <S.Section>
          <S.SectionTitle>Resumo para Pagamento</S.SectionTitle>
          <S.ReportTable>
            <thead>
              <tr>
                <th>Colaborador</th>
                <th>CPF</th>
                <th>Dados Bancários</th>
                <th style={{ textAlign: 'right' }}>A Receber</th>
              </tr>
            </thead>
            <tbody>
              {employeesSummary.map((emp) => (
                <S.TableRow key={emp.id}>
                  <td>
                    {emp.name}
                    <br />
                    <S.Muted style={{ fontSize: '0.625rem' }}>
                      {emp.role}
                    </S.Muted>
                  </td>
                  <td>{emp.cpf || '-'}</td>
                  <td>
                    {emp.account ? (
                      <S.BankInfo>
                        Ag: {emp.agency} | Op: {emp.operation}
                        <br />
                        CC: {emp.account}
                      </S.BankInfo>
                    ) : (
                      <S.Muted style={{ fontSize: '0.625rem' }}>
                        Não informado
                      </S.Muted>
                    )}
                  </td>
                  <td style={{ textAlign: 'right' }}>
                    <S.FontBold>{formatCurrency(emp.total)}</S.FontBold>
                  </td>
                </S.TableRow>
              ))}
              <S.TotalRow>
                <td colSpan="3" style={{ textAlign: 'right' }}>
                  Total Geral do Mês
                </td>
                <td style={{ textAlign: 'right' }}>
                  {formatCurrency(totalMonth)}
                </td>
              </S.TotalRow>
            </tbody>
          </S.ReportTable>
        </S.Section>

        <S.SignatureSection>
          <S.SignatureBox>
            <S.SignatureLine />
            <S.SignatureLabel>Responsável pela Obra</S.SignatureLabel>
          </S.SignatureBox>
          <S.SignatureBox>
            <S.SignatureLine />
            <S.SignatureLabel>Empreiteiro / Responsável</S.SignatureLabel>
          </S.SignatureBox>
        </S.SignatureSection>
      </S.Paper>
    </S.ReportRoot>
  );
};

export default ReportPage;
