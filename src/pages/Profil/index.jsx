import { useContext } from "react";
import { Center, Stack, Text } from "@mantine/core";

import ChangePasswordForm from "./form/ChangePassword";
import { UserContext } from "../../context/UserContext";

export default function () {
  const user = useContext(UserContext);

  return <Stack w="max-content">
    <Text>Bonjour, {user.nomComplet} !</Text>

    <br />

    <ChangePasswordForm user={user} />
  </Stack>
}
