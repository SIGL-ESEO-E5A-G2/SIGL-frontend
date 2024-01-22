import { useState } from "react";

import { request } from '../utils/request';
import { encryptData, parseToken } from '../utils/encryption';
import { getNomUser } from "../utils/divers";

/**
 * 
 * @returns {[{}, async fn: (email: string, password: string) => string, fn: ()]}
 */
export default function () {
    const [user, setUser] = useState(initUser());

    /**
     * Enregistre un utilisateur dans le local storage et dans l'applicatio en fonction de son token
     * 
     * @param {string} token 
     */
    function setUserInApp(token) {
        // suppression user (deconnexion)
        if (!token) {
            sessionStorage.clear();
            localStorage.clear();

            return;
        }

        // formattage de l'user
        const user = getUserFromToken(token);

        // enregistrement user
        sessionStorage.setItem("token", token);
        setUser(user);
    }

    /**
     * Connect un utilisateur avec un identifiant mot de passe
     * @param {string} email 
     * @param {string} password 
     */
    async function loadUser(email, password) {
        const token = await fetchToken(email, password);
        setUserInApp(token);
    }

    /**
     * Nettoie l'utilisateur
     */
    function clearUser() {
        setUserInApp(null);
    }

    return [user, loadUser, clearUser];
}

/**
 * Initie l'utilisateur en fonction du token stocké dans le localstorage
 * 
 * @returns {utilisateur} renvoie l'utilisateur si connecté
 */
function initUser() {
    const token = sessionStorage.getItem("token");
    return token ? getUserFromToken(token) : null;
}

/**
 * Authentifie l'utilisateur et récupère son token
 * 
 * @param {string} email 
 * @param {string} password 
 * @returns {string} Le token ou une erreur
 */
async function fetchToken(email, password) {
    return request('/authentification/', 'post', {
        email: email,
        password: password
    })
        .then(({ data }) => {
            const id = data?.id;
            if (!id) {
                throw new Error(`Utilisateur non trouvé`);
            }

            // update derniere date de connexion
            request(`/utilisateur/${id}`, 'patch', { last_login: new Date() });

            return data.jwt_token;
        })
    // .then((data) => encryptData(data));
}

/**
 * Récupère l'utilisateur à partir du token et map certaines valeurs comme le router de l'user
 * 
 * @param {string} token 
 * @returns {utilisateur}
 */
function getUserFromToken(token) {
    let user = parseToken(token);

    // check user
    if (!user || !user.id) {
        throw new Error("Utilisateur non trouvé");
    }

    const roles = JSON.parse(user.roles).map(role => role.pk);
    // return getUserFromRoles(user.id, roles); // TODO

    // map data to user
    user = {
        ...user,
        roles,
        nomComplet: getNomUser(user)
    }

    return user;
}

async function getUserFromRoles(userId, roles) {
    let url = "";
    if (roles.includes(1)) url = "";
    else if (roles.includes(2)) url = "";
    else if (roles.includes(3)) url = "";
    else if (roles.includes(4)) url = "";
    else if (roles.includes(5)) url = "";

    return request(url);
}
