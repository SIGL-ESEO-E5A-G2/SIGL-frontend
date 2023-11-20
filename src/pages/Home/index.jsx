import { useContext } from "react";
import { GearFill } from "react-bootstrap-icons";

import UserHome from "./UserHome"
import { UserContext } from "../../context/UserContext";

export default function Home({

}) {
    const user = useContext(UserContext);

    const userMenus = [
        {
            link: "/parametres",
            icon: GearFill,
            nom: "Paramètres",
            disabled: false
        },
        {
            link: "/lien",
            icon: null,
            nom: "Lien",
            disabled: false
        }
    ];

    return <>
        <UserHome>
            {userMenus}
        </UserHome>
        Bienvenue {user.nomComplet}
    </>
}
