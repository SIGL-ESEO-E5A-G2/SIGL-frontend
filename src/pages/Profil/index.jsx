import ChangePasswordForm from "./form/ChangePassword";
import { useContext } from "react";
import { UserContext } from "../../context/UserContext";

export default function () {
  const user = useContext(UserContext);

  return (
    <>
      <p>Bonjour, {user.nomComplet} !</p>
      <ChangePasswordForm user={user} />
    </>
  );
}
