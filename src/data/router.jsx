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
        },
        {
            path: "promotions",
            name: "Promotions",
            icon: JournalText,
            element: <Promotions />,
            children: [],
            roles: [3, 4], //coordinatrice
        },
        {
            path: "apprentis",
            name: "Apprentis",
            element: <Apprentis />,
            roles: [4] // coordinatrice
        },
        {
            path: "modification",
            name: "Modifications données",
            icon: null,
            element: <ModifInfo/>,
            roles: [], //user
            
            
        },
    ]
}
