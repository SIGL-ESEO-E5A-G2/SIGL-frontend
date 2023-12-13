import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { request } from '../../../utils/request.js';
import { putUtilisateur } from '../../../utils/api';
import { hashPassword } from '../../../utils/encryption.js';

const ChangePasswordForm = ({ user }) => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setError("Les mots de passe ne correspondent pas.");
      setSuccessMessage('');
      return;
    }

    hashPassword(password)
      .then((hashedPassword) => {
        console.log('Mot de passe hashé :', hashedPassword);
        request(`/utilisateur/${user.id}`)
        .then((jsonUser) => {
            const updateUser = {
                "password":hashedPassword,
            };
            putUtilisateur(user.id, jsonUser.data, updateUser);
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
      .finally(() => {
        // Réinitialiser les champs après soumission réussie ou en cas d'erreur
        setPassword('');
        setConfirmPassword('');
      });
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group className="mb-3" controlId="password">
        <Form.Label>Nouveau mot de passe</Form.Label>
        <Form.Control
          type="password"
          placeholder="Entrez votre nouveau mot de passe"
          value={password}
          onChange={handlePasswordChange}
          required
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="confirmPassword">
        <Form.Label>Confirmez le nouveau mot de passe</Form.Label>
        <Form.Control
          type="password"
          placeholder="Confirmez votre nouveau mot de passe"
          value={confirmPassword}
          onChange={handleConfirmPasswordChange}
          required
        />
      </Form.Group>

      {error && <p style={{ color: 'red' }}>{error}</p>}
      {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}

      <Button variant="primary" type="submit">
        Changer le mot de passe
      </Button>
    </Form>
  );
};

export default ChangePasswordForm;
