import axios from 'axios';

/**
 * Requete vers le back
 * 
 * @param {string} url 
 * @param {"post" | "get" | "put" | "delete"} method 
 * @param {{*}} data 
 */
export async function request(url, method = "get", data) {
    return axios({
        method: method,
        url: process.env.URL_BACK + url,
        data: data
    });
}
