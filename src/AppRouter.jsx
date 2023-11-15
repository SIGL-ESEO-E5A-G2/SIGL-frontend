import 'bootstrap/dist/css/bootstrap.min.css';

import { useContext, useMemo } from 'react';
import {
    createBrowserRouter,
    RouterProvider,
} from 'react-router-dom';

import { UserContext } from './context/UserContext';

import unauthentifiedUser from './data/router/unauthentifiedUser.data';
import appRouter from './data/router/aprentisRouter.data';

export default function ({ }) {
    const [user] = useContext(UserContext);

    const router = useMemo(() => {
        return createBrowserRouter(user ? user.router : appRouter);
    }, [user]);

    return <UserContext.Provider value={user}>
        <RouterProvider router={router} />
    </UserContext.Provider>
}
