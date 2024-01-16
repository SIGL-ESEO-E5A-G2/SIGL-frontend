import React, { useState, useEffect } from 'react';
import { Button, Group, Table, TextInput } from '@mantine/core';
import { request } from '../../../utils/request.js';
import { addTag } from '../../../utils/api.js';

const ManageDelivrables = () => {
  const [delivrables, setDelivrables] = useState([]);
  const [newLivrable, setNewLivrable] = useState({
    libelle: '',
    couleur: '',
  });

  useEffect(() => {
    request('/tag/')
      .then((res) => {
        const livrables = res.data.filter((element) => element.type === 'Livrable');
        setDelivrables(livrables);
      })
      .catch((error) => {
        console.error('Error fetching data:', error.message);
      });
  }, []);

  const handleDeleteClick = (id) => {
    request(`/tag/${id}`, 'delete')
      .then(() => {
        window.location.reload();
      })
      .catch((error) => {
        console.error('Erreur lors de la suppression du livrable :', error.message);
      });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewLivrable((prevLivrable) => ({
      ...prevLivrable,
      [name]: value,
    }));
  };

  const handleAddLivrable = () => {
    addTag(newLivrable.libelle, newLivrable.couleur, 'Livrable');
  };

  return (
    <div>
      <Table striped bordered hover>
        <Table.Thead>
          <Table.Tr>
            <Table.Th>Nom</Table.Th>
            <Table.Th>Couleur</Table.Th>
            <Table.Th>Type</Table.Th>
            <Table.Th>Action</Table.Th> {/* New column for Delete button */}
          </Table.Tr>
        </Table.Thead>

        <Table.Tbody>
          {delivrables.map((livrable) => (
            <Table.Tr key={livrable.id}>
              <Table.Td>{livrable.libelle}</Table.Td>
              <Table.Td>{livrable.couleur}</Table.Td>
              <Table.Td>{livrable.type}</Table.Td>
              <Table.Td>
                <Button onClick={() => handleDeleteClick(livrable.id)}>
                  Supprimer
                </Button>
              </Table.Td>
            </Table.Tr>
          ))}
        </Table.Tbody>
      </Table>

      <div>
        <h3>Ajouter un nouveau livrable</h3>
        <Group>
          <TextInput
            id="newLivrableName"
            label="Nom"
            name="libelle"
            value={newLivrable.libelle}
            onChange={handleInputChange}
          />
          <TextInput
            id="newLivrableColor"
            label="Couleur"
            name="couleur"
            value={newLivrable.couleur}
            onChange={handleInputChange}
          />
        </Group>
        <Button onClick={handleAddLivrable}>Ajouter</Button>
      </div>
    </div>
  );
};

export default ManageDelivrables;
