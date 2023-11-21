import { useContext } from "react";
import { GearFill } from "react-bootstrap-icons";

import UserHome from "./UserHome"
import { UserContext } from "../../context/UserContext";

export default function Home({

}) {
    const user = useContext(UserContext);
    const role = user?.roles ? user.roles[0] : 0;
    let tuteur = "";
    let ma = "";
    if (user.tuteurPedagogique) {
        tuteur = ((user.tuteurPedagogique.utilisateur.prenom || "") + " " + (user.tuteurPedagogique.utilisateur.nom || '')).trim();
    }
    if (user.maitreAlternance) {
        ma = ((user.maitreAlternance.utilisateur.prenom || "") + " " + (user.maitreAlternance.utilisateur.nom || '')).trim();
    }

    const userMenus = [
        {
            link: "/parametres",
            icon: GearFill,
            nom: "Paramètres",
            disabled: ![4].includes(role)
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
        Bienvenue {user.nomComplet} {
            role == 1 ? `[Tuteur: ${tuteur}, MA: ${ma}]` : ""
        }
    </>
}
