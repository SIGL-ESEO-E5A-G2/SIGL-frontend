import { useState } from "react";

import { request } from '../utils/request';
import { encryptData, parseToken } from '../utils/encryption';

import administrateurRouter from '../data/router/administrateurRouter.data';
import aprentisRouter from '../data/router/aprentisRouter.data';
import coordinateurAlternanceRouter from '../data/router/coordinateurAlternanceRouter.data';
import maitreAlternanceRouter from '../data/router/maitreAlternanceRouter.data';
import tuteurPedagogiqueRouter from '../data/router/tuteurPedagogiqueRouter.data';


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
            localStorage.clear();
            return;
        }

        // formattage de l'user
        const user = getUserFromToken(token);

        // enregistrement user
        localStorage.setItem("token", token);
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
    const token = localStorage.getItem("token");
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

            return request('/utilisateur/' + id, 'get')
                .then((res) => {
                    if (res.data?.roles && res.data?.roles[0] == 1) {
                        return request('/apprentidetail/' + id, 'get')
                            .then(resDetail => {
                                console.log("TAG user", resDetail.data)
                                return { data: { ...resDetail.data, ...resDetail.data?.utilisateur } }
                            });
                    } else return res;
                })
        })
        .then(({ data }) => encryptData(data));
}

/**
 * Récupère l'utilisateur à partir du token et map certaines valeurs comme le router de l'user
 * 
 * @param {string} token 
 * @returns {utilisateur}
 */
function getUserFromToken(token) {
    const user = parseToken(token);

    // check user
    if (!user || !user.id) {
        throw new Error("Utilisateur non trouvé");
    }

    // map data to user
    user.router = getUserRouter(user.roles[0]);
    user.nomComplet = ((user.prenom || '') + ' ' + (user.nom || '')).trim();

    return user;
}

/**
 * Récupère le router associé à l'utilisateur en fonction de son role
 * 
 * @param {number} role 
 * @returns 
 */
function getUserRouter(role) {
    switch (role) {
        case 1: // apprentis
            return aprentisRouter;
        case 2: // tuteur
            return tuteurPedagogiqueRouter;
        case 3: // admin
            return administrateurRouter;
        case 4: // coordinatrice
            return coordinateurAlternanceRouter;
        case 5: // MA
            return maitreAlternanceRouter;
        default:
            throw new Error(`Role de l'utilisateur non trouvé`);
    }
}
