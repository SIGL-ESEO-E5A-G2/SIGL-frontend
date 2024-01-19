import {
    JournalText,
    LayoutTextWindowReverse,
    Mortarboard,
    PersonVideo2,
    ShieldLock
} from 'react-bootstrap-icons';

import Entreprise from '../pages/Entreprise';
import Admin from '../pages/Admin';
import CoordinatriceAlternance from '../pages/CoordinatriceAlternance';
import ApprentiListing from '../pages/ApprentiListing';
import Profil from '../pages/Profil';
import Journal from '../pages/Journal';
import GrilleEvaluation from '../pages/GrilleEvaluation';

export default {
    path: "",
    roles: [],
    element: <Journal />,
    disabled: false,
    children: [
        {
            path: "inscription",
            name: "Inscription entrerpise",
            icon: LayoutTextWindowReverse,
            element: <Entreprise />,
            children: [],
            roles: [3], //admin
        },
        {
            path: "admin",
            name: "Page admin",
            icon: ShieldLock,
            element: <Admin />,
            children: [],
            roles: [3], //admin
        },
        {
            path: "coordinatriceAlternance",
            icon: PersonVideo2,
            name: "Coordinatrice d'alternance",
            element: <CoordinatriceAlternance />,
            children: [],
            roles: [3, 4], //coordinatrice
        },
        {
            path: "gererPromotions",
            name: "Gerer les promotions",
            icon: JournalText,
            element: <ApprentiListing />,
            children: [],
            roles: [3, 4], //coordinatrice
        },
        {
            path: "profil",
            element: <Profil />,
            roles: [], //user
            children: [],
        },
        {
            path: "grilleevaluation",
            icon: Mortarboard,
            name: "Grille d'évaluation",
            element: <GrilleEvaluation />,
            roles: [1, 2, 5],
        }
    ]
}
