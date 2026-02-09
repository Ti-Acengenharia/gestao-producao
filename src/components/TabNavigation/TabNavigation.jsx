import React from 'react';
import { Hammer, Users, Settings } from 'lucide-react';
import * as S from './TabNavigation.styles';

const TabNavigation = ({ activeView, onViewChange }) => {
  const tabs = [
    { id: 'production', label: 'Produção', icon: Hammer },
    { id: 'team', label: 'Equipe', icon: Users },
    { id: 'agreements', label: 'Acordos', icon: Settings },
  ];

  return (
    <S.TabsContainer>
      {tabs.map((tab) => {
        const Icon = tab.icon;
        return (
          <S.Tab
            key={tab.id}
            $active={activeView === tab.id}
            onClick={() => onViewChange(tab.id)}
          >
            <Icon size={16} />
            {tab.label}
          </S.Tab>
        );
      })}
    </S.TabsContainer>
  );
};

export default TabNavigation;
