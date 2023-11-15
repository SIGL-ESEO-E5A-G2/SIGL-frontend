import { Link } from "react-router-dom";
import { Form } from 'react-bootstrap';

import useUser from '../../hooks/useUser';

export default function Login({
}) {
  const [user, loadUser] = useUser();

  function handleClick() {
    loadUser(3);
  }

  return <>
    <div className="login template d-flex justify-content-center align-items-center vh-100 bg-primary">
      <div className="form_container p-5 rounded bg-white">
        <Form method="post">
          <h3 className="text-center">Connexion</h3>
          <div className="mb-2">
            <label htmlFor="email">Email</label>
            <input type="email" placeholder="Entrer votre email" className="form-control" />
          </div>
          <div className="mb-2">
            <label htmlFor="password">Mot de passe</label>
            <input type="password" placeholder="Entrer votre mot de passe" className="form-control" />
          </div>
          <div className="d-grid">
            <button type="button" onClick={handleClick} className="btn btn-primary">Se connecter</button>
          </div>
          <p className="text-right">
            <Link to="sign-up">Créer un compte</Link>
          </p>
        </Form>
      </div>
    </div>
  </>
}
