import React, { Component } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

class DynamicFormTutoralTeam extends Component {
  constructor(props) {
    super(props);
    this.state = {
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
        name: "",
        prenom: "",
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

  render() {
    return (
      <div>
        <h2 className="text-center mt-3">Ajouter des membres d'équipe tutorale</h2>
        <Form className="m-5" method="post" onSubmit={this.handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Rôle:</Form.Label>
            <Form.Select id="role" name="role" value={this.state.role} onChange={this.handleChange}>
              <option value="" disabled>Select one--</option>
              <option value="tuteurPedagogique">Tuteur pédagogique</option>
              <option value="maitreApprentissage">Maître d'apprentissage</option>
            </Form.Select>
          </Form.Group>

          {this.state.users.map((user, index) => (
          <Row key={index}>
            <Col>
              <Form.Group className="mb-3">
                <Form.Label>Nom:</Form.Label>
                <Form.Control type="text" name="nom" id="nom" value={user.name} onChange={(e) => this.handleChange(e, index)} />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group className="mb-3">
                <Form.Label>Prénom:</Form.Label>
                <Form.Control type="text" name="prenom" id="prenom" value={user.prenom} onChange={(e) => this.handleChange(e, index)} />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group className="mb-3">
                <Form.Label>Email:</Form.Label>
                <Form.Control type="email" name="email" id="email" value={user.email} onChange={(e) => this.handleChange(e, index)} />
              </Form.Group>
            </Col>
          </Row>
          ))}

          <Button variant="primary" type="button" onClick={this.handleAddUser}>
            Ajouter un utilisateur
          </Button>
          <Button variant="primary" type="button">
            Valider la sélection
          </Button>
        </Form>
      </div>
    );
  }
}

export default DynamicFormTutoralTeam;
