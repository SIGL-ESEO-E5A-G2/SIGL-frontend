import { GearFill } from "react-bootstrap-icons";
import UserHome from "../../components/UserHome"

export default function Home({

}) {
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
        },
        {
            link: "/lien",
            icon: null,
            nom: "Lien",
            disabled: false
        },
        {
            link: "/lien",
            icon: null,
            nom: "Lien",
            disabled: false
        },
        {
            link: "/lien",
            icon: null,
            nom: "Lien",
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
    </>
}
