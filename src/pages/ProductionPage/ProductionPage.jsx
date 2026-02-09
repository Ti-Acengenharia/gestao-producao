import React, { useState } from 'react';
import { Plus, FileText, Printer } from 'lucide-react';
import Card from '../../components/Card/Card';
import Button from '../../components/Button/Button';
import * as F from '../../components/Form/Form.styles';
import { formatCurrency, formatDate, formatMonthYear } from '../../utils/formatters';
import * as S from './ProductionPage.styles';

const ProductionPage = ({
  agreements,
  employees,
  filteredProduction,
  selectedProject,
  selectedMonth,
  isSubmitting,
  onAddProduction,
  onDeleteProduction,
  onNavigateToReport,
}) => {
  const [newEntry, setNewEntry] = useState({
    agreementId: '',
    employeeId: '',
    quantity: '',
    date: new Date().toISOString().split('T')[0],
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onAddProduction(newEntry);
    setNewEntry({ ...newEntry, quantity: '' });
  };

  return (
    <S.Container>
      <Card
        title={`Lançar em: ${selectedProject}`}
        subtitle="O lançamento será vinculado à obra selecionada no topo."
        icon={Plus}
      >
        {agreements.length === 0 || employees.length === 0 ? (
          <S.WarningBox>
            ⚠️ É necessário ter Serviços e Colaboradores cadastrados.
          </S.WarningBox>
        ) : (
          <F.Form onSubmit={handleSubmit}>
            <F.FormGrid $cols={2}>
              <F.FormGroup>
                <F.Label>Data</F.Label>
                <F.Input
                  type="date"
                  required
                  value={newEntry.date}
                  onChange={(e) =>
                    setNewEntry({ ...newEntry, date: e.target.value })
                  }
                />
              </F.FormGroup>

              <F.FormGroup>
                <F.Label>Quantidade</F.Label>
                <F.Input
                  type="number"
                  step="0.01"
                  required
                  placeholder="0.00"
                  value={newEntry.quantity}
                  onChange={(e) =>
                    setNewEntry({ ...newEntry, quantity: e.target.value })
                  }
                />
              </F.FormGroup>
            </F.FormGrid>

            <F.FormGrid $cols={2}>
              <F.FormGroup>
                <F.Label>Colaborador</F.Label>
                <F.Select
                  value={newEntry.employeeId}
                  onChange={(e) =>
                    setNewEntry({ ...newEntry, employeeId: e.target.value })
                  }
                  required
                >
                  <option value="">Selecione...</option>
                  {employees.map((emp) => (
                    <option key={emp.id} value={emp.id}>
                      {emp.name} ({emp.role})
                    </option>
                  ))}
                </F.Select>
              </F.FormGroup>

              <F.FormGroup>
                <F.Label>Serviço</F.Label>
                <F.Select
                  value={newEntry.agreementId}
                  onChange={(e) =>
                    setNewEntry({ ...newEntry, agreementId: e.target.value })
                  }
                  required
                >
                  <option value="">Selecione...</option>
                  {agreements.map((agreement) => (
                    <option key={agreement.id} value={agreement.id}>
                      {agreement.name} ({formatCurrency(agreement.price)}/
                      {agreement.unit})
                    </option>
                  ))}
                </F.Select>
              </F.FormGroup>
            </F.FormGrid>

            <Button
              type="submit"
              fullWidth
              loading={isSubmitting}
              icon={Plus}
            >
              Confirmar Lançamento
            </Button>
          </F.Form>
        )}
      </Card>

      <S.Header>
        <S.HeaderInfo>
          <S.HeaderTitle>
            <FileText size={20} />
            Extrato: {formatMonthYear(selectedMonth)}
          </S.HeaderTitle>
          <S.HeaderSubtitle>
            Filtrado por: <span>{selectedProject}</span>
          </S.HeaderSubtitle>
        </S.HeaderInfo>

        <Button
          variant="secondary"
          size="sm"
          icon={Printer}
          onClick={onNavigateToReport}
        >
          Gerar Relatório / PDF
        </Button>
      </S.Header>

      {filteredProduction.length === 0 ? (
        <S.EmptyState>
          <p>Nenhum registo encontrado para esta obra neste mês.</p>
        </S.EmptyState>
      ) : (
        <S.ProductionList>
          {filteredProduction.map((item) => (
            <S.ProductionItem key={item.id}>
              <S.ItemContent>
                <S.ItemBadges>
                  <S.Badge $type="date">{formatDate(item.date)}</S.Badge>
                  <S.Badge $type="employee">{item.employeeName}</S.Badge>
                </S.ItemBadges>
                <S.ItemTitle>{item.serviceName}</S.ItemTitle>
                <S.ItemDetails>
                  {item.quantity} {item.unit} x {formatCurrency(item.unitPrice)}
                </S.ItemDetails>
              </S.ItemContent>

              <S.ItemActions>
                <S.ItemTotal>{formatCurrency(item.total)}</S.ItemTotal>
                <S.DeleteButton onClick={() => onDeleteProduction(item.id)}>
                  Eliminar
                </S.DeleteButton>
              </S.ItemActions>
            </S.ProductionItem>
          ))}
        </S.ProductionList>
      )}
    </S.Container>
  );
};

export default ProductionPage;
