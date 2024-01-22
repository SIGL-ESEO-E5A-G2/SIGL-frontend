import { useState } from 'react';
import { Eye, EyeSlash } from 'react-bootstrap-icons';
import { Button, Group, Stack, TextInput } from '@mantine/core';

import { request } from '../../../utils/request.js';
import { hashPassword } from '../../../utils/encryption.js';
import { withNotification } from '../../../utils/divers.jsx';

const ChangePasswordForm = ({ user }) => {
  const [isPassVisible, setPassVisible] = useState();
  const [isVerifVisible, setVerifVisible] = useState();

  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errors, setErrors] = useState('');

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errors = {};

    if (!password) {
      errors.password = "Champs requis";
    }

    if (!confirmPassword) {
      errors.verif = "Champs requis";
    }

    if (!errors.verif && password !== confirmPassword) {
      errors.verif = "Les mots de passe ne correspondent pas";
    }

    if (Object.values(errors).length > 0) {
      setErrors(errors);
      return;
    }

    // Réinitialiser les champs après soumission réussie ou en cas d'erreur
    setPassword('');
    setConfirmPassword('');

    return withNotification(async () => hashPassword(password)
      .then(async (hashedPassword) => {
        console.log('Mot de passe hashé :', hashedPassword);

        return request(`/utilisateur/${user.id}`, 'patch', {
          password: hashedPassword
        });
      })
      , {
        title: "Synchronisation",
        message: "Modification du mot de passe",
        messageError: "Le mot de passe n'a pas pu être changé",
        messageSuccess: "Mot de passe changé avec succès!",
      });
  };

  return (
    <form onSubmit={handleSubmit}>
      <Stack>
        <TextInput
          w="400px"
          label="Nouveau mot de passe"
          type={isPassVisible ? "text" : "password"}
          required
          placeholder="Entrer votre nouveau mot de passe"
          value={password}
          onChange={handlePasswordChange}
          error={errors.password}
          rightSection={<div className='pass-visible' onClick={() => setPassVisible(old => !old)}>
            {isPassVisible ? <EyeSlash /> : <Eye />}
          </div>}
        />

        <TextInput
          w="400px"
          label="Confirmez le nouveau mot de passe"
          type={isVerifVisible ? "text" : "password"}
          required
          placeholder="Confirmez votre nouveau mot de passe"
          value={confirmPassword}
          onChange={handleConfirmPasswordChange}
          error={errors.verif}
          rightSection={<div className='pass-visible' onClick={() => setVerifVisible(old => !old)}>
            {isVerifVisible ? <EyeSlash /> : <Eye />}
          </div>}
        />

        <Group justify="right">
          <Button type="submit" w="max-content">
            Changer le mot de passe
          </Button>
        </Group>
      </Stack>
    </form>
  );
};

export default ChangePasswordForm;
