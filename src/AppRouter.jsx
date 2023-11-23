import 'bootstrap/dist/css/bootstrap.min.css';

import { useMemo } from 'react';
import { Route, Routes } from 'react-router-dom';

import ErrorBoundary from './components/ErrorBoundary';
import Error from './pages/Error';
import { isFunc } from './utils/divers';

export default function ({ user }) {
    const userRoutes = useMemo(() => {
        return user?.router ? user.router : [];
    }, [user]);

    return <ErrorBoundary handleError={error => <Error error={error} />}>
        <Routes>
            {/* TODO first element is always home */}
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

            {/* Others display error */}
            <Route path="/*" element={<Error message="Page non trouvée" />} />
        </Routes>
    </ErrorBoundary>
}

function RecursiveRoute({ item }) {
    return <Routes>
        {/* Element */}
        <Route path="/" element={isFunc(item.element) ? item.element() : item.element} />

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

        {/* Others display error */}
        <Route path="/*" element={<Error message="Page non trouvée" />} />
    </Routes>
}