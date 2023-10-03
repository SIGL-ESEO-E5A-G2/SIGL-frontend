import App from "../App";

import Home from "../pages/Home";
import Login from "../pages/Login";
import Error from "../pages/Error";

export default [
    {
        path: "/",
        element: <App />,
        errorElement: <Error code={404} />,
        children: [
            {
                path: "",
                element: <Home />
            },
            {
                path: "login",
                element: <Login />
            }
        ]
    }
];