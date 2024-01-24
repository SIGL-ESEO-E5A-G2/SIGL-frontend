import React, { useState, useEffect } from 'react';
import { Button, Container, Select, Table } from '@mantine/core';
import { request } from '../../../utils/request.js';
import FormTemplate from '../../../components/FormTemplate.jsx';
import { putApprenti } from '../../../utils/api.js';

const ListApprenti = () => {
  const [selectPromotions, setSelectPromotions] = useState([]);
  const [modifyPromotions, setModifyPromotions] = useState([]);
  const [apprentis, setApprentis] = useState([]);
  const [selectedPromotion, setSelectedPromotion] = useState('');
  const [selectedModifyPromotion, setSelectedModifyPromotion] = useState({});
  const [defaultSelectionApplied, setDefaultSelectionApplied] = useState(false);

  useEffect(() => {
    request("/promotion/")
      .then((res) => {
        const data = (res.data || []).map((row) => ({
          value: row.id + '',
          label: `${row.libelle} (${row.semestre})`,
        }));
        setSelectPromotions([{ value: '', label: 'Sans promotions' }, ...data]);
        setModifyPromotions(data);
        setSelectedModifyPromotion(data[0].value);
      });
  }, []);

  useEffect(() => {
    const apiUrl = selectedPromotion === '' ? '/apprentidetail/' : `/apprentipromotion/?promotion=${selectedPromotion || ''}`;

    request(apiUrl)
      .then(({ data }) => setApprentis(data))
      .catch((error) => {
        console.error("Erreur lors de la récupération des apprentis :", error.message);
      });
  }, [selectedPromotion]);

  const handleUpdateApprenti = (idApprenti) => {
    const selectedPromotionId = selectedModifyPromotion[idApprenti] || modifyPromotions[0].value;
    request(`/apprenti/${idApprenti}`)
      .then((jsonApprenti) => {
        const updateApprenti = {
          promotion: selectedPromotionId,
        };
        putApprenti(idApprenti, jsonApprenti.data, updateApprenti);
      })
      .catch((error) => {
        console.error("Erreur lors de la mise à jour de l'apprenti :", error.message);
      });
  };

  const handlePromotionSelectForApprenti = (idApprenti, selectedPromotionId) => {
    setSelectedModifyPromotion((prev) => ({ ...prev, [idApprenti]: selectedPromotionId }));
  };

  return (
    <FormTemplate title="Apprentis">
      <Select
        id="promotionApprenti"
        clearable
        w="max-content"
        label="Promotions"
        value={selectedPromotion}
        onChange={(e) => {
          setSelectedPromotion(e);
          setDefaultSelectionApplied(true);
        }}
        data={selectPromotions}
      />

      <Table striped highlightOnHover withTableBorder>
        <Table.Thead>
          <Table.Tr>
            <Table.Th>Nom</Table.Th>
            <Table.Th>Prénom</Table.Th>
            <Table.Th>Promotion</Table.Th>
            <Table.Th>Sélectionner Promotion</Table.Th>
            <Table.Th>Action</Table.Th>
          </Table.Tr>
        </Table.Thead>

        <Table.Tbody>
          {apprentis.length ?
            apprentis
              .filter((apprenti) => selectedPromotion === '' ? !apprenti.promotion : true)
              .map((apprenti) => (
                <Table.Tr key={apprenti.id}>
                  <Table.Td>{apprenti.utilisateur.nom}</Table.Td>
                  <Table.Td>{apprenti.utilisateur.prenom}</Table.Td>
                  <Table.Td>
                    {selectedPromotion === '' ? 'Sans promotions' : (apprenti.promotion ? apprenti.promotion.libelle : 'Aucune promotion')}
                  </Table.Td>
                  <Table.Td>
                    <Select
                      data={modifyPromotions}
                      value={selectedModifyPromotion}
                      onChange={(e) => handlePromotionSelectForApprenti(apprenti.id, e)}
                    />
                  </Table.Td>
                  <Table.Td>
                    <Button onClick={() => handleUpdateApprenti(apprenti.id)}>
                      Mettre à jour
                    </Button>
                  </Table.Td>
                </Table.Tr>
              ))
            :
            <Table.Tr>
              <Table.Td style={{ textAlign: "center" }} colSpan={5}>
                Aucun apprenti
              </Table.Td>
            </Table.Tr>
          }
        </Table.Tbody>
      </Table>
    </FormTemplate>
  );
};

export default ListApprenti;
