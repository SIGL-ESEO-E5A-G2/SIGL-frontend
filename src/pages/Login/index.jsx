import { useState } from "react";
import { Button, Paper, Stack, Text, TextInput, Title } from "@mantine/core";

import { useNavigate } from "react-router-dom";

import '../../css/login.css';

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
    <div className="login-background">
      <Paper p="xl" shadow="xs" w="20vw">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            e.stopPropagation();
            handleSubmit(e);
          }}
        >
          <Stack gap={30} justify="center" ta="center">
            <Title order={3}>Connexion</Title>

            <Stack ta="left">
              <TextInput
                id="form.email"
                label="Email"
                type="email"
                required
                placeholder="Entrer votre email"
                onChange={() => setError()}
              />

              <TextInput
                id="form.password"
                label="Mot de passe"
                type="password"
                required
                placeholder="Entrer votre mot de passe"
                onChange={() => setError()}
              />

              {error && <Text c="red" ta="center"><p>{error}</p></Text>}
            </Stack>

            <Button type="submit">Se connecter</Button>
          </Stack>
        </form>
      </Paper>
    </div>
  </>
}
