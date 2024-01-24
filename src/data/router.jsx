import {
    JournalText,
    LayoutTextWindowReverse,
    Mortarboard,
    PersonVideo2,
    ShieldLock
} from 'react-bootstrap-icons';

import Admin from '../pages/Admin';
import ModifInfo from '../pages/Admin/ModifInfo';
import CoordinatriceAlternance from '../pages/CoordinatriceAlternance';
import ApprentiListing from '../pages/ApprentiListing';
import Profil from '../pages/Profil';
import Journal from '../pages/Journal';
import GrilleEvaluation from '../pages/GrilleEvaluation';
import ApprenticeshipForm from '../pages/Entreprise/form/ApprenticeshipForm';
import Apprentis from '../pages/ApprentiListing/List/Apprentis';
import Promotions from '../pages/ApprentiListing/List/Promotions';
import { Calendar } from '../pages/Calendar';
import { DepotList } from '../pages/DepotList';

export default {
    path: "",
    roles: [],
    element: <Journal />,
    disabled: false,
    children: [
        {
            path: "inscription",
            name: "Inscription entreprise",
            icon: LayoutTextWindowReverse,
            element: <ApprenticeshipForm />,
            children: [],
            roles: [3], //admin
        },
        {
            path: "admin",
            name: "Administration",
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
            path: "reset-password",
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
        },
        {
            path: "promotions",
            name: "Promotions",
            icon: JournalText,
            element: <Promotions />,
            children: [],
            roles: [4], //coordinatrice
        },
        {
            path: "apprentis",
            name: "Apprentis",
            element: <Apprentis />,
            roles: [4] // coordinatrice
        },
        {
            path: "profil",
            name: "Profil",
            element: <ModifInfo />,
            roles: [1], // user
        },
        {
            path: "calendrier",
            name: "Calendrier",
            element: <Calendar />,
            roles: [1, 2, 5] // apprenti
        },
        {
            path: "depots",
            name: "Dépôts",
            element: <DepotList />,
            roles: [3, 4],
        },
    ]
}
