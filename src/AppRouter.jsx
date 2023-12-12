import 'bootstrap/dist/css/bootstrap.min.css';

import { Route, Routes } from 'react-router-dom';

import ErrorBoundary from './components/ErrorBoundary';
import Error from './pages/Error';

import { isFunc } from './utils/divers';
import { isRouteAllowed } from './utils/userRights';

import router from './data/router';

export default function ({ user }) {
    return <ErrorBoundary handleError={error => <Error error={error} />}>
        <Routes>
            <Route
                path="/*"
                element={<RecursiveRoute item={router} user={user} />}
            />

            {/* Others display error */}
            <Route path="/*" element={<Error message="Page non trouvée" />} />
        </Routes>
    </ErrorBoundary>
}

/**
 * 
 * @param {{user: {roles: [number]}, item: {roles: [number]}}} props 
 * @returns 
 */
function RecursiveRoute({ item, user }) {
    if (!isRouteAllowed(item, user)) {
        return null;
    }

    return <Routes>
        {/* Element */}
        <Route path="/" element={isFunc(item.element) ? item.element() : item.element} />

        {/* Child elements */}
        {
            item.children
                ?.map(child => {
                    if (!child || child.disabled) return;

                    const nbChilds = child.children
                        ?.filter(subChild => isRouteAllowed(subChild, user))
                        ?.length
                        || 0;

                    let path = child.path?.replace('/', '');
                    path = `/${path}${path ? "/" : ""}${nbChilds > 0 ? "*" : ""}`;

                    return <Route
                        path={path}
                        element={<RecursiveRoute item={child} user={user} />}
                    />
                })
        }

        {/* Others display error */}
        <Route path="/*" element={<Error message="Page non trouvée" />} />
    </Routes>
}
