import React, { Component } from 'react';
import { Button, Group, Select, Stack, TextInput } from '@mantine/core';

import { request } from '../../../utils/request.js';

class DynamicFormTutoralTeam extends Component {
  constructor(props) {
    super(props);
    this.state = {
      role: "",
      users: [
        {
          name: "",
          prenom: "",
          email: "",
        },
      ],
    };
  }

  handleAddUser = () => {
    this.setState({
      users: [...this.state.users, {
        lastName: "",
        firstName: "",
        email: "",
      }],
    });
  };

  handleChange = (e, index) => {
    const { name, value } = e.target;
    const newUsers = [...this.state.users];
    newUsers[index] = { ...newUsers[index], [name]: value };
    this.setState({ users: newUsers });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    // Access the user data and role
    const roleValue = this.state.role === "tuteurpedagogique" ? 2 : 5
    this.state.users.forEach((user, item) => {
      const newUser = {
        "roles": [roleValue],
        "password": "autogenerate",
        "last_login": "2023-11-20T13:01:16.160Z",
        "is_superuser": true,
        "nom": user.lastName,
        "prenom": user.firstName,
        "email": user.email,
        "is_active": true,
        "is_staff": true,
        "groups": [],
        "user_permissions": [],
      }


      request("/utilisateur/", "post", newUser)
        .then(async (res) => {
          const newProfil = {
            "utilisateur": res.data.id,
          };

          return request("/" + this.state.role + "/", "post", newProfil)
            .then(() => window.location.reload());
        })
        .catch((error) => {
          console.error("Erreur de configuration de la requête :", error.message);
        });
    });
  };

  handleRoleChange = (e) => {
    this.setState({ role: e });
  };

  render() {
    return (
      <div>
        <h2 className="text-center mt-3">Ajouter des membres d'équipe tutorale</h2>
        <form className="m-5" onSubmit={this.handleSubmit}>
          <Select
            id="role"
            w="max-content"
            label="Rôle"
            data={["Tuteur pédagogique", "Maître d'apprentissage"]}
            value={this.state.role}
            onChange={this.handleRoleChange}
          />

          {
            this.state.users.map((user, index) => (
              <Stack key={index}>
                <Group>
                  <TextInput
                    id="nom"
                    label="Nom"
                    required
                    defaultValue={user.lastName}
                    onChange={(e) => this.handleChange(e, index)}
                  />

                  <TextInput
                    id="prenom"
                    label="Prénom"
                    required
                    defaultValue={user.firstName}
                    onChange={(e) => this.handleChange(e, index)}
                  />

                  <TextInput
                    id="email"
                    label="Email"
                    type="email"
                    required
                    defaultValue={user.email}
                    onChange={(e) => this.handleChange(e, index)}
                  />
                </Group>
              </Stack>
            ))
          }

          <Group>
            <Button type="button" onClick={this.handleAddUser}>
              Ajouter un utilisateur
            </Button>

            <Button type="submit">
              Valider la sélection
            </Button>
          </Group>
        </form>
      </div>
    );
  }
}

export default DynamicFormTutoralTeam;
