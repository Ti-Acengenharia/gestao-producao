import React, { useMemo, useState } from 'react';
import { Plus, Save, Trash2, X } from 'lucide-react';
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
  const [search, setSearch] = useState('');
  const [newAgreement, setNewAgreement] = useState({
    name: '',
    unit: 'm²',
    price: '',
  });

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    onAddAgreement(newAgreement);
    setNewAgreement({ name: '', unit: 'm²', price: '' });
    setIsModalOpen(false);
  };

  const filteredAgreements = useMemo(() => {
    if (!search.trim()) return agreements;
    const q = search.trim().toLowerCase();
    return agreements.filter((agreement) =>
      [agreement.name, agreement.unit, agreement.price]
        .filter(Boolean)
        .some((field) => String(field).toLowerCase().includes(q))
    );
  }, [agreements, search]);

  return (
    <S.Container>
      <Card title="Acordos" icon={Plus}>
        <S.HeaderRow>
          <S.SearchInput
            type="text"
            placeholder="Pesquisar por serviço, unidade ou preço..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <Button
            type="button"
            variant="secondary"
            icon={Plus}
            onClick={() => setIsModalOpen(true)}
          >
            Novo acordo
          </Button>
        </S.HeaderRow>
      </Card>

      <S.ListCard>
        <S.ListHeader>Acordos ({filteredAgreements.length})</S.ListHeader>
        <S.ListContent>
          {filteredAgreements.map((agreement) => (
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

      {isModalOpen && (
        <S.ModalOverlay>
          <S.ModalContent>
            <F.Form onSubmit={handleSubmit}>
              <F.FormGrid $cols={4}>
                <F.FormGroup
                  style={{
                    gridColumn: 'span 4 / span 4',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                  }}
                >
                  <F.Label style={{ marginBottom: 0 }}>Novo Acordo</F.Label>
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
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
                Cadastrar Acordo
              </Button>
            </F.Form>
          </S.ModalContent>
        </S.ModalOverlay>
      )}
    </S.Container>
  );
};

export default AgreementsPage;
