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
            {
                userRoutes.map(item => {
                    if (!item || item.disabled) return;

                    const nbChilds = item.children?.filter(child => child && !child.disabled)?.length || 0;
                    let path = item.path?.replace('/', '');
                    path = `/${path}${path ? "/" : ""}${nbChilds > 0 ? "*" : ""}`;
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
        {/* Others display error */}
        <Route path="/*" element={<Error code={404} />} />

        {/* Element */}
        <Route path="/" element={item.element} />

        {/* Child elements */}
        {
            item.children?.map(child => {
                if (!child || child.disabled) return;

                const nbChilds = child.children?.filter(subChild => subChild && !subChild.disabled)?.length || 0;
                let path = child.path?.replace('/', '');
                path = `/${path}${path ? "/" : ""}${nbChilds > 0 ? "*" : ""}`;
                return <Route
                    path={path}
                    element={<RecursiveRoute item={child} />}
                />
            })
        }
    </Routes>
}