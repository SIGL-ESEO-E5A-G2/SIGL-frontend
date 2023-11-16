import { useState } from "react";
import { request } from '../utils/request';

import administrateurRouter from '../data/router/administrateurRouter.data';
import aprentisRouter from '../data/router/aprentisRouter.data';
import coordinateurAlternanceRouter from '../data/router/coordinateurAlternanceRouter.data';


/**
 * 
 * @returns {[{}, (id)]}
 */
export default function () {
    const [user, setUser] = useState();
    // const [user, setUser] = useState(fetchUser(id));

    async function loadUser(id) {
        setUser({ router: administrateurRouter })
        // setUser(fetchUser(id));
    }

    return [user, loadUser];
}

function getUserRouter(user) { // TODO
    switch (user?.role) {
        case "admin":
            return administrateurRouter;
        case "coordinateurAlternance":
            return coordinateurAlternanceRouter;
        case "aprentis":
            return aprentisRouter;
        default:
            throw new Error('Role not found');
    }
}

async function fetchUser(id) {
    return request('/users/' + id, 'get')
        .then(({ data }) => {
            const user = data;
            user.router = getUserRouter("admin");
            return user;
        })
        .catch(() => setUser(null));
}
