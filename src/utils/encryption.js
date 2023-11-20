import CryptoJS from "crypto-js";

import { tokenSecret } from '../data/constantes';


/**
 * Encrypt une donnée
 * 
 * @param {*} data 
 * @returns {string} donnée encryptée
 */
export function encryptData(data) {
    const header = {
        "alg": "HS256",
        "typ": "JWT"
    };

    const stringifiedHeader = CryptoJS.enc.Utf8.parse(JSON.stringify(header));
    const encodedHeader = base64url(stringifiedHeader);

    const stringifiedData = CryptoJS.enc.Utf8.parse(JSON.stringify(data));
    const encodedData = base64url(stringifiedData);

    const token = encodedHeader + "." + encodedData;

    const signature = CryptoJS.HmacSHA256(token, tokenSecret);
    const encodedSignature = base64url(signature);

    return token + "." + encodedSignature;
}

/**
 * Décrypte une donnée encryptée
 * 
 * @param {string} token 
 * @returns {*} la donnée décryptée
 */
export function parseToken(token) {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function (c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    return JSON.parse(jsonPayload);
}

/**
 * Vient de [https://www.jonathan-petitcolas.com/2014/11/27/creating-json-web-token-in-javascript.html]
 * 
 * @param {string} source 
 * @returns 
 */
function base64url(source) {
    // Encode in classical base64
    let encodedSource = CryptoJS.enc.Base64.stringify(source);

    // Remove padding equal characters
    encodedSource = encodedSource.replace(/=+$/, '');

    // Replace characters according to base64url specifications
    encodedSource = encodedSource.replace(/\+/g, '-');
    encodedSource = encodedSource.replace(/\//g, '_');

    return encodedSource;
}
