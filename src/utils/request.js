import axios from 'axios';
const urlBack = import.meta.env.VITE_URL_BACK;

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
        url: url?.endsWith('/') ? url : (url + "/"),
        baseURL: urlBack,
        data: data,
        timeout: 1000,
        headers: {
            'Content-Type': 'application/json',
        }
    });
}
