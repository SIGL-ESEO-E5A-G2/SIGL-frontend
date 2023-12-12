import { useContext } from "react";
import { GearFill, Incognito, PersonVcard, PersonVideo2 } from "react-bootstrap-icons";

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
            link: "/coordinatriceAlternance",
            icon: PersonVcard,
            nom: "Coordinatrice d'alternance",
            disabled: role != 4
        },
        {
            link: "/inscription",
            icon: PersonVideo2,
            nom: "Formulaire d'inscription",
            disabled: role != 4
        },
        ,
        {
            link: "/admin",
            icon: Incognito,
            nom: "Admin",
            disabled: role != 3
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
