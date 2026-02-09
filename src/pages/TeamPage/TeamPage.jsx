import React, { useState } from 'react';
import { UserPlus, Save, Trash2 } from 'lucide-react';
import Card from '../../components/Card/Card';
import Button from '../../components/Button/Button';
import * as F from '../../components/Form/Form.styles';
import * as S from './TeamPage.styles';

const TeamPage = ({ employees, isSubmitting, onAddEmployee, onDeleteEmployee }) => {
  const [newEmployee, setNewEmployee] = useState({
    name: '',
    role: '',
    cpf: '',
    agency: '',
    operation: '',
    account: '',
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onAddEmployee(newEmployee);
    setNewEmployee({
      name: '',
      role: '',
      cpf: '',
      agency: '',
      operation: '',
      account: '',
    });
  };

  return (
    <S.Container>
      <Card title="Novo Colaborador" icon={UserPlus}>
        <F.Form onSubmit={handleSubmit}>
          <F.FormGrid $cols={3}>
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
            Guardar Colaborador
          </Button>
        </F.Form>
      </Card>

      <S.ListCard>
        <S.ListHeader>Equipa ({employees.length})</S.ListHeader>
        <S.ListContent>
          {employees.map((employee) => (
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

              <S.DeleteIconButton onClick={() => onDeleteEmployee(employee.id)}>
                <Trash2 size={16} />
              </S.DeleteIconButton>
            </S.ListItem>
          ))}
        </S.ListContent>
      </S.ListCard>
    </S.Container>
  );
};

export default TeamPage;
