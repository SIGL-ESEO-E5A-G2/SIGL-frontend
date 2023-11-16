import Login from '../../pages/Login';

import App from '../../App';

import submitLoginForm from '../../pages/Login/submitLoginForm';

export default [
    {
        path: "",
        element: <>Hello world</>,
        children: [
            {
                path: "login",
                element: <Login />
            },
        ]
    }
]