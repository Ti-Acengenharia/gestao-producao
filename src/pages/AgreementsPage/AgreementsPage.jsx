import React, { useState } from 'react';
import { Plus, Save, Trash2 } from 'lucide-react';
import Card from '../../components/Card/Card';
import Button from '../../components/Button/Button';
import * as F from '../../components/Form/Form.styles';
import { formatCurrency } from '../../utils/formatters';
import * as S from './AgreementsPage.styles';

const AgreementsPage = ({
  agreements,
  isSubmitting,
  onAddAgreement,
  onDeleteAgreement,
}) => {
  const [newAgreement, setNewAgreement] = useState({
    name: '',
    unit: 'm²',
    price: '',
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onAddAgreement(newAgreement);
    setNewAgreement({ name: '', unit: 'm²', price: '' });
  };

  return (
    <S.Container>
      <Card title="Novo Acordo" icon={Plus}>
        <F.Form onSubmit={handleSubmit}>
          <F.FormGrid $cols={4}>
            <F.FormGroup style={{ gridColumn: 'span 2 / span 2' }}>
              <F.Label>Serviço</F.Label>
              <F.Input
                type="text"
                placeholder="Nome do serviço"
                value={newAgreement.name}
                onChange={(e) =>
                  setNewAgreement({ ...newAgreement, name: e.target.value })
                }
                required
              />
            </F.FormGroup>

            <F.FormGroup>
              <F.Label>Unidade</F.Label>
              <F.Input
                type="text"
                placeholder="Ex: m², pav, ciclo"
                value={newAgreement.unit}
                onChange={(e) =>
                  setNewAgreement({ ...newAgreement, unit: e.target.value })
                }
                required
              />
            </F.FormGroup>

            <F.FormGroup>
              <F.Label>Preço</F.Label>
              <F.Input
                type="number"
                step="0.01"
                placeholder="0.00"
                value={newAgreement.price}
                onChange={(e) =>
                  setNewAgreement({ ...newAgreement, price: e.target.value })
                }
                required
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
            Guardar Acordo
          </Button>
        </F.Form>
      </Card>

      <S.ListCard>
        <S.ListHeader>Acordos ({agreements.length})</S.ListHeader>
        <S.ListContent>
          {agreements.map((agreement) => (
            <S.ListItem key={agreement.id}>
              <S.ItemInfo>
                <S.ItemName>{agreement.name}</S.ItemName>
                <S.ItemUnit>{agreement.unit}</S.ItemUnit>
              </S.ItemInfo>

              <S.ItemActions>
                <S.ItemPrice>{formatCurrency(agreement.price)}</S.ItemPrice>
                <S.DeleteIconButton
                  onClick={() => onDeleteAgreement(agreement.id)}
                >
                  <Trash2 size={16} />
                </S.DeleteIconButton>
              </S.ItemActions>
            </S.ListItem>
          ))}
        </S.ListContent>
      </S.ListCard>
    </S.Container>
  );
};

export default AgreementsPage;
