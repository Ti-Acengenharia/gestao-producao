import React, { useMemo, useState } from 'react';
import { UserPlus, Save, Trash2, Edit2, X } from 'lucide-react';
import Card from '../../components/Card/Card';
import Button from '../../components/Button/Button';
import * as F from '../../components/Form/Form.styles';
import * as S from './TeamPage.styles';

const TeamPage = ({
  employees,
  isSubmitting,
  onAddEmployee,
  onUpdateEmployee,
  onDeleteEmployee,
}) => {
  const [search, setSearch] = useState('');
  const [newEmployee, setNewEmployee] = useState({
    name: '',
    role: '',
    cpf: '',
    agency: '',
    operation: '',
    account: '',
  });

  const [editingId, setEditingId] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingId) {
      onUpdateEmployee(editingId, newEmployee);
    } else {
      onAddEmployee(newEmployee);
    }
    setNewEmployee({
      name: '',
      role: '',
      cpf: '',
      agency: '',
      operation: '',
      account: '',
    });
    setEditingId(null);
    setIsModalOpen(false);
  };

  const handleEditClick = (employee) => {
    setNewEmployee({
      name: employee.name || '',
      role: employee.role || '',
      cpf: employee.cpf || '',
      agency: employee.agency || '',
      operation: employee.operation || '',
      account: employee.account || '',
    });
    setEditingId(employee.id);
    setIsModalOpen(true);
  };

  const handleNewClick = () => {
    setNewEmployee({
      name: '',
      role: '',
      cpf: '',
      agency: '',
      operation: '',
      account: '',
    });
    setEditingId(null);
    setIsModalOpen(true);
  };

  const filteredEmployees = useMemo(() => {
    if (!search.trim()) return employees;
    const q = search.trim().toLowerCase();
    return employees.filter((emp) =>
      [emp.name, emp.role, emp.cpf, emp.account, emp.agency, emp.operation]
        .filter(Boolean)
        .some((field) => String(field).toLowerCase().includes(q))
    );
  }, [employees, search]);

  return (
    <S.Container>
      <Card title="Colaboradores" icon={UserPlus}>
        <S.HeaderRow>
          <S.SearchInput
            type="text"
            placeholder="Pesquisar por nome, função ou dados bancários..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <Button
            type="button"
            variant="secondary"
            icon={UserPlus}
            onClick={handleNewClick}
          >
            Novo colaborador
          </Button>
        </S.HeaderRow>
      </Card>

      <S.ListCard>
        <S.ListHeader>Equipe ({filteredEmployees.length})</S.ListHeader>
        <S.ListContent>
          {filteredEmployees.map((employee) => (
            <S.ListItem key={employee.id}>
              <S.ItemInfo>
                <S.ItemName>{employee.name}</S.ItemName>
                <S.ItemRole>{employee.role}</S.ItemRole>
                <S.ItemDetails>
                  <span>CPF: {employee.cpf || '-'}</span>
                  <span>Conta: {employee.account || '-'}</span>
                  <span>Ag: {employee.agency || '-'}</span>
                  <span>Op: {employee.operation || '-'}</span>
                </S.ItemDetails>
              </S.ItemInfo>
              <S.Actions>
                <S.DeleteIconButton type="button" onClick={() => handleEditClick(employee)}>
                  <Edit2 size={16} />
                </S.DeleteIconButton>
                <S.DeleteIconButton type="button" onClick={() => onDeleteEmployee(employee.id)}>
                  <Trash2 size={16} />
                </S.DeleteIconButton>
              </S.Actions>
            </S.ListItem>
          ))}
        </S.ListContent>
      </S.ListCard>

      {isModalOpen && (
        <S.ModalOverlay>
          <S.ModalContent>
            <F.Form onSubmit={handleSubmit}>
              <F.FormGrid $cols={3}>
                <F.FormGroup style={{ gridColumn: 'span 3 / span 3', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <F.Label style={{ marginBottom: 0 }}>
                    {editingId ? 'Editar colaborador' : 'Novo colaborador'}
                  </F.Label>
                  <button
                    type="button"
                    onClick={() => {
                      setIsModalOpen(false);
                      setEditingId(null);
                    }}
                    style={{
                      background: 'none',
                      border: 'none',
                      cursor: 'pointer',
                      padding: 4,
                    }}
                  >
                    <X size={16} />
                  </button>
                </F.FormGroup>

                <F.FormGroup style={{ gridColumn: 'span 2 / span 2' }}>
                  <F.Label>Nome Completo</F.Label>
                  <F.Input
                    type="text"
                    placeholder="Ex: João da Silva"
                    value={newEmployee.name}
                    onChange={(e) =>
                      setNewEmployee({ ...newEmployee, name: e.target.value })
                    }
                    required
                  />
                </F.FormGroup>

                <F.FormGroup>
                  <F.Label>Função</F.Label>
                  <F.Input
                    type="text"
                    placeholder="Ex: Pedreiro"
                    value={newEmployee.role}
                    onChange={(e) =>
                      setNewEmployee({ ...newEmployee, role: e.target.value })
                    }
                    required
                  />
                </F.FormGroup>

                <F.FormGroup>
                  <F.Label>CPF</F.Label>
                  <F.Input
                    type="text"
                    placeholder="000.000.000-00"
                    value={newEmployee.cpf}
                    onChange={(e) =>
                      setNewEmployee({ ...newEmployee, cpf: e.target.value })
                    }
                  />
                </F.FormGroup>

                <F.FormGroup>
                  <F.Label>Banco / Agência</F.Label>
                  <F.Input
                    type="text"
                    placeholder="Ex: 059"
                    value={newEmployee.agency}
                    onChange={(e) =>
                      setNewEmployee({ ...newEmployee, agency: e.target.value })
                    }
                  />
                </F.FormGroup>

                <F.FormGroup>
                  <F.Label>Operação</F.Label>
                  <F.Input
                    type="text"
                    placeholder="Ex: 013"
                    value={newEmployee.operation}
                    onChange={(e) =>
                      setNewEmployee({ ...newEmployee, operation: e.target.value })
                    }
                  />
                </F.FormGroup>

                <F.FormGroup style={{ gridColumn: 'span 3 / span 3' }}>
                  <F.Label>Nº da Conta</F.Label>
                  <F.Input
                    type="text"
                    placeholder="Ex: 00012345-6"
                    value={newEmployee.account}
                    onChange={(e) =>
                      setNewEmployee({ ...newEmployee, account: e.target.value })
                    }
                  />
                </F.FormGroup>
              </F.FormGrid>

              <Button
                type="submit"
                variant="secondary"
                fullWidth
                loading={isSubmitting}
                icon={Save}
              >
                {editingId ? 'Atualizar Colaborador' : 'Cadastrar Colaborador'}
              </Button>
            </F.Form>
          </S.ModalContent>
        </S.ModalOverlay>
      )}
    </S.Container>
  );
};

export default TeamPage;
