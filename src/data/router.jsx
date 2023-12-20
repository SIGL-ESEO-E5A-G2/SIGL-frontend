import { JournalBookmarkFill } from 'react-bootstrap-icons';

import Home from '../pages/Home';
import Entreprise from '../pages/Entreprise';
import Admin from '../pages/Admin';
import CoordinatriceAlternance from '../pages/CoordinatriceAlternance';
import ApprentiListing from '../pages/ApprentiListing';
import Profil from '../pages/Profil';
import Journal from '../pages/Journal';

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
            path: "inscription",
            name: "Inscription entrerpise",
            element: <Entreprise />,
            children: [],
            roles : [3], //admin
        },
        {
            path: "admin",
            name: "Page admin",
            element: <Admin />,
            children: [],
            roles : [3], //admin
        },
        {
            path: "coordinatriceAlternance",
            name: "Coordinatrice d'alternance",
            element: <CoordinatriceAlternance/>,
            children: [
                {
                    path: "/gererPromotions",
                    element: <ApprentiListing />,
                    children: [],
                    roles : [4], //coordinatrice
                }
            ],
            roles : [4], //coordinatrice
        },
        {
            path: "profil",
            element: <Profil />,
            roles : [], //user
            children: [],
        },
    ]
}
