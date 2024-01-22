import React, { useState, useEffect, useMemo } from 'react';
import { Key } from 'react-bootstrap-icons';
import { Link } from 'react-router-dom';
import { Button, Group, Table, TextInput, Select, Checkbox, Stack, Badge } from '@mantine/core';

import { ModalChangePassword } from '../modal/ModalChangePassword.jsx';
import { ModalSuppressionUsers } from '../modal/ModalSuppressionUsers.jsx';
import { roles } from '../../../data/constantes.js';
import { request } from '../../../utils/request.js';
import { getNomUser } from '../../../utils/divers.jsx';
import useArray from "../../../hooks/useArray.js";
import { dateString } from '../../../utils/formatDate.js';

const ManageUsers = () => {
  const [filters, setFilter] = useArray();

  const [currentRow, setCurrentRow] = useState();
  const [users, setUsers] = useState([]);
  const userFiltered = useMemo(() => {
    let filtered = users;
    const roleFilter = parseInt(filters.roles);
    const nomFilter = filters.nom?.toLowerCase()?.trim();
    const emailFilter = filters.email?.toLowerCase()?.trim();

    if (roleFilter && roleFilter >= 0) {
      filtered = filtered.filter((user) => {
        return user.roles.some((userRole) => userRole.id === roleFilter);
      });
    }

    if (nomFilter) {
      filtered = filtered.filter(user => getNomUser(user)?.toLowerCase()?.includes(nomFilter));
    }

    if (emailFilter) {
      filtered = filtered.filter(user => user.email?.toLowerCase()?.includes(emailFilter));
    }

    return filtered;
  }, [users, filters]);

  const [selectedUsers, setSelectedUsers] = useState([]);

  const [showModalSuppreUsers, setShowModalSuppreUsers] = useState();
  const [showModalModifPass, setShowModalModifPass] = useState();

  useEffect(() => {
    request('/utilisateurDetail/')
      .then((res) => setUsers(res.data))
  }, []);

  const handleCheckboxChange = (id) => {
    setSelectedUsers((prevSelected) => {
      if (prevSelected.includes(id)) {
        return prevSelected.filter((userId) => userId !== id);
      } else {
        return [...prevSelected, id];
      }
    });
  };

  return (
    <Stack p="md">
      <Group align="end">
        <Button onClick={() => setShowModalSuppreUsers(selectedUsers.length > 0)}>Supprimer les utilisateurs sélectionnés</Button>

        {/* Filter roles */}
        <Select
          label="Profile d'utilisateur"
          data={[{ value: "-1", label: "Tous" }, ...roles.map(role => ({ label: role.name, value: role.id + "" }))]}
          placeholder="Sélectionner le profil"
          value={filters.roles}
          onChange={selected => setFilter('roles', selected)}
        />

        {/* Filter nom */}
        <TextInput
          label="Nom"
          placeholder="Saisissez un nom"
          value={filters.nom}
          onChange={e => setFilter("nom", e.target.value)}
        />

        {/* Filter email */}
        <TextInput
          label="Email"
          type="email"
          placeholder="Saisissez un email"
          value={filters.email}
          onChange={e => setFilter("email", e.target.value)}
        />
      </Group>

      {/* Modal suppression users */}
      <ModalSuppressionUsers
        show={showModalSuppreUsers}
        close={() => setShowModalSuppreUsers(false)}
        userIds={selectedUsers}
      />

      {/* Modal change pass */}
      <ModalChangePassword
        show={showModalModifPass}
        close={() => setShowModalModifPass(false)}
        row={currentRow}
      />

      {/* Data */}
      <Table striped highlightOnHover withTableBorder>
        <Table.Thead>
          <Table.Tr>
            <Table.Th w="2vw"></Table.Th>
            <Table.Th>Nom</Table.Th>
            <Table.Th>Email</Table.Th>
            <Table.Th>Activé</Table.Th>
            <Table.Th>Dernière connexion</Table.Th>
            <Table.Th w="6vw">Mot de passe</Table.Th>
          </Table.Tr>
        </Table.Thead>

        <Table.Tbody>
          {
            userFiltered.map((user) => (
              <Table.Tr key={user.id}>
                <Table.Td>
                  <Checkbox
                    id={`checkbox_${user.id}`}
                    checked={selectedUsers.includes(user.id)}
                    onChange={() => handleCheckboxChange(user.id)}
                  />
                </Table.Td>
                <Table.Td>{getNomUser(user)}</Table.Td>
                <Table.Td><Link to={"mailto:" + user.email}>{user.email}</Link></Table.Td>
                <Table.Td>
                  {user.is_active ? <Badge color="green">Activé</Badge> : <Badge color="red">Désactivé</Badge>}
                </Table.Td>
                <Table.Td>{user.last_login ? dateString(new Date(user.last_login), true) : ""}</Table.Td>
                <Table.Td>
                  <Button onClick={() => {
                    setShowModalModifPass(true)
                    setCurrentRow(user);
                  }}><Key /></Button>
                </Table.Td>
              </Table.Tr>
            ))
          }
        </Table.Tbody>
      </Table>
    </Stack>
  );
};

export default ManageUsers;