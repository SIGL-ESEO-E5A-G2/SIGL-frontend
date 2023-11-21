import { Amd } from 'react-bootstrap-icons';
import CoordinatriceAlternance from '../../pages/CoordinatriceAlternance';
import Entreprise from '../../pages/Entreprise';
import Home from '../../pages/Home';
import Admin from '../../pages/Admin';


export default [
    {
        path: "/",
        element: <Home />,
        children: [
            {
                path: "/coordinatriceAlternance",
                element: <CoordinatriceAlternance />,
                children: []
            },
            {
                path: "/inscription",
                element: <Entreprise />,
                children: []
            },
            {
                path: "/admin",
                element: <Admin />,
                children: []
            }
        ]   
    },
];
