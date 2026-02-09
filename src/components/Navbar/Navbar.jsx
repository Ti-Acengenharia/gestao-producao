import React from 'react';
import { Building2, CalendarDays } from 'lucide-react';
import { formatCurrency } from '../../utils/formatters';
import { PROJECTS } from '../../constants/projects';
import LogoBranca from '../../utils/Logo-Branca.png';
import * as S from './Navbar.styles';

const Navbar = ({ 
  selectedProject, 
  onProjectChange, 
  selectedMonth, 
  onMonthChange, 
  totalMonth 
}) => {
  return (
    <S.Nav>
      <S.NavContainer>
        <S.NavLeft>
          <S.LogoContainer>
            <S.LogoImage src={LogoBranca} alt="Logo" />
            <S.LogoTitle>Gestão de Produção</S.LogoTitle>
          </S.LogoContainer>
        </S.NavLeft>

        <S.FiltersContainer>
          <S.ProjectSelector>
            <S.ProjectIcon>
              <Building2 size={16} />
            </S.ProjectIcon>
            <S.ProjectSelect
              value={selectedProject}
              onChange={(e) => onProjectChange(e.target.value)}
            >
              {PROJECTS.map((project) => (
                <option key={project} value={project}>
                  {project}
                </option>
              ))}
            </S.ProjectSelect>
          </S.ProjectSelector>

          <S.MonthTotalRow>
            <S.MonthSelector>
              <S.MonthLabel>
                <CalendarDays size={10} />
                Mês de Referência
              </S.MonthLabel>
              <S.MonthInput
                type="month"
                value={selectedMonth}
                onChange={(e) => onMonthChange(e.target.value)}
              />
            </S.MonthSelector>

            <S.Divider />

            <S.TotalInfo>
              <S.TotalLabel>
                Total
              </S.TotalLabel>
              <S.TotalValue>{formatCurrency(totalMonth)}</S.TotalValue>
            </S.TotalInfo>
          </S.MonthTotalRow>
        </S.FiltersContainer>
      </S.NavContainer>
    </S.Nav>
  );
};

export default Navbar;
