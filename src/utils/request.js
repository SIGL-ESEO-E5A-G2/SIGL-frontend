import axios from 'axios';
import { getSimpleDate } from './formatDate';
const urlBack = import.meta.env.VITE_URL_BACK;

/**
 * Requete vers le back
 * 
 * @param {string} url 
 * @param {"post" | "get" | "put" | "patch" | "delete"} method 
 * @param {{*}} data 
 */
export async function request(url, method = "get", data) {
    let mappedUrl = url || "";
    if (!mappedUrl.endsWith('/') && !mappedUrl.includes('?')) {
        mappedUrl += "/";
    }

    // if (method === "get") {
    //     if (mappedUrl.includes('?')) mappedUrl += "&";
    //     else mappedUrl += "?";
    //     mappedUrl += "format=json";
    // }

    return axios({
        method: method,
        url: mappedUrl,
        baseURL: urlBack,
        data: data,
        timeout: 1000,
        headers: {
            'Content-Type': 'application/json',
        }
    });
}

/**
 * Dépose un fichier
 * 
 * @param {{id: number, cheminFichier: string}} depot 
 * @param {File} file 
 * @returns 
 */
export async function uploadFile(user, depotId, file) {
    const cheminFichier = `${(user.prenom.substring(0, 1) + user.nom).toLowerCase()}/${file.name}`;

    return axios({
        method: 'post',
        url: '/upload-pdf/',
        baseURL: urlBack,
        data: {
            pdf_file: file,
            file_path: cheminFichier
            // utilisateur: userId,
        },
        timeout: 1000,
        headers: {
            'Content-Type': 'multipart/form-data',
        }
    })
        .then(() => {
            return request('/depot/' + depotId, 'patch', {
                // cheminFichier: file.name,
                cheminFichier: cheminFichier,
                livraison: new Date() // TODO ou dateLivraison (verifier)
            })
        });
}

export async function getFile(userId, path) {
    return axios({
        method: "post",
        url: "/get-pdf/",
        baseURL: urlBack,
        data: {
            file_path: path,
            utilisateur: userId,
        },
        timeout: 1000,
        headers: {
            'Content-Type': 'application/pdf',
        }
    });
}

export async function getFiles(userId) {
    return axios({
        method: "post",
        url: "/get-pdf/",
        baseURL: urlBack,
        data: { utilisateur: userId },
        timeout: 1000,
        headers: {
            'Content-Type': 'application/pdf',
        }
    });
}