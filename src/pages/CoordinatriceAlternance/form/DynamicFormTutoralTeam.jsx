import React, { Component } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
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
        .then((res) => {
          const newProfil = {
            "utilisateur": res.data.id,
          };
          request("/" + this.state.role + "/", "post", newProfil)
            .then((res) => {
              window.location.reload();
            })
            .catch((error) => {
              console.error("Erreur de configuration de la requête :", error.message);
            });
        })
        .catch((error) => {
          console.error("Erreur de configuration de la requête :", error.message);
        });
    });
  };

  handleRoleChange = (e) => {
    this.setState({ role: e.target.value });
  };

  render() {
    return (
      <div>
        <h2 className="text-center mt-3">Ajouter des membres d'équipe tutorale</h2>
        <Form className="m-5" onSubmit={this.handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Rôle:</Form.Label>
            <Form.Select id="role" name="role" value={this.state.role} onChange={this.handleRoleChange}>
              <option value="" disabled>Sélectionnez un--</option>
              <option value="tuteurpedagogique">Tuteur pédagogique</option>
              <option value="maitrealternance">Maître d'apprentissage</option>
            </Form.Select>
          </Form.Group>

          {this.state.users.map((user, index) => (
            <Row key={index}>
              <Col>
                <Form.Group className="mb-3">
                  <Form.Label>Nom:</Form.Label>
                  <Form.Control type="text" name="lastName" id="nom" value={user.lastName} onChange={(e) => this.handleChange(e, index)} required />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group className="mb-3">
                  <Form.Label>Prénom:</Form.Label>
                  <Form.Control type="text" name="firstName" id="prenom" value={user.firstName} onChange={(e) => this.handleChange(e, index)} required />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group className="mb-3">
                  <Form.Label>Email:</Form.Label>
                  <Form.Control type="email" name="email" id="email" value={user.email} onChange={(e) => this.handleChange(e, index)} required />
                </Form.Group>
              </Col>
            </Row>
          ))}

          <Button variant="primary" type="button" onClick={this.handleAddUser}>
            Ajouter un utilisateur
          </Button>
          <Button variant="primary" type="submit">
            Valider la sélection
          </Button>
        </Form>
      </div>
    );
  }
}

export default DynamicFormTutoralTeam;
