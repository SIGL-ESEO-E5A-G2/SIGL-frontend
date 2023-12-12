import CoordinatriceAlternance from '../../pages/CoordinatriceAlternance';
import Home from '../../pages/Home';

export default [
    {
        path: "/",
        element: <Home />,
        children: [{
            path: "/coordinatriceAlternance",
            element: <CoordinatriceAlternance/>,
            children: []
        },]
    }
];
