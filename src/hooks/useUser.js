import { useState } from "react";

import { request } from '../utils/request';

import administrateurRouter from '../data/router/administrateurRouter.data';
import aprentisRouter from '../data/router/aprentisRouter.data';
import coordinateurAlternanceRouter from '../data/router/coordinateurAlternanceRouter.data';


/**
 * 
 * @returns {[{}, async fn: (email: string, password: string) => string, fn: ()]}
 */
export default function () {
    const [user, setUser] = useState(initUser());

    function setUserInApp(token) {
        // suppression user (deconnexion)
        if (!token) {
            localStorage.clear();
            return;
        }

        // formattage de l'user
        const user = getUserFromToken(token);

        // enregistrement user
        localStorage.setItem("token", token);
        setUser(user);
    }

    async function loadUser(email, password) {
        const token = await fetchToken(email, password);
        setUserInApp(token);
    }

    function clearUser() {
        return setUserInApp(null);
    }

    return [user, loadUser, clearUser];
}

function initUser() {
    const token = localStorage.getItem("token");
    return token ? getUserFromToken(token) : null;
}

function getUserFromToken(token) {
    const user = parseJwt(token);

    if (!user || !user.id) {
        throw new Error("Undefined user");
    }
    user.router = getUserRouter(user.role);

    return user;
}

function getUserRouter(role) {
    switch (role) { // TODO remplacer par numero role
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

async function fetchToken(email, password) {
    return request('/users/', 'get', {  // TODO trouver le bon url
        email: email,
        password: password
    })
        .then(({ data }) => data);
}

function parseJwt(token) {
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    var jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function (c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    return JSON.parse(jsonPayload);
}
