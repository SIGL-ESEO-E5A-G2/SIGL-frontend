import { GearFill, TypeStrikethrough } from 'react-bootstrap-icons';
import Home from '../pages/Home';
import Blog from '../pages/Blog';

export default {
    path: "",
    element: <Home />,
    roles: [],
    disabled: false,
    children: [
        {
            path: "blog",
            element: <Blog />,
            name: "Blog apprenti",
            roles: [1]
        }
    ]
}
