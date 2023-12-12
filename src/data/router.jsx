import { GearFill, TypeStrikethrough } from 'react-bootstrap-icons';
import Home from '../pages/Home';
import Entreprise from '../pages/Entreprise';
import Admin from '../pages/Admin';
import CoordinatriceAlternance from '../pages/CoordinatriceAlternance';

export default {
    path: "",
    element: <Home />,
    roles: [],
    disabled: false,
    children: [
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
            children: [],
            roles : [4], //coordinatrice
        }
    ]
}
