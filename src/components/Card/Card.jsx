import React from 'react';
import * as S from './Card.styles';

const Card = ({ title, subtitle, icon: Icon, borderColor, children }) => {
  return (
    <S.Card $borderColor={borderColor}>
      {(title || subtitle) && (
        <S.CardHeader>
          {title && (
            <S.CardTitle>
              {Icon && <Icon size={20} />}
              {title}
            </S.CardTitle>
          )}
          {subtitle && <S.CardSubtitle>{subtitle}</S.CardSubtitle>}
        </S.CardHeader>
      )}
      <S.CardContent>{children}</S.CardContent>
    </S.Card>
  );
};

export default Card;
