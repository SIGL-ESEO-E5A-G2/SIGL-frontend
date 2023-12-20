import { GearFill, TypeStrikethrough } from 'react-bootstrap-icons';
import Home from '../pages/Home';
import Journal from '../pages/Journal';

export default {
    path: "",
    element: <Home />,
    roles: [],
    disabled: false,
    children: [
        {
            path: "journal",
            element: <Journal />,
            name: "Journal de l'apprenti",
            roles: []
        }
    ]
}
