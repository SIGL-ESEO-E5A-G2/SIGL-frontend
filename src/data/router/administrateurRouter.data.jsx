import App from '../../App';
import Error from '../../pages/Error';
import Home from '../../pages/Home';

export default [
    {
        path: "/",
        element: <Home />,
        errorElement: <Error code={404} />,
        children: [
            {
                path: "test",
                element: <>Hello world</>
            }
        ]
    }
];
