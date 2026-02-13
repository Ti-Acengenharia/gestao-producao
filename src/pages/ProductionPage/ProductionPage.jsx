import React, { useMemo, useState } from 'react';
import { Plus, FileText, Printer, Users, X } from 'lucide-react';
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

  const [isEmployeeModalOpen, setIsEmployeeModalOpen] = useState(false);
  const [employeeSearch, setEmployeeSearch] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onAddProduction(newEntry);
    setNewEntry({ ...newEntry, quantity: '' });
  };

  const selectedEmployee = useMemo(
    () => employees.find((emp) => emp.id === newEntry.employeeId) || null,
    [employees, newEntry.employeeId]
  );

  const filteredEmployees = useMemo(() => {
    if (!employeeSearch.trim()) return employees;
    const q = employeeSearch.trim().toLowerCase();
    return employees.filter((emp) =>
      [emp.name, emp.role, emp.cpf, emp.account, emp.agency, emp.operation]
        .filter(Boolean)
        .some((field) => String(field).toLowerCase().includes(q))
    );
  }, [employees, employeeSearch]);

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
                  step="1"
                  required
                  placeholder="0"
                  value={newEntry.quantity}
                  onChange={(e) => {
                    const raw = e.target.value;
                    // Permitir campo vazio para o usuário apagar
                    if (raw === '') {
                      setNewEntry({ ...newEntry, quantity: '' });
                      return;
                    }

                    // Aceitar apenas inteiros positivos
                    const intValue = parseInt(raw, 10);
                    if (Number.isNaN(intValue) || intValue < 0) return;

                    setNewEntry({ ...newEntry, quantity: String(intValue) });
                  }}
                />
              </F.FormGroup>
            </F.FormGrid>

            <F.FormGrid $cols={2}>
              <F.FormGroup>
                <F.Label>Colaborador</F.Label>
                <F.Input
                  type="text"
                  placeholder="Selecione um colaborador"
                  value={
                    selectedEmployee
                      ? `${selectedEmployee.name} (${selectedEmployee.role})`
                      : ''
                  }
                  onClick={() => setIsEmployeeModalOpen(true)}
                  readOnly
                  required
                />
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

      {isEmployeeModalOpen && (
        <S.ModalOverlay>
          <S.ModalContent>
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: '0.75rem',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <Users size={18} />
                <span style={{ fontWeight: 600, fontSize: 14 }}>
                  Selecionar colaborador
                </span>
              </div>
              <button
                type="button"
                onClick={() => setIsEmployeeModalOpen(false)}
                style={{
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  padding: 4,
                }}
              >
                <X size={16} />
              </button>
            </div>

            <F.FormGroup style={{ marginBottom: 8 }}>
              <F.Label>Pesquisar</F.Label>
              <F.Input
                type="text"
                placeholder="Nome, função ou dados bancários..."
                value={employeeSearch}
                onChange={(e) => setEmployeeSearch(e.target.value)}
              />
            </F.FormGroup>

            <S.EmployeeList>
              {filteredEmployees.map((emp) => (
                <S.EmployeeItem
                  key={emp.id}
                  type="button"
                  onClick={() => {
                    setNewEntry({ ...newEntry, employeeId: emp.id });
                    setIsEmployeeModalOpen(false);
                    setEmployeeSearch('');
                  }}
                >
                  <S.EmployeeName>{emp.name}</S.EmployeeName>
                  <S.EmployeeMeta>
                    {emp.role}
                    {emp.cpf ? ` • CPF: ${emp.cpf}` : ''}
                    {emp.account ? ` • Conta: ${emp.account}` : ''}
                  </S.EmployeeMeta>
                </S.EmployeeItem>
              ))}
            </S.EmployeeList>
          </S.ModalContent>
        </S.ModalOverlay>
      )}
    </S.Container>
  );
};

export default ProductionPage;
