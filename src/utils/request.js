import axios from 'axios';
import { getSimpleDate } from './formatDate';
const urlBack = import.meta.env.VITE_URL_BACK;

/**
 * Requete vers le back
 * 
 * @param {string} url 
 * @param {"post" | "get" | "put" | "delete"} method 
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
export async function uploadFile(depot, file) {
    let nouveauChemin = depot.cheminFichier;
    if (nouveauChemin.includes('.pdf')) {
        // remove nom du fichier
        const parts = nouveauChemin.split('/');
        parts.pop();
        nouveauChemin = parts.join('/');
    }

    // ajoute le nom du fichier
    nouveauChemin += "/" + depot.id + "_" + getSimpleDate(new Date()) + ".pdf";

    return axios({
        method: 'post',
        url: '/upload-pdf/',
        baseURL: urlBack,
        data: {
            pdf_file: file,
            file_path: nouveauChemin,
        },
        timeout: 1000,
        headers: {
            'Content-Type': 'multipart/form-data',
        }
    })
        .then(() => {
            return request('/depot/' + depot.id, 'patch', {
                cheminFichier: nouveauChemin
            })
        });
}
