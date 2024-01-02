import { useState } from "react";
import { Button, Form } from 'react-bootstrap';
import { useNavigate } from "react-router-dom";

import './login.css';

export default function Login({ loadUser }) {
  const navigate = useNavigate();

  const [error, setError] = useState();

  function handleSubmit({ currentTarget: form }) {
    const email = form['form.email'].value;
    const password = form['form.password'].value;

    loadUser(email, password)
      .then(() => {
        navigate('/');
        // window.location.reload();
      })
      .catch((error) => {
        let message = 'Une erreur est survenue';
        if (error?.response?.data) {
          let allErrors = Object.values(error.response.data);
          message = allErrors.length > 0 ? allErrors[0] : message;
        }
        else if (error?.message) {
          message = error?.message
        }

        setError(message);
      });
  }

  return <>
    <div className="login template d-flex justify-content-center align-items-center vh-100 bg-primary">
      <div className="form_container p-5 rounded bg-white form-container">
        <Form
          onSubmit={(e) => {
            e.preventDefault();
            e.stopPropagation();
            handleSubmit(e);
          }}
        >
          <h3 className="text-center">Connexion</h3>

          <Form.Group className="mb-3" controlId="form.email" onChange={() => setError()}>
            <Form.Label>Email</Form.Label>
            <Form.Control type="email" placeholder="Entrer votre email" required />
          </Form.Group>
          <Form.Group className="mb-3" controlId="form.password" onChange={() => setError()}>
            <Form.Label>Mot de passe</Form.Label>
            <Form.Control type="password" placeholder="Entrer votre mot de passe" required />
          </Form.Group>

          <div className="text-center text-danger">
            <p>{error}</p>
          </div>

          <div className="d-grid">
            <Button type="submit">Se connecter</Button>
          </div>
        </Form>
      </div>
    </div>
  </>
}
