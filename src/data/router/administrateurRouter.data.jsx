import App from '../../App';
import Error from '../../pages/Error';

export default [
    {
        path: "/",
        element: <App />,
        errorElement: <Error code={404} />,
        children: []
    }
];
