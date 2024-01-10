import {
    JournalBookmarkFill,
    JournalText,
    LayoutTextSidebar,
    LayoutTextWindow,
    LayoutTextWindowReverse,
    PersonVideo2,
    ShieldLock
} from 'react-bootstrap-icons';

import Home from '../pages/Home';
import Entreprise from '../pages/Entreprise';
import Admin from '../pages/Admin';
import CoordinatriceAlternance from '../pages/CoordinatriceAlternance';
import ApprentiListing from '../pages/ApprentiListing';
import Profil from '../pages/Profil';
import Journal from '../pages/Journal';
import JournalDepot from '../pages/Journal/JournalDepot';

export default {
    path: "",
    element: <Home />,
    roles: [],
    disabled: false,
    children: [
        {
            path: "journal",
            icon: JournalBookmarkFill,
            element: <Journal />,
            name: "Journal de l'apprenti",
            roles: []
        },
        {
            path: "depots",
            icon: "",
            element: <JournalDepot />,
            name: "Dépôt de documents",
            roles: [1]
        },
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
    ]
}
