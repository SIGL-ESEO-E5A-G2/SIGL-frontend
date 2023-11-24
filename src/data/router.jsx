import { GearFill, TypeStrikethrough } from 'react-bootstrap-icons';
import Home from '../pages/Home';

export default {
    path: "",
    element: <Home />,
    roles: [],
    disabled: false,
    children: [
        {
            path: "test",
            element: "Ceci est un test",
            name: "Page de test",
            roles: [3, 4]
        },
        {
            path: "parametres",
            element: "Hello world",
            icon: GearFill,
            name: "Paramètres",
            children: [
                {
                    path: "test",
                    element: "Test sub child",
                    icon: TypeStrikethrough,
                    name: "Test child",
                }
            ]
            // roles: null
        }
    ]
}
