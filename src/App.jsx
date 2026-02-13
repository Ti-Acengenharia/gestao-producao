import React, { useState, useMemo } from 'react';
import { ThemeProvider } from 'styled-components';
import { PROJECTS } from './constants/projects';
import { GlobalStyles } from './styles/GlobalStyles';
import { theme } from './styles/theme';
import { useDataManagement } from './hooks/useDataManagement';
import Loader from './components/Loader/Loader';
import Navbar from './components/Navbar/Navbar';
import TabNavigation from './components/TabNavigation/TabNavigation';
import ProductionPage from './pages/ProductionPage/ProductionPage';
import TeamPage from './pages/TeamPage/TeamPage';
import AgreementsPage from './pages/AgreementsPage/AgreementsPage';
import ReportPage from './pages/ReportPage/ReportPage';
import * as S from './App.styles';

function App() {
  // Estado global da aplicação
  const [view, setView] = useState('production');
  const [selectedMonth, setSelectedMonth] = useState(
    new Date().toISOString().slice(0, 7)
  );
  const [selectedProject, setSelectedProject] = useState(PROJECTS[0]);

  // Hook customizado para gerenciamento de dados
  const {
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
    updateEmployee,
    deleteEmployee,
  } = useDataManagement();

  // Produção filtrada por mês e projeto
  const filteredProduction = useMemo(() => {
    return production.filter((item) => {
      const d = String(item.date || '');
      return (
        d.startsWith(selectedMonth) && item.projectName === selectedProject
      );
    });
  }, [production, selectedMonth, selectedProject]);

  // Total do mês
  const totalMonth = useMemo(() => {
    return filteredProduction.reduce(
      (acc, curr) => acc + (Number(curr.total) || 0),
      0
    );
  }, [filteredProduction]);

  // Resumo por colaborador
  const employeesSummary = useMemo(() => {
    return employees
      .map((emp) => {
        const total = filteredProduction
          .filter((prod) => prod.employeeId === emp.id)
          .reduce((acc, curr) => acc + (Number(curr.total) || 0), 0);
        return { ...emp, total };
      })
      .filter((emp) => emp.total > 0);
  }, [employees, filteredProduction]);

  // Handlers
  const handleAddProduction = (entry) => {
    const selectedAgreement = agreements.find((a) => a.id === entry.agreementId);
    const selectedEmployee = employees.find((e) => e.id === entry.employeeId);
    addProduction(entry, selectedAgreement, selectedEmployee, selectedProject);
  };

  if (loading) {
    return (
      <ThemeProvider theme={theme}>
        <GlobalStyles />
        <Loader />
      </ThemeProvider>
    );
  }

  // View de Relatório (fullscreen)
  if (view === 'report') {
    return (
      <ThemeProvider theme={theme}>
        <GlobalStyles />
        <ReportPage
          filteredProduction={filteredProduction}
          employeesSummary={employeesSummary}
          totalMonth={totalMonth}
          selectedProject={selectedProject}
          selectedMonth={selectedMonth}
          onBack={() => setView('production')}
        />
      </ThemeProvider>
    );
  }

  // View principal da aplicação
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <S.AppContainer>
        <Navbar
          selectedProject={selectedProject}
          onProjectChange={setSelectedProject}
          selectedMonth={selectedMonth}
          onMonthChange={setSelectedMonth}
          totalMonth={totalMonth}
        />

        <S.MainContent>
          <TabNavigation activeView={view} onViewChange={setView} />

          {view === 'production' && (
            <ProductionPage
              agreements={agreements}
              employees={employees}
              filteredProduction={filteredProduction}
              selectedProject={selectedProject}
              selectedMonth={selectedMonth}
              isSubmitting={isSubmitting}
              onAddProduction={handleAddProduction}
              onDeleteProduction={deleteProduction}
              onNavigateToReport={() => setView('report')}
            />
          )}

          {view === 'team' && (
            <TeamPage
              employees={employees}
              isSubmitting={isSubmitting}
              onAddEmployee={addEmployee}
              onUpdateEmployee={updateEmployee}
              onDeleteEmployee={deleteEmployee}
            />
          )}

          {view === 'agreements' && (
            <AgreementsPage
              agreements={agreements}
              isSubmitting={isSubmitting}
              onAddAgreement={addAgreement}
              onDeleteAgreement={deleteAgreement}
            />
          )}
        </S.MainContent>
      </S.AppContainer>
    </ThemeProvider>
  );
}

export default App;
