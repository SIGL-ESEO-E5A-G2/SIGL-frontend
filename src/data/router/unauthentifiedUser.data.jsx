import Error from "../../pages/Error";
import Login from "../../pages/Login";

import UnauthentifiedApp from "../../UnauthentifiedApp";

export default [
    {
        path: "/",
        element: <UnauthentifiedApp />,
        errorElement: <Error code={404} />,
        children: [
            {
                path: "login",
                element: <Login />
            },
        ]
    }
]