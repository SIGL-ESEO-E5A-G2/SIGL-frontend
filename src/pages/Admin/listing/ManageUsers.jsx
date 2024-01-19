import React, { useState, useEffect } from 'react';
import { Button, Group, Table, TextInput, Select, Checkbox } from '@mantine/core';

import { request } from '../../../utils/request.js';
import { roles } from '../../../data/constantes.js';
import { putUtilisateur } from '../../../utils/api.js';
import { hashPassword } from '../../../utils/encryption.js';

const ManageUsers = () => {
  const [users, setUsers] = useState([]);
  const [passwords, setPasswords] = useState({});
  const [selectedRole, setSelectedRole] = useState('');
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    request('/utilisateurDetail/')
      .then((res) => {
        setUsers(res.data);
        setFilteredUsers(res.data);
      })
      .catch((error) => {
        console.error('Error fetching user data:', error.message);
      });
  }, []);

  const handleDeleteClick = () => {
    selectedUsers.forEach((userId) => {
      request(`/utilisateur/${userId}`, 'delete')
        .catch((error) => {
          console.error('Erreur lors de la suppression de l\'utilisateur avec ID', userId, ':', error.message);
        });
    });
    window.location.reload();
  };

  const handleChangePassword = async (id) => {
    hashPassword(passwords[id])
      .then((hashedPassword) => {
        request(`/utilisateur/${id}`)
          .then((jsonUser) => {
            const updateUser = {
              "password": hashedPassword,
            };
            putUtilisateur(id, jsonUser.data, updateUser);
          })
          .catch((error) => {
            console.error("Erreur lors de la mise à jour de l'apprenti :", error.message);
          });
        setError("");
        setSuccessMessage("Mot de passe changé avec succès!");
      })
      .catch((error) => {
        console.error('Erreur lors du hachage du mot de passe :', error);
        setError("Erreur lors de la modification du mot de passe.");
        setSuccessMessage('');
      })
  };

  const handleRoleChange = (role) => {
    setSelectedRole(role);
    filterUsersByRole(role);
  };

  const filterUsersByRole = (role) => {
    const filtered = users.filter((user) => {
      return user.roles.some((userRole) => userRole.libelle === role);
    });
    setFilteredUsers(filtered);
  };

  const handleCheckboxChange = (id) => {
    setSelectedUsers((prevSelected) => {
      if (prevSelected.includes(id)) {
        return prevSelected.filter((userId) => userId !== id);
      } else {
        return [...prevSelected, id];
      }
    });
  };

  const handlePasswordChange = (id, value) => {
    setPasswords((prevPasswords) => ({
      ...prevPasswords,
      [id]: value,
    }));
  };

  return (
    <div>
      <Group>
        <Select
          id="selectRole"
          label="Sélectionner le profil"
          data={roles.map(role => role.name)}
          value={selectedRole}
          onChange={handleRoleChange}
        />
      </Group>

      <Table striped bordered hover>
        <Table.Thead>
          <Table.Tr>
            <Table.Th>Nom</Table.Th>
            <Table.Th>Prénom</Table.Th>
            <Table.Th>Mot de passe</Table.Th>
            <Table.Th>Action</Table.Th>
          </Table.Tr>
        </Table.Thead>

        <Table.Tbody>
          {filteredUsers.map((user) => (
            <Table.Tr key={user.id}>
              <Table.Td>
                <Checkbox
                  id={`checkbox_${user.id}`}
                  checked={selectedUsers.includes(user.id)}
                  onChange={() => handleCheckboxChange(user.id)}
                />
              </Table.Td>
              <Table.Td>{user.nom}</Table.Td>
              <Table.Td>{user.prenom}</Table.Td>
              <Table.Td>
                <TextInput
                  id={`password_${user.id}`}
                  type="password"
                  placeholder="Nouveau mot de passe"
                  value={passwords[user.id] || ''}
                  onChange={(e) => handlePasswordChange(user.id, e.target.value)}
                />
              </Table.Td>
              <Table.Td>
                <Button onClick={() => handleChangePassword(user.id)}>
                  Changer le mot de passe
                </Button>
              </Table.Td>
            </Table.Tr>
          ))}
        </Table.Tbody>
      </Table>

      {error && <div style={{ color: 'red' }}>{error}</div>}
      {successMessage && <div style={{ color: 'green' }}>{successMessage}</div>}

      <Button onClick={handleDeleteClick}>Supprimer les utilisateurs sélectionnés</Button>
    </div>
  );
};

export default ManageUsers;