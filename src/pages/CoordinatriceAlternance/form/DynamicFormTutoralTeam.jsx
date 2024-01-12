import React, { Component } from 'react';
import { Button, Group, Select, Stack, TextInput } from '@mantine/core';
import { hashPassword } from '../../../utils/encryption.js';
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
    const newUser = {
      name: "",
      prenom: "",
      email: "",
    };

    this.setState({
      users: [...this.state.users, newUser],
    });
  };

  handleChange = (e, index, fieldName) => {
    const { value } = e.target;
    this.setState((prevState) => {
      const newUsers = [...prevState.users];
      newUsers[index][fieldName] = value;
      return { users: newUsers };
    });
  };

  handleRemoveUser = (index) => {
    const newUsers = [...this.state.users];
    newUsers.splice(index, 1);
    this.setState({ users: newUsers });
  };

  handleSubmit = async (e) => {
    e.preventDefault();
    const roleValue = this.state.role === "Tuteur pédagogique" ? 2 : 5;
    const password = "autogenerate";
    const hashedPassword = await hashPassword(password);

    try {
      await Promise.all(
        this.state.users.map(async (user) => {
          const newUser = {
            "roles": [roleValue],
            "password": hashedPassword,
            "last_login": "2023-11-20T13:01:16.160Z",
            "is_superuser": true,
            "nom": user.name,
            "prenom": user.prenom,
            "email": user.email,
            "is_active": true,
            "is_staff": true,
            "groups": [],
            "user_permissions": [],
          };
          const res = await request("/utilisateur/", "post", newUser);

          const newProfil = {
            "utilisateur": res.data.id,
          };

          await request("/" + this.state.role + "/", "post", newProfil);
        })
      );

      window.location.reload();
    } catch (error) {
      console.error("Erreur de configuration de la requête :", error.message);
    }
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
            data={[
              { value: "tuteurpedagogique", label: "Tuteur pédagogique" },
              { value: "maitrealternance", label: "Maître d'apprentissage" },
            ]}
            value={this.state.role}
            onChange={this.handleRoleChange}
          />

          {this.state.users.map((user, index) => (
            <Stack key={index}>
              <Group>
                <TextInput
                  id={`nom_${index}`}
                  label="Nom"
                  required
                  value={user.name}
                  onChange={(e) => this.handleChange(e, index, 'name')}
                />

                <TextInput
                  id={`prenom_${index}`}
                  label="Prénom"
                  required
                  value={user.prenom}
                  onChange={(e) => this.handleChange(e, index, 'prenom')}
                />

                <TextInput
                  id={`email_${index}`}
                  label="Email"
                  type="email"
                  required
                  value={user.email}
                  onChange={(e) => this.handleChange(e, index, 'email')}
                />

                <Button
                  type="button"
                  onClick={() => this.handleRemoveUser(index)}
                  variant="outline"
                  color="red"
                >
                  Supprimer l'élément
                </Button>
              </Group>
            </Stack>
          ))}

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
