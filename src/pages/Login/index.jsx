import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button, Form } from 'react-bootstrap';

export default function Login({ loadUser }) {
  const navigate = useNavigate();

  const [error, setError] = useState();

  function handleSubmit({ currentTarget: form }) {
    const email = form['form.email'].value;
    const password = form['form.password'].value;

    console.log("TAG submit", { email, password });

    loadUser(1);

    // request('/user/', "post", {
    //   email: email,
    //   password: password
    // })
    //   .then(({ data }) => {
    //     console.log("user", data);
    //     // TODO loadUser(user.id);
    //     navigate('/');
    //   })
    //   .catch(e => setError("Une erreure est survenue"))
  }

  return <>
    <div className="login template d-flex justify-content-center align-items-center vh-100 bg-primary">
      <div className="form_container p-5 rounded bg-white">
        <Form onSubmit={(e) => {
          e.preventDefault();
          e.stopPropagation();
          handleSubmit(e);
        }}>
          <h3 className="text-center">Connexion</h3>

          <Form.Group className="mb-3" controlId="form.email">
            <Form.Label>Email</Form.Label>
            <Form.Control type="email" placeholder="Entrer votre email" required />
          </Form.Group>
          <Form.Group className="mb-3" controlId="form.password">
            <Form.Label>Mot de passe</Form.Label>
            <Form.Control type="password" placeholder="Entrer votre mot de passe" required />
          </Form.Group>

          <div className="text-center">
            {error}
          </div>

          <div className="d-grid">
            <Button type="submit">Se connecter</Button>
          </div>
        </Form>

        {/* TODO */}
        {/* <p className="text-center">
          <Link to="sign-up">Créer un compte</Link>
        </p> */}
      </div>
    </div>
  </>
}
