/**
 * Hook customizado para gerenciamento de dados da aplicação
 * Centraliza toda a lógica de estado e operações de CRUD
 */
import { useState, useEffect, useMemo } from 'react';
import { uid } from '../utils/uid';
import { readJSON, writeJSON, STORAGE_KEYS } from '../services/storageService';
import { employeesAPI, agreementsAPI, productionAPI } from '../services/apiService';
import { DEFAULT_SERVICES } from '../constants/defaultServices';
import { DEFAULT_EMPLOYEES } from '../constants/defaultEmployees';

export const useDataManagement = () => {
  const [loading, setLoading] = useState(true);
  const [agreements, setAgreements] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [production, setProduction] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Inicialização dos dados
  useEffect(() => {
    const initializeData = async () => {
      const storedProduction = readJSON(STORAGE_KEYS.PRODUCTION);

      // Carregar acordos/serviços do banco de dados via API
      try {
        const apiAgreements = await agreementsAPI.getAll();
        if (apiAgreements && apiAgreements.length > 0) {
          setAgreements(apiAgreements.sort((a, b) => a.name.localeCompare(b.name)));
        } else {
          // Se não houver dados no banco, fazer seed
          console.log('Nenhum acordo encontrado, fazendo seed inicial...');
          const seededAgreements = await Promise.all(
            DEFAULT_SERVICES.map(async (s) => {
              const agreementData = {
                id: uid(),
                name: s.name,
                unit: s.unit,
                price: Number(s.price) || 0,
                createdAt: Date.now(),
              };
              return await agreementsAPI.create(agreementData);
            })
          );
          setAgreements(seededAgreements.sort((a, b) => a.name.localeCompare(b.name)));
        }
      } catch (error) {
        console.error('Erro ao carregar acordos da API:', error);
        // Fallback para localStorage em caso de erro
        const storedAgreements = readJSON(STORAGE_KEYS.AGREEMENTS);
        if (storedAgreements) {
          setAgreements(storedAgreements);
        }
      }

      // Carregar colaboradores do banco de dados via API
      try {
        const apiEmployees = await employeesAPI.getAll();
        if (apiEmployees && apiEmployees.length > 0) {
          setEmployees(apiEmployees.sort((a, b) => a.name.localeCompare(b.name)));
        } else {
          // Se não houver dados no banco, fazer seed
          console.log('Nenhum colaborador encontrado, fazendo seed inicial...');
          const seededEmployees = await Promise.all(
            DEFAULT_EMPLOYEES.map(async (e) => {
              const employeeData = {
                id: uid(),
                name: e.name,
                role: e.role,
                cpf: e.cpf || '',
                agency: e.agency || '',
                operation: e.operation || '',
                account: e.account || '',
                createdAt: Date.now(),
              };
              return await employeesAPI.create(employeeData);
            })
          );
          setEmployees(seededEmployees.sort((a, b) => a.name.localeCompare(b.name)));
        }
      } catch (error) {
        console.error('Erro ao carregar colaboradores da API:', error);
        // Fallback para localStorage em caso de erro
        const storedEmployees = readJSON(STORAGE_KEYS.EMPLOYEES);
        if (storedEmployees) {
          setEmployees(storedEmployees);
        }
      }

      // Carregar produção do banco de dados via API
      try {
        const apiProduction = await productionAPI.getAll();
        if (apiProduction) {
          setProduction(apiProduction.sort((a, b) => new Date(b.date) - new Date(a.date)));
        } else {
          setProduction([]);
        }
      } catch (error) {
        console.error('Erro ao carregar produção da API:', error);
        // Fallback para localStorage em caso de erro
        if (storedProduction) {
          setProduction(storedProduction);
        } else {
          setProduction([]);
        }
      }

      setLoading(false);
    };

    initializeData();
  }, []);

  // Persistência automática removida - todos os dados agora via API
  // useEffect(() => {
  //   if (!loading) {
  //     writeJSON(STORAGE_KEYS.AGREEMENTS, agreements);
  //   }
  // }, [agreements, loading]);

  // useEffect(() => {
  //   if (!loading) {
  //     writeJSON(STORAGE_KEYS.EMPLOYEES, employees);
  //   }
  // }, [employees, loading]);

  // useEffect(() => {
  //   if (!loading) {
  //     writeJSON(STORAGE_KEYS.PRODUCTION, production);
  //   }
  // }, [production, loading]);

  // Operações de Produção (integrado com API)
  const addProduction = async (entry, selectedAgreement, selectedEmployee, selectedProject) => {
    if (!selectedAgreement || !selectedEmployee) return;

    setIsSubmitting(true);
    try {
      const qtd = Number(entry.quantity);
      if (!Number.isFinite(qtd) || qtd <= 0) return;

      const unitPrice = Number(selectedAgreement.price) || 0;
      const total = qtd * unitPrice;

      const newProduction = {
        id: uid(),
        serviceName: selectedAgreement.name,
        unit: selectedAgreement.unit,
        unitPrice,
        employeeName: selectedEmployee.name,
        employeeRole: selectedEmployee.role,
        employeeId: selectedEmployee.id,
        projectName: selectedProject,
        quantity: qtd,
        total,
        date: entry.date,
        createdAt: Date.now(),
      };

      // Criar no banco de dados via API
      const created = await productionAPI.create(newProduction);

      // Atualizar estado local
      setProduction((prev) =>
        [created, ...prev].sort((a, b) => new Date(b.date) - new Date(a.date))
      );
    } catch (error) {
      console.error('Erro ao adicionar produção:', error);
      alert('Erro ao adicionar lançamento. Tente novamente.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const deleteProduction = async (id) => {
    if (!confirm('Tem a certeza?')) return;

    try {
      // Deletar do banco de dados via API
      await productionAPI.delete(id);

      // Atualizar estado local
      setProduction((prev) => prev.filter((x) => x.id !== id));
    } catch (error) {
      console.error('Erro ao deletar produção:', error);
      alert('Erro ao deletar lançamento. Tente novamente.');
    }
  };

  // Operações de Acordos (integrado com API)
  const addAgreement = async (agreementData) => {
    if (!agreementData.name || !agreementData.price) return;

    setIsSubmitting(true);
    try {
      const newAgreement = {
        id: uid(),
        name: agreementData.name.trim(),
        unit: agreementData.unit.trim(),
        price: Number(agreementData.price) || 0,
        createdAt: Date.now(),
      };

      // Criar no banco de dados via API
      const created = await agreementsAPI.create(newAgreement);

      // Atualizar estado local
      setAgreements((prev) =>
        [...prev, created].sort((a, b) => a.name.localeCompare(b.name))
      );
    } catch (error) {
      console.error('Erro ao adicionar acordo:', error);
      alert('Erro ao adicionar acordo. Tente novamente.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const deleteAgreement = async (id) => {
    if (!confirm('Tem a certeza?')) return;

    try {
      // Deletar do banco de dados via API
      await agreementsAPI.delete(id);

      // Atualizar estado local
      setAgreements((prev) => prev.filter((x) => x.id !== id));
    } catch (error) {
      console.error('Erro ao deletar acordo:', error);
      alert('Erro ao deletar acordo. Tente novamente.');
    }
  };

  // Operações de Colaboradores (integrado com API)
  const addEmployee = async (employeeData) => {
    if (!employeeData.name || !employeeData.role) return;

    setIsSubmitting(true);
    try {
      const newEmployee = {
        id: uid(),
        name: employeeData.name.trim(),
        role: employeeData.role.trim(),
        cpf: employeeData.cpf || '',
        agency: employeeData.agency || '',
        operation: employeeData.operation || '',
        account: employeeData.account || '',
        createdAt: Date.now(),
      };

      // Criar no banco de dados via API
      const created = await employeesAPI.create(newEmployee);

      // Atualizar estado local
      setEmployees((prev) =>
        [...prev, created].sort((a, b) => a.name.localeCompare(b.name))
      );
    } catch (error) {
      console.error('Erro ao adicionar colaborador:', error);
      alert('Erro ao adicionar colaborador. Tente novamente.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const deleteEmployee = async (id) => {
    if (!confirm('Tem a certeza?')) return;

    try {
      // Deletar do banco de dados via API
      await employeesAPI.delete(id);

      // Atualizar estado local
      setEmployees((prev) => prev.filter((x) => x.id !== id));
    } catch (error) {
      console.error('Erro ao deletar colaborador:', error);
      alert('Erro ao deletar colaborador. Tente novamente.');
    }
  };

  return {
    loading,
    agreements,
    employees,
    production,
    isSubmitting,
    addProduction,
    deleteProduction,
    addAgreement,
    deleteAgreement,
    addEmployee,
    deleteEmployee,
  };
};
