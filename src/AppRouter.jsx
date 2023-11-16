import 'bootstrap/dist/css/bootstrap.min.css';

import { useMemo } from 'react';

import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Error from './pages/Error';


export default function ({ user }) {

    const userRoutes = useMemo(() => {
        return user?.router ? user.router : [];
    }, [user]);

    return <BrowserRouter>
        <Routes>
            <Route path='/*' element={<Error code={404} />} />

            {
                userRoutes.map(item => {
                    if (!item || item.disabled) return;

                    const path = "/" + item.path + (item.children ? "/*" : "");
                    return <Route
                        path={path}
                        element={<RecursiveRoute item={item} />}
                    />
                })
            }
        </Routes>
    </BrowserRouter>
}

function RecursiveRoute({ item }) {
    return <Routes>
        <Route path="/" element={item.element ? item.element : <Error code={404} />} />

        {
            item.children?.map(child => {
                if (!child || child.disabled) return;

                const path = "/" + child.path + (child.children ? "/*" : "");
                return <Route
                    path={path}
                    element={<RecursiveRoute item={child} />}
                />
            })
        }
    </Routes>
}