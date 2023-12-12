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
            path: "/inscription",
            element: <Entreprise />,
            children: [],
            roles : [], //admin
        },
        {
            path: "/admin",
            element: <Admin />,
            children: [],
            roles : [], //admin
        },
        {
            path: "/coordinatriceAlternance",
            element: <CoordinatriceAlternance/>,
            children: [],
            roles : [], //coordinatrice
        }
    ]
}
