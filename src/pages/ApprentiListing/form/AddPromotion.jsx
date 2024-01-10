import React, { useState, useEffect } from 'react';
import { Button, Group, Select, Table, TextInput } from '@mantine/core';

import { request } from '../../../utils/request.js';
import { addNewPromotion, setPromotion } from '../../../utils/api.js';
import { semesters } from '../../../data/constantes.js';

const AddPromotion = () => {
  const [newPromotionName, setNewPromotionName] = useState("");
  const [selectedSemester, setSelectedSemester] = useState("");
  const [promotions, setPromotions] = useState([]);
  const [modifiedSemesters, setModifiedSemesters] = useState({});
  const [newLibelles, setNewLibelles] = useState({});

  useEffect(() => {
    // Effectuer la requête pour obtenir les promotions
    request("/promotion/")
      .then((res) => {
        setPromotions(res.data);
        if (res.data.length > 0) {
          setSelectedSemester(res.data[0].semestre);
          setModifiedSemesters((prev) => ({ ...prev, [res.data[0].id]: res.data[0].semestre }));
        }
      });
  }, []);

  const handleAddPromotion = async () => {
    addNewPromotion(newPromotionName, selectedSemester);
  };

  const handleDeletePromotion = (id) => {
    // Effectuer la requête pour supprimer la promotion avec l'id spécifié
    request("/promotion/" + id, "delete")
      .then(() => {
        window.location.reload();
      })
      .catch((error) => {
        console.error("Erreur lors de la suppression de la promotion :", error.message);
      });
  };

  const handleModifyPromotion = (promotionId) => {
    const modifiedSemester = modifiedSemesters[promotionId];
    const newLibelle = newLibelles[promotionId] || promotions.find(promo => promo.id === promotionId)?.libelle || "";

    setPromotion(promotionId, newLibelle, modifiedSemester);
  };

  const handleSemesterChange = (promotionId, selectedSemester) => {
    setModifiedSemesters((prev) => ({ ...prev, [promotionId]: selectedSemester }));
  };

  const handleLibelleChange = (promotionId, input) => {
    setNewLibelles((prev) => ({ ...prev, [promotionId]: input }));
  };

  return (
    <div>
      <Table striped bordered hover>
        <Table.Thead>
          <Table.Tr>
            <Table.Th>Nom de la promotion</Table.Th>
            <Table.Th>Semestre</Table.Th>
            <Table.Th>Modifier Semestre</Table.Th>
            <Table.Th>Nouveau Libellé</Table.Th>
            <Table.Th>Valider</Table.Th>
            <Table.Th>Supprimer</Table.Th>
          </Table.Tr>
        </Table.Thead>

        <Table.Tbody>
          {
            promotions.map((promotion) => (
              <Table.Tr key={promotion.id}>
                <Table.Td>{promotion.libelle}</Table.Td>
                <Table.Td>{promotion.semestre}</Table.Td>
                <Table.Td>
                  <Select
                    data={semesters}
                    w="max-content"
                    onChange={(e) => handleSemesterChange(promotion.id, e.target.value)}
                  />
                </Table.Td>
                <Table.Td>
                  <TextInput
                    value={newLibelles[promotion.id] || ""}
                    onChange={(e) => handleLibelleChange(promotion.id, e.target.value)}
                  />
                </Table.Td>
                <Table.Td>
                  <Button variant="primary" onClick={() => handleModifyPromotion(promotion.id)}>
                    Valider
                  </Button>
                </Table.Td>
                <Table.Td>
                  <Button variant="danger" onClick={() => handleDeletePromotion(promotion.id)}>
                    Supprimer la promotion
                  </Button>
                </Table.Td>
              </Table.Tr>
            ))
          }
        </Table.Tbody>
      </Table>

      {/* Ajout du champ d'entrée et du bouton */}
      <Group>
        <TextInput
          label="Nouvelle promotion"
          placeholder="Saisissez le nom de la nouvelle promotion"
          value={newPromotionName}
          onChange={(e) => setNewPromotionName(e.target.value)}
        />

        <Select
          id="promotionSemester"
          label="Semestre"
          value={selectedSemester}
          data={semesters}
          onChange={(e) => setSelectedSemester(e.target.value)}
        />
      </Group>

      <Button onClick={handleAddPromotion}>
        Valider la nouvelle promotion
      </Button>
    </div>
  );
};

export default AddPromotion;
